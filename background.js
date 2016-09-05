chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf('https://www.netflix.com/browse') == 0) {
    chrome.pageAction.show(tabId);
  }
});
