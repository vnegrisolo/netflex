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
  NetFlex.Storage.readEach(function(title){
    $('[aria-label="' + title + '"]').forEach(function(el){
      hide(el.parentNode.parentNode);
    });
  });
}

function showLinks() {
  $('.slider-item').forEach(function(el){
    var item = null;
    var card = el.getElementsByClassName('title_card')[0];
    if(card){
      item = card.getAttribute('aria-label');
    }

    if(item){
      NetFlex.Storage.read(function(list){
        var included = list.includes(item);
        var classes = ['netflex-toggle'];
        if(included){
          classes.push('active');
        }

        var button = document.createElement('button');
        button.setAttribute('class', classes.join(' '));
        button.setAttribute('data-title', item);
        button.appendChild(document.createTextNode(item));
        el.insertBefore(button, el.firstChild);
      }).then(function(){
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
  NetFlex.Storage.toggleFromList(title).then(toggleLinks);
}

NetFlex.Message.receive(function(message){
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
