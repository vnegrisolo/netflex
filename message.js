NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Message'] = {
  send: function(text) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {'message': text});
    });
  },

  receive: function(callback) {
    chrome.runtime.onMessage.addListener(function(request) {
      callback(request.message);
    });
  }
}
