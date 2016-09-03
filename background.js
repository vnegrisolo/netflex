chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf('https://www.netflix.com/browse') == 0) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {'message': 'foo'});
  });
});
