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
  $('.slider-item').forEach(function(el){
    var title = null;
    var card = el.getElementsByClassName('title_card')[0];
    if(card){
      title = card.getAttribute('aria-label');
    }

    if(title){
      Storage.includes(title).then(function(included){
        var classes = ['netflex-toggle'];
        if(included){
          classes.push('active');
        }

        var button = document.createElement('button');
        button.setAttribute('class', classes.join(' '));
        button.setAttribute('data-title', title);
        button.appendChild(document.createTextNode(title));
        el.insertBefore(button, el.firstChild);
        onclick('.netflex-toggle', toggleLink);
      });
    }
  });
}
function hideLinks() {
  $('.netflex-toggle').forEach(function(el){
    el.parentElement.removeChild(el);
  });
}
function toggleLink(el) {
  var title = el.target.getAttribute('data-title');
  Storage.toggleFromList(title).then(toggleLinks);
}

Message.receive(function(message){
  if(message == 'actions'){ toggleLinks(); }
  if(message == 'display'){ toggleDisplay(); }
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
