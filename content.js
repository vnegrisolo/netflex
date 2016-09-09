var DISPLAY = false;
var LINKS = false;

function refreshDisplay() { DISPLAY == true ? showAll() : hideAll(); }
function toggleDisplay() { DISPLAY = !DISPLAY; refreshDisplay(); }

function refreshLinks() { LINKS == true ? showLinks() : hideLinks(); }
function toggleLinks() { LINKS = !LINKS; refreshLinks(); }

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

function showLinks() {
  console.log('show-links');
}
function hideLinks() {
  console.log('show-links');
}

Message.receive(function(message){
  if(message == 'toggleDisplay'){ toggleDisplay(); }
  if(message == 'toggleLinks'){ toggleLinks(); }
});

document.onkeydown = function(event) {
  switch(event.key) {
    case 'x': toggleDisplay(); break;
    case 'z': toggleLinks(); break;
  }
};

function refreshLoop() {
  refreshDisplay();
  setTimeout(refreshLoop, 500);
}
refreshLoop();
