var TITLES = [
  "Admiral",
  "Better Call Saul", // waiting new season
  "Braveheart",
  "Breaking Bad",
  "Defiance",
  "Dexter",
  "Django Unchained",
  "Elizabeth: The Golden Age",
  "Fearless",
  "Friends",
  "Gladiator",
  "Jobs",
  "House of Cards", // waiting new season
  "Look Who's Back",
  "Lost",
  "Marco Polo", // waiting new season
  "Marvel's Daredevil", // waiting new season
  "Marvel's Jessica Jones", // waiting new season
  "Nightcrawler",
  "Pirates of the Caribbean: The Curse of the Black Pearl",
  "Sense8", // waiting new season
  "Spartacus",
  "Spotlight",
  "Stranger Things",
  "The Big Short",
  "The Cobbler",
  "The Interview",
  "The Last Kingdom",
  "The Ridiculous 6",
  "The Truman Show",
  "The Tudors",
  "Top Gun",
  "Turn", // waiting new season
  "V for Vendetta",
  "Weeds"
];

var LIST = $('#titles')[0];
var INPUT = $('#title-input')[0];
var FORM_SELECTOR = '#add-title';
var TOOGLE_SELECTOR = '#toogle-display';
var REMOVE_ITEM_CLASS = 'remove-title';

function $(selector) { return document.querySelectorAll(selector); }

function onclick(selector, callback) {
  $(selector).forEach(function(el){ el.onclick = callback; });
}

function onsubmit(selector, callback) {
  $(selector).forEach(function(el){ el.onsubmit = callback; });
}

function message(text) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {'message': text});
  });
}

function toogleDisplay() { message('toogleDisplay'); }

function createItemNode(title) {
  var node = document.createElement('li');

  var button = document.createElement('button');
  button.setAttribute('class', REMOVE_ITEM_CLASS);
  button.setAttribute('data-value', title);
  button.appendChild(document.createTextNode('X'));
  node.appendChild(button);

  var text = document.createTextNode(' '+title);
  node.appendChild(text);
  return node;
}

function showTitles() {
  chrome.storage.sync.get('data', function(data) {
    LIST.innerHTML = '';
    data.data.forEach(function(title){
      LIST.appendChild(createTextNode(title));
    });
    onclick('.'+REMOVE_ITEM_CLASS, removeTitle);
  });
}

function addTitle() {
  chrome.storage.sync.get('data', function(data){
    var titles = data.data;

    titles.push(INPUT.value);
    titles = Array.from(new Set(titles.sort()));
    chrome.storage.sync.set({data: titles});
    showTitles();
    INPUT.value = '';
  });
}

function removeTitle(el) {
  var value = el.target.getAttribute('data-value');

  chrome.storage.sync.get('data', function(data){
    var titles = data.data;

    titles.splice(titles.indexOf(value), 1);
    chrome.storage.sync.set({data: titles});
    showTitles();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // chrome.storage.sync.set({'data': TITLES});
  showTitles();

  onclick(TOOGLE_SELECTOR, toogleDisplay);
  onsubmit(FORM_SELECTOR, addTitle);
});
