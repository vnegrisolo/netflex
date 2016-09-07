var Storage = {
  readAllTitles: function(callback){
    chrome.storage.sync.get('data', function(data) {
      callback(data.data ? data.data : []);
    });
  },

  readEachTitle: function(callback){
    return new Promise(function(resolve) {
      Storage.readAllTitles(function(titles){
        titles.forEach(function(title){
          callback(title);
        });
        resolve();
      });
    });
  },

  writeTitles: function(titles){
    chrome.storage.sync.set({data: titles});
  },

  addTitle: function(title){
    return new Promise(function(resolve) {
      Storage.readAllTitles(function(titles){
        titles.push(title);
        titles = Array.from(new Set(titles.sort()));
        Storage.writeTitles(titles);
        resolve();
      });
    });
  },

  removeTitle: function(title){
    return new Promise(function(resolve) {
      Storage.readAllTitles(function(titles){
        titles.splice(titles.indexOf(title), 1);
        Storage.writeTitles(titles);
        resolve();
      });
    });
  }
}
