import { Init } from './types'
const utils = require("./utils");
import {ethers} from 'ethers'
import BigNumber from "bignumber.js";
import { Network, Alchemy } from "alchemy-sdk";

// import { conversionUtil }  from './converter'

// export function decGWEItoDecWEI(decEth: any) {
//   return conversionUtil(decEth, {
//     fromCurrency: 'ETH',
//     toCurrency : 'ETH',
//     fromNumericBase:'dec',
//     toNumericBase:'dec',
//     fromDenomination: 'GWEI',
//     toDenomination: 'WEI',
//     numberOfDecimals: null,
//     conversionRate: null,
//     invertConversionRate: null,
//   });
// }

function Pay(props: Init) {
  if (!(this instanceof Pay))
    return new (Pay as any)(props);
    Pay.prototype.config = props.config;
    Pay.prototype.utils = utils();
    return this;
}

Pay.prototype.setup = function (onSuccess: any, onError: any) {
 
  const iframe = Pay.prototype.utils.init({
    title: "Pay SDK",
    config: this.config,
  });
  Pay.prototype.iframe = iframe;
  Pay.prototype.onSuccess = onSuccess;
  Pay.prototype.onError = onError;
};

Pay.prototype.connectWallet = async function () {
  if (typeof window.ethereum !== 'undefined') {
    this.ethereum = window.ethereum;
    // A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
const account = await provider.send("eth_requestAccounts", []);

const balance = await provider.getBalance(account[0])

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()
this.signer = signer;
this.provider = provider;


this.jsonProvidder = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/a2dkYGLpsi2ykqdJtfKww_9Qsqp_JJoE');


try {

  await this.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x'+this.config.chainId.toString(16) }],
  });

} catch (error) {
      this.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: '0x'+this.config.chainId.toString(16) ,
        rpcUrls: ["https://rpc-mumbai.maticvigil.com","https://matic-mumbai.chainstacklabs.com"],
        chainName: "Mumbai",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
    }]
});
}
this.iframe.contentWindow.postMessage({type:'web3connected',account: account[0],balance:balance.toString()},"*")

}

}

const handleEvents = function(event: any){

    if (event.data.appOrigin !== this.origin) return;
 
    switch (event.data.type) {
      case 'ready':
        const loader = document.getElementById("pay-app-loader");
        loader.style.display = "none";
        break;
      case "connect.wallet":
        Pay.prototype.connectWallet();
        break;
      case "send.value":
        Pay.prototype.sendValue(String(event.data.data.value));
        break;
      case "pay.success":
        Pay.prototype.success(event.data);
        break;
      case "pay.close":
        Pay.prototype.close(event.data);
        break;
      case "pay.server_error":
        Pay.prototype.error(event.data);
        break;
    }
  };

Pay.prototype.sendValue = async function(value: string){
  try {

    const settings = {
  apiKey: "a2dkYGLpsi2ykqdJtfKww_9Qsqp_JJoE", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const t = await alchemy.core
  .getGasPrice()

    BigNumber.set({ DECIMAL_PLACES: 10, EXPONENTIAL_AT: [-18,5]})

    this.feeData = await this.jsonProvidder.getFeeData()
    const r = ethers.utils.formatUnits(this.feeData.maxFeePerGas, "ether")
    const gasToWei = new BigNumber(t.toString()).div(10**18).toString()

    

this.iframe.contentWindow.postMessage({type:'transaction.fee',data: gasToWei},"*")
    const txn = await this.signer.sendTransaction({
  to: this.config.recepient,
  value: ethers.utils.parseEther(this.config.value)
    })
  
this.iframe.contentWindow.postMessage({type:'transaction.success'},"*")
Pay.prototype.success(txn);

  } catch (error) {
      console.log(error);
      this.iframe.contentWindow.postMessage({type:'error',message: error},"*")
    
  }
}


Pay.prototype.open = function () {
  Pay.prototype.utils.openWidget({ config: this.config, sdkType: "send" });
  

  Pay.prototype.eventHandler = handleEvents.bind(this);
  window.addEventListener("message", this.eventHandler, false);
};

Pay.prototype.close = function (data: any) {
  window.removeEventListener("message", this.eventHandler, false);
  Pay.prototype.utils.closeWidget();
  this.onClose(data);
};

Pay.prototype.success = function (data: any) {
  window.removeEventListener("message", this.eventHandler, false);
  Pay.prototype.utils.closeWidget();
  this.onSuccess(data);
   console.log(data)
};

Pay.prototype.error = function (event: any) {
  this.onError(event);
};

declare global {
    interface Window {
        Pay:typeof Pay;
        closePayFrame: any;
        ethereum: any;
    }

    interface HTMLElement {
      contentWindow: any
    }
}

if (window) {
  window.Pay = Pay; // make Pay available in the window object
}


export default Pay;