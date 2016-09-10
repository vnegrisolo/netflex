NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Popup'] = {
  showList: function(){
    NetFlex.Markup.first('#netflex-list').innerHTML = '';
    NetFlex.Storage.readEach(function(item){
      var node = document.createElement('li');
      node.appendChild(document.createTextNode(item));
      NetFlex.Markup.first('#netflex-list').appendChild(node);
    });
  },

  toggle: function(el){
    NetFlex.Message.send(el.target.getAttribute('data-message'));
  }
}

NetFlex.Markup.onready(function(){
  NetFlex.Popup.showList();
  NetFlex.Markup.onclick('.netflex-toggle', NetFlex.Popup.toggle);
});
