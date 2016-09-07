var SEL_P = '[aria-label="';
var SEL_S = '"]';
var DISPLAY = false;

function $(selector) {
  return document.querySelectorAll(selector);
}

function showAll() {
  DISPLAY = true;
  $('.slider-item').forEach(function(el) {
    el.style.visibility = 'visible';
  });
}

function hideAll() {
  DISPLAY = false;
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

document.onkeyup = function(event) {
  switch(event.keyCode) {
    case 72: hideAll(); break;
    case 83: showAll(); break;
  }
};

function hideLoop() {
  setTimeout(function(){
    if(DISPLAY == true) {
      showAll();
    } else {
      hideAll();
    }
    hideLoop();
  }, 500);
}
hideLoop();
