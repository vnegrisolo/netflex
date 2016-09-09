var DISPLAY = false;

function refreshDisplay() {
  DISPLAY == true ? showAll() : hideAll();
}
function toogleDisplay() {
  DISPLAY = !DISPLAY;
  refreshDisplay();
}

function showAll() {
  $('.slider-item').forEach(show);
}
function hideAll() {
  Storage.readEach(function(title){
    $('[aria-label="' + title + '"]').forEach(function(el){
      hide(el.parentNode.parentNode);
    });
  });
}

Message.receive(function(message){
  if(message == 'toogleDisplay'){ toogleDisplay(); }
});

document.onkeyup = function(event) {
  switch(event.keyCode) {
    case 88: toogleDisplay(); break; // x
  }
};

function refreshLoop() {
  refreshDisplay();
  setTimeout(refreshLoop, 500);
}
refreshLoop();
