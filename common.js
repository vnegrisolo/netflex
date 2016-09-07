function $(selector) { return document.querySelectorAll(selector); }

function onclick(selector, callback) {
  $(selector).forEach(function(el){ el.onclick = callback; });
}

function onsubmit(selector, callback) {
  $(selector).forEach(function(el){ el.onsubmit = callback; });
}
