NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Popup'] = {
  init: function(){
    NetFlex.Popup.showList();
    NetFlex.Markup.onclick('.netflex-toggle', function(event){
      NetFlex.Message.send(event.target.getAttribute('data-message'));
    });
  },
  showList: function(){
    NetFlex.Markup.first('#netflex-list').innerHTML = '';
    NetFlex.Storage.readEach(function(item){
      var node = document.createElement('li');
      node.appendChild(document.createTextNode(item));
      NetFlex.Markup.first('#netflex-list').appendChild(node);
    });
  }
}

NetFlex.Markup.onready(NetFlex.Popup.init);
