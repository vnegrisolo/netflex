NetFlex = typeof NetFlex == 'undefined' ? {} : NetFlex
NetFlex['Markup'] = {
  find: function(selector){
    return document.querySelectorAll(selector);
  },
  first: function(selector){
    return NetFlex.Markup.find(selector)[0];
  },
  each: function(selector, callback){
    NetFlex.Markup.find(selector).forEach(callback);
  },
  toggleClass: function(el, x){
    var list = el.getAttribute('class').split(' ');
    list.includes(x) ? list.splice(list.indexOf(x), 1) : list.push(x);
    el.setAttribute('class', Array.from(new Set(list.sort())).join(' '));
  },
  show: function(selector){
    NetFlex.Markup.each(selector, function(el){
      el.style.visibility = 'visible';
    });
  },
  hide: function(selector){
    NetFlex.Markup.each(selector, function(el){
      el.style.visibility = 'hidden';
    });
  },
  remove: function(selector){
    NetFlex.Markup.each(selector, function(el){
      el.parentElement.removeChild(el);
    });
  },
  prepend: function(el, node){
    el.insertBefore(node, el.firstChild);
  },
  onclick: function(selector, callback){
    NetFlex.Markup.each(selector, function(el){
      el.onclick = function(e){ callback(e.target); };
    });
  },
  onready: function(callback){
    window.addEventListener('load', callback.init());
  }
}
