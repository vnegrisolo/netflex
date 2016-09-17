var NetFlexStorage = {
  db: chrome.storage.sync,
  allKeys: 'NetFlexKeys',
  addToAllKeys: function(key){
    if(key != NetFlexStorage.allKeys){
      NetFlexStorage.add(NetFlexStorage.allKeys, key);
    }
  },
  getAllKeys: function(callback){
    NetFlexStorage.readEach(NetFlexStorage.allKeys, callback);
  },
  write: function(key, value){
    var data = {};
    data[key] = value;
    NetFlexStorage.db.set(data);
    NetFlexStorage.addToAllKeys(key);
  },
  read: function(key, callback){
    NetFlexStorage.db.get(key, function(data) {
      callback(data[key] || []);
    });
  },
  writeList: function(key, list){
    NetFlexStorage.write(key, Array.from(new Set(list.sort())));
  },
  readEach: function(key, callback){
    NetFlexStorage.read(key, function(list){
      list.forEach(callback);
    });
  },
  add: function(key, item){
    NetFlexStorage.read(key, function(list){
      list.push(item);
      NetFlexStorage.writeList(key, list);
    });
  },
  remove: function(key, item){
    NetFlexStorage.read(key, function(list){
      list.splice(list.indexOf(item), 1);
      NetFlexStorage.writeList(key, list);
    });
  },
  toggle: function(key, item){
    NetFlexStorage.read(key, function(list){
      if(list.includes(item)){
        return NetFlexStorage.remove(key, item);
      }else{
        return NetFlexStorage.add(key, item);
      }
    });
  }
}
