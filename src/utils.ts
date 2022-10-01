"use strict";

// the origin should point to your hosted app (React, Vue etc) in production,
//  but for development, it would point to localhost of your app (pay-app)


const utils = () => {
const origin = "http://localhost:3000";

const iFrameId = "pay-frame-id";
const containerId = "pay-widget-wrapper";

  function init({ title, config }:{ title: any, config: any}) {
    if (
      document.getElementById(containerId) &&
      document.getElementById(iFrameId)
    ) {
      closeWidget();
    }

    const styleSheet = document.createElement("style");
    styleSheet.innerText = loaderStyles;
    document.head.appendChild(styleSheet);

    const loader = document.createElement("div");
    let childDiv = document.createElement("div");
    loader.setAttribute("id", "pay-app-loader");
    loader.classList.add("app-loader");
    childDiv.classList.add("app-loader__spinner");

    for (let i = 0; i < 12; i++) {
      let div = document.createElement("div");
      childDiv.appendChild(div);
    }
    loader.appendChild(childDiv);


    const source = new URL(origin);
    const container = document.createElement("div");
    container.setAttribute("id", containerId);
    container.setAttribute("style", containerStyle);
    document.body.insertBefore(container, document.body.childNodes[0]);

    document.getElementById(containerId).appendChild(loader);
    const iframe: HTMLElement = document.createElement("iframe");

    const iframeAttr = [
      {
        key: "src",
        val: source.href,
      },
      {
        key: "style",
        val: iframeStyle,
      },
      {
        key: "id",
        val: iFrameId,
      },
      {
        key: "allowfullscreen",
        val: "true",
      },
      {
        key: "allowpaymentrequest",
        val: "true",
      },
      {
        key: "title",
        val: title,
      },
      {
        key: "sandbox",
        val: "allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups",
      },
    ];

    iframeAttr.forEach(({ key, val }) => iframe.setAttribute(key, val));
    iframe.onload = function () {
      iframe.contentWindow.postMessage(
        {
          type: "sdkData",
          config,
        },
        origin
      );
    };

    document.getElementById(containerId).appendChild(iframe);
    window.closePayFrame = closeWidget;
    return iframe;
  }

  function closeWidget() {
    const container = document.getElementById(containerId);
    document.body.removeChild(container);
  }

  function openWidget() {

    const container = document.getElementById(containerId);
    const loader = document.getElementById("pay-app-loader");
    const frame = document.getElementById(iFrameId);
    container.style.visibility = "visible";
    container.style.display = "flex";
    loader.style.display = "block";

    setTimeout(() => {
      const container = document.getElementById(containerId);
      container.style.display = "flex";
      frame.style.display = "block";
      [container, frame].forEach((wrapper) => {
        wrapper.style.visibility = "visible";
        wrapper.focus({ preventScroll: false });
      });
    }, 1500);
  }

  return {
    openWidget,
    closeWidget,
    init,
  };
};

module.exports = utils;

const containerStyle =
  "position:fixed;overflow: hidden;display: none;justify-content: center;align-items: center;z-index: 999999999;height: 100%;width: 100%;color: transparent;background: rgba(0, 0, 0, 0.6);visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;";
const iframeStyle =
  "position: fixed;display: none;overflow: hidden;z-index: 999999999;width: 100%;height: 100%;transition: opacity 0.3s ease 0s;visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0; border: none";
const loaderStyles = `.app-loader {
  text-align: center;
  color: white;
  margin-right: -30px;
  width: 100%;
  position: fixed;
  top: 30vh
}
@-webkit-keyframes app-loader__spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.app-loader__spinner {
  position: relative;
  display: inline-block;
  width: fit-content;
}
.app-loader__spinner div {
  position: absolute;
  -webkit-animation: app-loader__spinner linear 1s infinite;
  animation: app-loader__spinner linear 1s infinite;
  background: white;
  width: 10px;
  height: 30px;
  border-radius: 40%;
  -webkit-transform-origin: 5px 65px;
  transform-origin: 5px 65px;
}
.app-loader__spinner div:nth-child(1) {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-animation-delay: -0.916666666666667s;
  animation-delay: -0.916666666666667s;
}
.app-loader__spinner div:nth-child(2) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
  -webkit-animation-delay: -0.833333333333333s;
  animation-delay: -0.833333333333333s;
}
.app-loader__spinner div:nth-child(3) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
  -webkit-animation-delay: -0.75s;
  animation-delay: -0.75s;
}
.app-loader__spinner div:nth-child(4) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation-delay: -0.666666666666667s;
  animation-delay: -0.666666666666667s;
}
.app-loader__spinner div:nth-child(5) {
  -webkit-transform: rotate(120deg);
  transform: rotate(120deg);
  -webkit-animation-delay: -0.583333333333333s;
  animation-delay: -0.583333333333333s;
}
.app-loader__spinner div:nth-child(6) {
  -webkit-transform: rotate(150deg);
  transform: rotate(150deg);
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.app-loader__spinner div:nth-child(7) {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-animation-delay: -0.416666666666667s;
  animation-delay: -0.416666666666667s;
}
.app-loader__spinner div:nth-child(8) {
  -webkit-transform: rotate(210deg);
  transform: rotate(210deg);
  -webkit-animation-delay: -0.333333333333333s;
  animation-delay: -0.333333333333333s;
}
.app-loader__spinner div:nth-child(9) {
  -webkit-transform: rotate(240deg);
  transform: rotate(240deg);
  -webkit-animation-delay: -0.25s;
  animation-delay: -0.25s;
}
.app-loader__spinner div:nth-child(10) {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  -webkit-animation-delay: -0.166666666666667s;
  animation-delay: -0.166666666666667s;
}
.app-loader__spinner div:nth-child(11) {
  -webkit-transform: rotate(300deg);
  transform: rotate(300deg);
  -webkit-animation-delay: -0.083333333333333s;
  animation-delay: -0.083333333333333s;
}
.app-loader__spinner div:nth-child(12) {
  -webkit-transform: rotate(330deg);
  transform: rotate(330deg);
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.app-loader__spinner {
  -webkit-transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);
  transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);
}
`;