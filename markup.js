class NetFlexMarkup {
  find(selector) {
    return document.querySelectorAll(selector);
  }
  first(selector) {
    return this.find(selector)[0];
  }
  each(selector, callback) {
    this.find(selector).forEach(callback);
  }
  setClass(el, callback) {
    let list = el.getAttribute('class').split(' ');
    callback(list);
    list = Array.from(new Set(list.sort())).join(' ');
    el.setAttribute('class', list);
    return list;
  }
  addClass(el, x) {
    return this.setClass(el, list => list.push(x));
  }
  removeClass(el, x) {
    return this.setClass(el, list => list.splice(list.indexOf(x), 1));
  }
  hasClass(el, x) {
    return el.getAttribute('class').split(' ').includes(x);
  }
  toggleClass(el, x) {
    this.hasClass(el, x) ? this.removeClass(el, x) : this.addClass(el, x);
  }
  show(selector) {
    this.each(selector, this.showElement);
  }
  hide(selector) {
    this.each(selector, this.hideElement);
  }
  showElement(el) {
    el.style.visibility = 'visible';
  }
  hideElement(el) {
    el.style.visibility = 'hidden';
  }
  remove(selector) {
    this.each(selector, el => el.parentElement.removeChild(el));
  }
  prepend(el, node) {
    el.insertBefore(node, el.firstChild);
  }
  onclick(selector, callback) {
    this.each(selector, el => {
      el.onclick = e => {
        e.preventDefault();
        callback(e.target)
      };
    });
  }
}
