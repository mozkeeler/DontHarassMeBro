let self = require("sdk/self");
let pageMod = require("sdk/page-mod");

let gWorker = null;

function handleMessage(aMessage) {
  if (aMessage.type == "gotAuthToken") {
    gotAuthToken(aMessage.value);
  }
}

function gotAuthToken(aToken) {
  gWorker.postMessage({ type: "doBlock",
                        authToken: aToken,
                        userID: "44058347" });
}

pageMod.PageMod({
  include: "*.twitter.com",
  contentScriptFile: self.data.url("worker.js"),
  onAttach: function (worker) {
    gWorker = worker;
    gWorker.on("message", handleMessage);
  }
});
