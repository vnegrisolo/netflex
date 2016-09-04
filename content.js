var SEL_P = '[aria-label="';
var SEL_S = '"]';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message === 'foo'){

      chrome.storage.local.get('data', function(data) {
        data.data.forEach(function(x, i, xs){
          document.querySelectorAll(SEL_P + x + SEL_S).forEach(function(y, j, ys){
            y.parentNode.parentNode.style.display = 'none';
          });
        });
      });
    }
  }
);
