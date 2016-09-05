var SEL_P = '[aria-label="';
var SEL_S = '"]';

function $(selector) {
  return document.querySelectorAll(selector);
}

function showAll() {
  $('.slider-item').forEach(function(el) {
    el.style.visibility = 'visible';
  });
}

function hideAll() {
  chrome.storage.sync.get('data', hideTitles);
}

function hideTitles(data) {
  data.data.forEach(function(title){
    $(SEL_P + title + SEL_S).forEach(function(el){
      el.parentNode.parentNode.style.visibility = 'hidden';
    });
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message === 'hideAll'){ hideAll(); }
    if(request.message === 'showAll'){ showAll(); }
  }
);
