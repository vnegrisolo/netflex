chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (tab.url.indexOf('https://www.netflix.com/') == 0) {
    chrome.pageAction.show(tabId);
  }
});
