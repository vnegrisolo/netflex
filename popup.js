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

document.addEventListener('DOMContentLoaded', function() {
  document.body.onload = function(){
    chrome.storage.sync.set({'data': TITLES});

    chrome.storage.sync.get('data', function(data){
      document.getElementById('titles').innerHTML = "";

      data.data.forEach(function(title){
        var node = document.createElement("li");
        var text = document.createTextNode(title);
        node.appendChild(text);

        document.getElementById('titles').appendChild(node);
      });
    });
  }

  document.getElementById('clear').onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {'message': 'foo'});
    });
  };
});
