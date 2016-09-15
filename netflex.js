NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Conf'] = {
  display: false,
  actions: false,
  toggle: function(key){ return NetFlex.Conf[key] = !NetFlex.Conf[key]; }
}
NetFlex['App'] = {
  init: function(){
    NetFlex.Message.receive(function(message){
      if(message == 'actions'){ NetFlex.App.toggleActions(); }
      if(message == 'display'){ NetFlex.App.toggleDisplay(); }
    });

    function netFlexLoop(){
      !NetFlex.Conf.display && NetFlex.App.hideTitles();
      setTimeout(netFlexLoop, 300);
    }
    netFlexLoop();
  },
  toggleDisplay: function(){
    NetFlex.Conf.toggle('display') ? NetFlex.App.showTitles() : NetFlex.App.hideTitles();
  },
  toggleActions: function(){
    NetFlex.Conf.toggle('actions') ? NetFlex.App.showActions() : NetFlex.App.hideActions();
  },
  showTitles: function(){ NetFlex.Markup.show('.slider-item'); },
  hideTitles: function(){
    NetFlex.Storage.readEach(function(title){
      NetFlex.Markup.hide('[aria-label="'+title+'"]');
    });
  },
  showActions: function(){
    NetFlex.Markup.each('.slider-item', function(el){
      var title = NetFlex.App.cardTitle(el);
      if(title){
        NetFlex.Markup.prepend(el, NetFlex.App.actionButton(title));
        NetFlex.Storage.includes(title, function(included){
          var btn = el.getElementsByClassName('netflex-toggle')[0];
          included && NetFlex.Markup.toggleClass(btn, 'active');
        });
      }
    });
    NetFlex.Markup.onclick('.netflex-toggle', function(el){
      NetFlex.Markup.toggleClass(el, 'active');
      NetFlex.Storage.toggleFromList(el.getAttribute('data-title'));
    });
  },
  cardTitle: function(el){
    var card = el.getElementsByClassName('title_card')[0];
    return card && card.getAttribute('aria-label');
  },
  actionButton: function(title){
    var button = document.createElement('button');
    button.setAttribute('class', 'netflex-toggle');
    button.setAttribute('data-title', title);
    button.appendChild(document.createTextNode(title));
    return button;
  },
  hideActions: function(){
    NetFlex.Markup.remove('.netflex-toggle');
  }
}

NetFlex.Markup.onready(NetFlex.App);
