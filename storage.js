var NetFlexStorage = {
  db: chrome.storage.sync,
  write: function(list){
    NetFlexStorage.db.set({data: list});
  },
  read: function(callback){
    NetFlexStorage.db.get('data', function(data) {
      callback(data.data || []);
    });
  },
  readEach: function(callback){
    NetFlexStorage.read(function(list){ list.forEach(callback); });
  },
  includes: function(title, callback){
    NetFlexStorage.read(function(list){ callback(list.includes(title)); });
  },
  toggleFromList: function(x){
    NetFlexStorage.read(function(list){
      list.includes(x) ? list.splice(list.indexOf(x), 1) : list.push(x);
      NetFlexStorage.write(Array.from(new Set(list.sort())));
    });
  }
}
