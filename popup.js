function toggleDisplay() { Message.send('toggleDisplay'); }
function toggleLinks() { Message.send('toggleLinks'); }

function createItemNode(title) {
  var node = document.createElement('li');
  node.appendChild(document.createTextNode(' '+title));
  return node;
}

function showTitles() {
  var list = $('#netflex-titles')[0];
  list.innerHTML = '';
  Storage.readEach(function(title){
    list.appendChild(createItemNode(title));
  });
}

document.addEventListener('DOMContentLoaded', function() {
  showTitles();

  onclick('#toggle-display', toggleDisplay);
  onclick('#toggle-links', toggleLinks);
});
