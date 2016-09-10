NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Markup'] = {
  find: function(selector){
    return document.querySelectorAll(selector);
  },
  first: function(selector){
    return NetFlex.Markup.find(selector)[0];
  },
  forEach: function(selector, callback){
    NetFlex.Markup.find(selector).forEach(function(el){ callback(el); });
  },

  show: function(el){
    el.style.visibility = 'visible';
  },
  hide: function(el){
    el.style.visibility = 'hidden';
  },

  onclick: function(selector, callback){
    NetFlex.Markup.forEach(selector, function(el){ el.onclick = callback; });
  },

  onready: function(callback){
    document.addEventListener('DOMContentLoaded', callback);
  }
}
