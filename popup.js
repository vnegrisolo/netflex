NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Popup'] = {
  showList: function(){
    $('#netflex-list')[0].innerHTML = '';
    Storage.readEach(function(item){
      var node = document.createElement('li');
      node.appendChild(document.createTextNode(item));
      $('#netflex-list')[0].appendChild(node);
    });
  },

  toggle: function(el){
    NetFlex.Message.send(el.target.getAttribute('data-message'));
  }
}

document.addEventListener('DOMContentLoaded', function(){
  NetFlex.Popup.showList();
  onclick('.netflex-toggle', NetFlex.Popup.toggle);
});
