NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Conf'] = {
  display: false,
  actions: false
}

NetFlex['App'] = {
  toggleDisplay: function(){
    if(NetFlex.Conf.display = !NetFlex.Conf.display){
      NetFlex.App.showTitles()
    }else{
      NetFlex.App.hideTitles();
    }
  },
  toggleActions: function(){
    if(NetFlex.Conf.actions = !NetFlex.Conf.actions){
      NetFlex.App.showActions()
    }else{
      NetFlex.App.hideActions();
    }
  },
  showTitles: function(){
    NetFlex.Markup.forEach('.slider-item', NetFlex.Markup.show);
  },
  hideTitles: function(){
    NetFlex.Storage.readEach(function(title){
      NetFlex.Markup.forEach('[aria-label="'+title+'"]', function(el){
        NetFlex.Markup.hide(el.parentNode.parentNode);
      });
    });
  },
  showActions: function(){
    NetFlex.Markup.forEach('.slider-item', function(el){
      var item = null;
      var card = el.getElementsByClassName('title_card')[0];
      if(card){
        item = card.getAttribute('aria-label');
      }

      if(item){
        NetFlex.Storage.read(function(list){
          var included = list.includes(item);
          var classes = ['netflex-toggle'];
          if(included){
            classes.push('active');
          }

          var button = document.createElement('button');
          button.setAttribute('class', classes.join(' '));
          button.setAttribute('data-title', item);
          button.appendChild(document.createTextNode(item));
          el.insertBefore(button, el.firstChild);
        }).then(function(){
          NetFlex.Markup.onclick('.netflex-toggle', NetFlex.App.toggleAction);
        });
      }
    });
  },
  hideActions: function(){
    NetFlex.Markup.forEach('.netflex-toggle', function(el){
      el.parentElement.removeChild(el);
    });
  },
  toggleAction: function(el){
    var title = el.target.getAttribute('data-title');
    NetFlex.Storage.toggleFromList(title).then(NetFlex.App.toggleActions);
  }
}

NetFlex.Markup.onready(function(){
  function netFlexLoop(){
    if(!NetFlex.Conf.display){ NetFlex.App.hideTitles(); }
    setTimeout(netFlexLoop, 300);
  }
  netFlexLoop();

  document.onkeydown = function(event){
    if(event.key == 'z'){ NetFlex.App.toggleActions(); }
    if(event.key == 'x'){ NetFlex.App.toggleDisplay(); }
  };
  NetFlex.Message.receive(function(message){
    if(message == 'actions'){ NetFlex.App.toggleActions(); }
    if(message == 'display'){ NetFlex.App.toggleDisplay(); }
  });
});
