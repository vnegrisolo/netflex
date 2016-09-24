class NetFlexMessage {
  send(text) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {'message': text});
    });
  }
  receive(callback) {
    chrome.runtime.onMessage.addListener(request => callback(request.message));
  }
}
