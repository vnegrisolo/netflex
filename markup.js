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
  toggleClass: function(el, item){
    var list = el.getAttribute('class').split(' ');
    if(list.includes(item)){
      list.splice(list.indexOf(item), 1);
    }else{
      list.push(item);
    }
    list = Array.from(new Set(list.sort()));
    el.setAttribute('class', list.join(' '))
  },
  show: function(el){
    el.style.visibility = 'visible';
  },
  hide: function(el){
    el.style.visibility = 'hidden';
  },
  remove: function(el){
    el.parentElement.removeChild(el);
  },
  prepend: function(el, node){
    el.insertBefore(node, el.firstChild);
  },
  onclick: function(selector, callback){
    NetFlex.Markup.forEach(selector, function(el){ el.onclick = callback; });
  },
  onready: function(callback){
    window.addEventListener('load', callback);
  }
}
