var DISPLAY = false;

function refreshDisplay() { DISPLAY == true ? showAll() : hideAll(); }
function toggleDisplay() { DISPLAY = !DISPLAY; refreshDisplay(); }

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
  if(message == 'toggleDisplay'){ toggleDisplay(); }
});

document.onkeydown = function(event) {
  switch(event.key) {
    case 'x': toggleDisplay(); break;
  }
};

function refreshLoop() {
  refreshDisplay();
  setTimeout(refreshLoop, 500);
}
refreshLoop();
