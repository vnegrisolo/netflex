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

function $(selector) {
  return document.querySelectorAll(selector);
}

function onclick(selector, callback) {
  $(selector).forEach(function(el){
    el.onclick = callback;
  });
}

function onsubmit(selector, callback) {
  $(selector).forEach(function(el){
    el.onsubmit = callback;
  });
}

function message(text) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {'message': text});
  });
}

function hideAll() { message('hideAll'); }
function showAll() { message('showAll'); }

function showTitles() {
  chrome.storage.sync.get('data', function(data) {
    $('#titles')[0].innerHTML = '';

    data.data.forEach(function(title){
      var node = document.createElement('li');

      var button = document.createElement('button');
      button.setAttribute('class', 'remove-title');
      button.setAttribute('data-value', title);
      button.appendChild(document.createTextNode('X'));
      node.appendChild(button);

      var text = document.createTextNode(' '+title);
      node.appendChild(text);

      $('#titles')[0].appendChild(node);
    });
    onclick('.remove-title', removeTitle);
  });
}

function addTitle() {
  var value = $('#title-input')[0].value;

  chrome.storage.sync.get('data', function(data){
    var titles = data.data;

    titles.push(value);
    titles = Array.from(new Set(titles.sort()));
    chrome.storage.sync.set({data: titles});
    showTitles();
    message('hideAll');
    $('#title-input')[0].value = '';
  });
}

function removeTitle(el) {
  var value = el.target.getAttribute('data-value');

  chrome.storage.sync.get('data', function(data){
    var titles = data.data;

    titles.splice(titles.indexOf(value), 1);
    chrome.storage.sync.set({data: titles});
    showTitles();
    message('hideAll');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // chrome.storage.sync.set({'data': TITLES});
  showTitles();

  onclick('#hide-all', hideAll);
  onclick('#show-all', showAll);
  onsubmit('#add-title', addTitle);
});
