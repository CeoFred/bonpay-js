import { Init } from './types'
const utils = require("./utils");

function BonPay(props: Init) {
  if (!(this instanceof BonPay))
    return new (BonPay as any)(props);
    BonPay.prototype.config = {...props};
    BonPay.prototype.utils = utils();
    return this;
}

BonPay.prototype.setup = function () {
 
   if(Object.values(this.config).length < 3){
     throw new Error("BondPay Misconguration,Check initilization Parameters.");
   }

  const iframe = BonPay.prototype.utils.init({
    title: "BondPayConfig",
    config: {
       value: this.config.value,
      recepient: this.config.recepient,
      chainId: this.config.chainId,
      nft: this.config?.nft
    },
  });

  BonPay.prototype.iframe = iframe;
  BonPay.prototype.onSuccess = this.config.onSuccess;
  BonPay.prototype.onError = this.config.onError;
  BonPay.prototype.onClose = this.config.onClose;
};


const handleEvents = function(event: any){
    if (event.data.appOrigin !== this.origin) return;
 
    switch (event.data.type) {
      case 'ready':
        const loader = document.getElementById("pay-app-loader");
        loader.style.display = "none";
        break;
      case "pay.success":
        BonPay.prototype.success(event.data);
        break;
      case "pay.exit":
        console.log(event.data.type)
        BonPay.prototype.close(event.data);
        break;
      case "pay.error":
        BonPay.prototype.error(event.data);
        break;
    }
  };


BonPay.prototype.open = function () {
  BonPay.prototype.utils.openWidget({ config: this.config });
  BonPay.prototype.eventHandler = handleEvents.bind(this);
  window.addEventListener("message", this.eventHandler, false);
};

BonPay.prototype.close = function (data: any) {
  window.removeEventListener("message", this.eventHandler, false);
   this.onClose(data);
  BonPay.prototype.utils.closeWidget();
};

BonPay.prototype.success = function (data: any) {
  this.onSuccess(data);
};

BonPay.prototype.error = function (event: any) {
  this.onError(event);
};

declare global {
    interface Window {
        BonPay:typeof BonPay;
        closePayFrame: any;
        ethereum: any;
    }

    interface HTMLElement {
      contentWindow: any
    }
}

if (window) {
  window.BonPay = BonPay; // make BonPay available in the window object
}


export default BonPay;