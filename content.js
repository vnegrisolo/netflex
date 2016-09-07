var DISPLAY = false;

function refreshDisplay() {
  DISPLAY == true ? showAll() : hideAll();
}

function toogleDisplay() {
  DISPLAY = !DISPLAY;
  refreshDisplay();
}

function showAll() {
  $('.slider-item').forEach(function(el) {
    el.style.visibility = 'visible';
  });
}

function hideAll() {
  Storage.readEachTitle(function(title){
    $('[aria-label="' + title + '"]').forEach(function(el){
      el.parentNode.parentNode.style.visibility = 'hidden';
    });
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message == 'toogleDisplay'){ toogleDisplay(); }
  }
);

document.onkeyup = function(event) {
  switch(event.keyCode) {
    case 88: toogleDisplay(); break;
  }
};

function hideLoop() {
  refreshDisplay();
  setTimeout(hideLoop, 500);
}
hideLoop();
