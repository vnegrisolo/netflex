function $(selector) { return document.querySelectorAll(selector); }

function show(el) { el.style.visibility = 'visible'; }
function hide(el) { el.style.visibility = 'hidden'; }

function onclick(selector, callback) {
  $(selector).forEach(function(el){ el.onclick = callback; });
}
function onsubmit(selector, callback) {
  $(selector).forEach(function(el){ el.onsubmit = callback; });
}
