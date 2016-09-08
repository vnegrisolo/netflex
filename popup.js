function toogleDisplay() { Message.send('toogleDisplay'); }

function createItemNode(title) {
  var node = document.createElement('li');

  var button = document.createElement('button');
  button.setAttribute('class', 'remove-title');
  button.setAttribute('data-value', title);
  button.appendChild(document.createTextNode('X'));
  node.appendChild(button);

  var text = document.createTextNode(' '+title);
  node.appendChild(text);
  return node;
}

function showTitles() {
  var list = $('#titles')[0];
  list.innerHTML = '';
  Storage.readEach(function(title){
    list.appendChild(createItemNode(title));
  }).then(function(){
    onclick('.remove-title', removeTitle);
  });
}

function addTitle() {
  var input = $('#title-input')[0];
  Storage.addToList(input.value).then(function(){
    showTitles();
    input.value = '';
  });
}

function removeTitle(el) {
  var value = el.target.getAttribute('data-value');
  Storage.removeFromList(value).then(function(){
    showTitles();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  showTitles();

  onclick('#toogle-display', toogleDisplay);
  onsubmit('#add-title', addTitle);
});
