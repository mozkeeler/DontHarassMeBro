let authToken = document.querySelector(".authenticity_token");
if (authToken) {
  self.postMessage({ type: "gotAuthToken", value: authToken.value });
}

function doBlock(aToken, aID) {
  let req = new XMLHttpRequest();
  req.open("POST", "https://twitter.com/i/user/block", false);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;" +
                                       "charset=UTF-8");
  req.send("authenticity_token=" + aToken +
           "&challenges_passed=false&handles_challenges=1" +
           "&user_id=" + aID);
}

function handleMessage(aMessage) {
  if (aMessage.type == "doBlock") {
    doBlock(aMessage.authToken, aMessage.userID);
  }
}

self.on("message", handleMessage);
