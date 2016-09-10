NetFlex = NetFlex || {}
NetFlex.Popup = {
  showList: function(){
    $('#netflex-list')[0].innerHTML = '';
    Storage.readEach(function(item){
      var node = document.createElement('li');
      node.appendChild(document.createTextNode(item));
      $('#netflex-list')[0].appendChild(node);
    });
  },

  toggle: function(el){
    Message.send(el.target.getAttribute('data-message'));
  }
}

document.addEventListener('DOMContentLoaded', NetFlex.Popup.showList);
onclick('.netflex-toggle', NetFlex.Popup.toggle);
