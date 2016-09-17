var NetFlexPopup = {
  init: function(){
    NetFlexPopup.showLists();
    NetFlexMessage.send('reset');

    NetFlexMarkup.onclick('.netflex-toggle', function(el){
      NetFlexMarkup.toggleClass(el, 'active');
      NetFlexMessage.send(el.getAttribute('data-message'));
    });
  },
  showLists: function(){
    var lists = NetFlexMarkup.first('#netflex-lists');
    lists.innerHTML = '';

    NetFlexStorage.getAllKeys(function(user){
      var list = document.createElement('ol');

      NetFlexStorage.readEach(user, function(item){
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(item));
        list.appendChild(node);
      });

      lists.appendChild(document.createTextNode(user));
      lists.appendChild(list);
    });
  }
}

NetFlexMarkup.onready(NetFlexPopup);
