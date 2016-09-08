var Storage = {
  write: function(list){
    chrome.storage.sync.set({data: list});
  },

  read: function(callback){
    chrome.storage.sync.get('data', function(data) {
      callback(data.data || []);
    });
  },

  readEach: function(callback){
    return new Promise(function(resolve) {
      Storage.read(function(list){
        list.forEach(function(item){
          callback(item);
        });
        resolve();
      });
    });
  },

  addToList: function(item){
    return new Promise(function(resolve) {
      Storage.read(function(list){
        list.push(item);
        list = Array.from(new Set(list.sort()));
        Storage.write(list);
        resolve();
      });
    });
  },

  removeFromList: function(item){
    return new Promise(function(resolve) {
      Storage.read(function(list){
        list.splice(list.indexOf(item), 1);
        Storage.write(list);
        resolve();
      });
    });
  }
}
