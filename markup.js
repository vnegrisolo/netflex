var NetFlexMarkup = {
  find: function(selector){
    return document.querySelectorAll(selector);
  },
  first: function(selector){
    return NetFlexMarkup.find(selector)[0];
  },
  each: function(selector, callback){
    NetFlexMarkup.find(selector).forEach(callback);
  },
  toggleClass: function(el, x){
    var list = el.getAttribute('class').split(' ');
    list.includes(x) ? list.splice(list.indexOf(x), 1) : list.push(x);
    el.setAttribute('class', Array.from(new Set(list.sort())).join(' '));
  },
  show: function(selector){
    NetFlexMarkup.each(selector, NetFlexMarkup.showElement);
  },
  showElement: function(el){
    el.style.visibility = 'visible';
  },
  hide: function(selector){
    NetFlexMarkup.each(selector, NetFlexMarkup.hideElement);
  },
  hideElement: function(el){
    el.style.visibility = 'hidden';
  },
  remove: function(selector){
    NetFlexMarkup.each(selector, function(el){
      el.parentElement.removeChild(el);
    });
  },
  prepend: function(el, node){
    el.insertBefore(node, el.firstChild);
  },
  onclick: function(selector, callback){
    NetFlexMarkup.each(selector, function(el){
      el.onclick = function(e){ callback(e.target); };
    });
  },
  onready: function(callback){
    window.onload = callback.init;
  }
}
