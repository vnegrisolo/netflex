var NetFlexConf = {
  display: false,
  actions: false,
  toggle: function(key){
    return NetFlexConf[key] = !NetFlexConf[key];
  }
}

var NetFlex = {
  init: function(){
    NetFlexMessage.receive(NetFlex.parseMessage);
    function netFlexLoop(){
      !NetFlexConf.display && NetFlex.hideTitles();
      setTimeout(netFlexLoop, 300);
    };
    netFlexLoop();
  },
  parseMessage: function(msg){
    var val = NetFlexConf.toggle(msg);
    if(msg == 'actions'){ val ? NetFlex.showActions() : NetFlex.hideActions(); }
    if(msg == 'display'){ val ? NetFlex.showTitles()  : NetFlex.hideTitles();  }
  },
  showTitles: function(){
    NetFlexMarkup.show('.slider-item');
  },
  hideTitles: function(){
    NetFlexStorage.readEach(NetFlex.hideTitle);
  },
  hideTitle: function(title){
    NetFlexMarkup.each('[aria-label="'+title+'"]', function(el){
      NetFlexMarkup.hideElement(el.parentElement.parentElement);
    });
  },
  showActions: function(){
    NetFlexMarkup.each('.slider-item', function(el){
      var title = NetFlex.cardTitle(el);
      title && NetFlex.showAction(el, title);
    });
    NetFlexMarkup.onclick('.netflex-toggle', NetFlexMarkup.toggleAction);
  },
  showAction: function(el, title){
    NetFlexMarkup.prepend(el, NetFlex.actionButton(title));
    NetFlexStorage.includes(title, function(included){
      var btn = el.getElementsByClassName('netflex-toggle')[0];
      included && NetFlexMarkup.toggleClass(btn, 'active');
    });
  },
  hideActions: function(){
    NetFlexMarkup.remove('.netflex-toggle');
  },
  toggleAction: function(el){
    NetFlexMarkup.toggleClass(el, 'active');
    NetFlexStorage.toggleFromList(el.getAttribute('data-title'));
  },
  cardTitle: function(el){
    var card = el.getElementsByClassName('title_card')[0];
    return card && card.getAttribute('aria-label');
  },
  actionButton: function(title){
    var button = document.createElement('button');
    button.setAttribute('class', 'netflex-toggle');
    button.setAttribute('data-title', title);
    return button;
  }
}

NetFlexMarkup.onready(NetFlex);
