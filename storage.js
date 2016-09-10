NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Storage'] = {
  write: function(list){
    chrome.storage.sync.set({data: list});
  },

  read: function(callback){
    return new Promise(function(resolve) {
      chrome.storage.sync.get('data', function(data) {
        var list = data.data || [];
        callback(list);
        resolve();
      });
    });
  },

  readEach: function(callback){
    return NetFlex.Storage.read(function(list){
      list.forEach(callback);
    });
  },

  toggleFromList: function(item){
    return NetFlex.Storage.read(function(list){
      if(list.includes(item)){
        list.splice(list.indexOf(item), 1);
      }else{
        list.push(item);
        list = Array.from(new Set(list.sort()));
      }
      NetFlex.Storage.write(list);
    });
  }
}
