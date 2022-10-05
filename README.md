<h1 align="center">
   <b>
        <a href="https://github.com/CeoFred/bonpay-js"><img src="https://bonpay.codemon.me/logo.png" height="50" /></a><br>
    </b>
</h1>

# Bonpay SDK
Bonday is a software development kit that allows for ease of crypto payment integration on the web. Accept crypto payments using different payment methods available like NFT, ERC20 tokens, Native tokens and more.


## Usage
Currently, anyone can use bonpay SDK via a simple hyperlink integration on a new or existing web page.
### Import
import bonpay script into your web application via CDN

```
<!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
     <title>Hello World</title>
    <script src="https://bonpay-js.vercel.app/v1.index.bundle.js"></script>
   </head>
   <body>
     
   </body>
 </html>

```

### Initialize
After the bonpay script has been loaded, a global ```BonPay``` object is injected into the global ```window``` object for ease of availability.

```
 +++++
  <script>
  const pay = new BonPay({value:"0.00003",recepient:'0xAFcC4d55a83ae1A449Bee7783A2737aFb5d82254', chainId: 97 })

  pay.setup(
        success,
        error,
        onClose
  );
  </script>
+++++
```

BonPay is initialized with a configuration object which is required to setup and open up the bonpay dialog. See below for specifications on the configuration object.