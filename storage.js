var NetFlexStorage = {
  db: chrome.storage.sync,
  write: function(data){
    NetFlexStorage.db.set({data: data});
  },
  writeList: function(list){
    NetFlexStorage.write(Array.from(new Set(list.sort())));
  },
  read: function(callback){
    NetFlexStorage.db.get('data', function(data) {
      callback(data.data || []);
    });
  },
  readEach: function(callback){
    NetFlexStorage.read(function(list){
      list.forEach(callback);
    });
  },
  add: function(item){
    NetFlexStorage.read(function(list){
      list.push(item);
      NetFlexStorage.writeList(list);
    });
  },
  remove: function(item){
    NetFlexStorage.read(function(list){
      list.splice(list.indexOf(item), 1);
      NetFlexStorage.writeList(list);
    });
  },
  toggle: function(item){
    NetFlexStorage.read(function(list){
      list.includes(item) ? NetFlexStorage.remove(item) : NetFlexStorage.add(item);
    });
  }
}
