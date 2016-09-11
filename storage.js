NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Storage'] = {
  write: function(list){
    chrome.storage.sync.set({data: list});
  },
  read: function(callback){
    chrome.storage.sync.get('data', function(data) {
      callback(data.data || []);
    });
  },
  readEach: function(callback){
    NetFlex.Storage.read(function(list){ list.forEach(callback); });
  },
  includes: function(title, callback){
    NetFlex.Storage.read(function(list){ callback(list.includes(title)); });
  },
  toggleFromList: function(item){
    NetFlex.Storage.read(function(list){
      if(list.includes(item)){
        list.splice(list.indexOf(item), 1);
      }else{
        list.push(item);
      }
      list = Array.from(new Set(list.sort()));
      NetFlex.Storage.write(list);
    });
  }
}
