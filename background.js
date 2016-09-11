chrome.tabs.onUpdated.addListener(function (tabId, _, tab) {
  if (tab.url.indexOf('https://www.netflix.com/') == 0) {
    chrome.pageAction.show(tabId);
  }
});
