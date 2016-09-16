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
  setClass: function(el, callback){
    var list = el.getAttribute('class').split(' ');
    callback(list);
    list = Array.from(new Set(list.sort())).join(' ');
    el.setAttribute('class', list);
    return list;
  },
  addClass: function(el, x){
    return NetFlexMarkup.setClass(el, function(list){ list.push(x); });
  },
  removeClass: function(el, x){
    return NetFlexMarkup.setClass(el, function(list){ list.splice(list.indexOf(x), 1); });
  },
  hasClass: function(el, x){
    return el.getAttribute('class').split(' ').includes(x);
  },
  toggleClass: function(el, x){
    if(NetFlexMarkup.hasClass(el, x)){
      return NetFlexMarkup.removeClass(el, x);
    }else{
      return NetFlexMarkup.addClass(el, x);
    }
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
