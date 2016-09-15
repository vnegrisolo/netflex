var NetFlexPopup = {
  init: function(){
    NetFlexPopup.showList();
    NetFlexMarkup.onclick('.netflex-toggle', function(el){
      NetFlexMessage.send(el.getAttribute('data-message'));
    });
  },
  showList: function(){
    var list = NetFlexMarkup.first('#netflex-list');
    list.innerHTML = '';
    NetFlexStorage.readEach(function(item){
      var node = document.createElement('li');
      node.appendChild(document.createTextNode(item));
      list.appendChild(node);
    });
  }
}

NetFlexMarkup.onready(NetFlexPopup);
