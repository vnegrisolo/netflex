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
      NetFlexConf.actions && NetFlex.showActions();
      setTimeout(netFlexLoop, 300);
    };
    netFlexLoop();
  },
  parseMessage: function(msg){
    var val = NetFlexConf.toggle(msg);
    if(msg == 'display'){ val ? NetFlex.showTitles()  : NetFlex.hideTitles();  }
    if(msg == 'actions'){ val ? NetFlex.showActions() : NetFlex.hideActions(); }
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
      var button = el.getElementsByClassName('netflex-toggle')[0];

      title && !button && NetFlex.addActionButton(el, title);
    });
    NetFlexMarkup.onclick('.netflex-toggle', NetFlex.toggleAction);

    NetFlexStorage.read(function(list){
      NetFlexMarkup.each('.slider-item', function(el){
        var title = NetFlex.cardTitle(el);
        var included = title && list.includes(title);

        var button = el.getElementsByClassName('netflex-toggle')[0];
        var hasClass = button && NetFlexMarkup.hasClass(button, 'active');

        if(title && button && included != hasClass){
          NetFlexMarkup.toggleClass(button, 'active');
        }
      });
    });
  },
  addActionButton: function(el, title){
    var button = document.createElement('button');
    button.setAttribute('class', 'netflex-toggle');
    button.setAttribute('data-title', title);
    NetFlexMarkup.prepend(el, button);
  },
  hideActions: function(){
    NetFlexMarkup.remove('.netflex-toggle');
  },
  toggleAction: function(el){
    NetFlexMarkup.toggleClass(el, 'active');
    NetFlexStorage.toggle(el.getAttribute('data-title'));
  },
  cardTitle: function(el){
    var card = el.getElementsByClassName('title_card')[0];
    return card && card.getAttribute('aria-label');
  }
}

NetFlexMarkup.onready(NetFlex);
