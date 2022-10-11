<h1 align="center">
   <b>
        <a href="https://github.com/CeoFred/bonpay-js"><img src="https://bonpay.codemon.me/logo.png" height="50" /></a><br>
    </b>
</h1>

# Bonpay Web SDK
Bonday is a software development kit that allows for ease of crypto payment integration on the web. Accept crypto payments using different payment methods available like NFT, ERC20 tokens, Native tokens and more.

# Demo
Check out this live demo on Binance Testnet <a href="https://bonpay-js.vercel.app/">here</a>.
## Usage
Currently, anyone can use bonpay SDK via a simple hyperlink integration on a new or existing web page.
### Installing
Using CDN:

```js
<script src="https://bonpay-js.vercel.app/v1.index.bundle.js"></script>   
```

### Example
After the bonpay script has been loaded, a global ```BonPay``` object is injected into the global ```window``` object for ease of availability.
##### Creating an instance
```js
 
  const pay = new BonPay({
      value: "0.10001",
      recepient: '0xAFcC4d55a83ae1A449Bee7783A2737aFb5d82254',
      chainId: 80001,
      onSuccess,
      onError,
      onClose,
    })
```


##### Setup event handlers
Emit config data and prepare  UI disalog for transactions.
```js

  pay.setup();

```

##### Open Bondpay 
To open a bondpay dialog simple call the open method on the bonpay object:
```js
pay.open();
```
### Instance Configuration
BonPay is initialized with a configuration object which is required to setup and open up the bonpay dialog. See below for specifications on the configuration object.

```js
{
 // `value` is the amount to send in ether
  value: '1', // no-default, required, string

  // `recepient` is an address to deposit ether value
  recepient: '0xAFcC4d55a83ae1A449Bee7783A2737aFb5d82254', // no-default, required, string

  // `chainId` is a network Id. 
  chainId: 1, // no-default, required, integer

  // `onSuccess` callBack function on transaction successfull
  onSuccess: function(transactionData){}, // no-default, optional, function

   // `onClose` callBack function on modal close
  onClose: function(closeEvent){}, // no-default, optional, function

   // `onError` callBack function on transaction successfull
  onError: function(error){}, // no-default, optional, function

  // `nft` Accept NFT as an alternative form of payment specifying
  // the collection contract address. A collection field is required 
  // when specifying an nft option
   nft: { 
        collection: ["0xE3ffC7A3Eb0Df96CBc08fC95cdDF776B22124A97"]
    }, // optional
  // `tokens` Accept stable coins. supported coins include BUSD,USDC,UDST,DAI. 
  tokens: ['USDT']

}
```

### Supported Networks
| Network | ChainId |  |
| --- | --- | --- |
| Ethereum  | 1 |  ✅|
| Binance Smart Chain | 56 |  ✅  |
| Polygon Mainnet | 137 |  ✅  |
| Mumbai | 80001 |  ✅  |
| BSC Testnet | 97 |  ✅ |
| Goerli Testnet | 5 |  ✅  |
| Kovan Testnet | 42 |  ✅ |

### Network Supported Stable Token

We currently limit the tokens to be used for certain network, below is a table of networks ans available stable tokens you can use for your application.

| Network | ChainId | DAI | BUSD | USDT | USDC|
| --- | --- | --- | --- | --- | --- | --- |
| Ethereum  | 1 |  ✅| ✅ | ✅| ✅|
| Binance Smart Chain | 56 |  ✅  | ✅ | ❌ | ✅|
| Polygon Mainnet | 137 |  ✅  | ✅ | ✅ | ✅|
| Mumbai | 80001 |  ❌  | ❌ | ❌ | ❌|
| BSC Testnet | 97 |  ❌ | ❌ | ❌ | ❌ |
| Goerli Testnet | 5 |  ✅  |❌ |  ✅ | ✅  |
| Kovan Testnet | 42 | ❌ | ❌ | ❌ | ❌|


### Full Example
Create an HTML file and paste this script below and get the bag.
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>Getting Started</title>
  <script src="https://bonpay-js.vercel.app/v1.index.bundle.js"></script>
</head>

<body>
  <div id="pay-widget-wrapper">
    Welcome to my website,pay for the item now.
    <button id="button">Pay Now</button>
  </div>
  <script>
    const pay = new BonPay({
      value: "0.10001",
      recepient: '0xAFcC4d55a83ae1A449Bee7783A2737aFb5d82254',
      chainId: 80001,
      onSuccess: success,
      onError: error,
      onClose,
      nft: {
        collection: ["0xE3ffC7A3Eb0Df96CBc08fC95cdDF776B22124A97"]
      },
      tokens: ['USDT']
    })


    function success(data) {
      console.log(data)
    }

    function error(data) {
      console.log(data);
    }

    function onClose(data) {
      console.log(data);
    }

    const button = document.querySelector('#button');

    button.addEventListener('click', function () {
      pay.setup();
      pay.open();
    })
  </script>
</body>

</html>
```


## Notice

Each time the bonpay modal is closed, the bonpay unmounts event listerners and removes completely the bonpay dialog container. To re-open the modal successfully, you need to call the ```setup(onSuccess, onError, onClose)``` method again and finally ```.open()``` method.


## Credits

Bonpay is heavily inspired by the [paystack](https://paystack.com).

## License

[MIT](LICENSE)