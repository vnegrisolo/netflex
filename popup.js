NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Popup'] = {
  init: function(){
    NetFlex.Popup.showList();
    NetFlex.Markup.onclick('.netflex-toggle', function(el){
      NetFlex.Message.send(el.getAttribute('data-message'));
    });
  },
  showList: function(){
    var list = NetFlex.Markup.first('#netflex-list');
    list.innerHTML = '';
    NetFlex.Storage.readEach(function(item){
      var node = document.createElement('li');
      node.appendChild(document.createTextNode(item));
      list.appendChild(node);
    });
  }
}

NetFlex.Markup.onready(NetFlex.Popup);
