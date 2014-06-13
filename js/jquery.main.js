var btnTop = $('<a class="scrollerUp" href="#">Вверх</a>').prependTo('body'),
  btnBottom = $('<a class="scrollerDown" href="#">Вниз</a>').prependTo('body'),
  tabStyleSheet = document.createElement('style'),
  body = $('body'),
  win = $(window),
  doc = $(document),
  clicked = false,
  animSpeed = 600,
  contentHeight = 0,
  maxLevel = 3,
  scrollArea,
  scrollEl,
  scrollDistance,
  tabStyleRule,
  resizeTimer,
  timer;


body.each(function(ind){
  var el = $(this);
  if(!checkScroll(el)){
    var level = 0;
    nextLevel(el, level);
  }
  scrollArea = scrollEl;
});
if(!scrollEl){
  scrollArea = win;
  scrollEl = $('body, html');
}

if(scrollEl){
  contentHeight = getContentHeight();
}

tabStyleRule = '.scrollerUp, .scrollerDown{position:fixed; top:10px; right: 10px; font: 17px/1.25 Arial, Helvetica, sans-serif !important;'+
  'color: #c00 !important; z-index: 99999; text-decoration: none !important;} .scrollerDown{top: auto; bottom: 10px;} '+
  '.scrollerUp:hover, .scrollerDown:hover{text-decoration: none !important;}';
tabStyleSheet.type = 'text/css';
if (tabStyleSheet.styleSheet) {
  tabStyleSheet.styleSheet.cssText = tabStyleRule;
} else {
  tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
}
$('head').append(tabStyleSheet);

btnTop.on('click', function(e){
  e.preventDefault();
  calculate();
  if(!clicked){
    clicked = true;
    timer = setTimeout(function(){
      scrollEl.stop().animate({scrollTop: Math.max(0, scrollArea.scrollTop() - scrollAreaHeight)} , animSpeed);
      clicked = false;
    }, 200);
  }else{
    clicked = false;
    scrollEl.stop().animate({scrollTop: 0}, animSpeed);
  }
});

btnBottom.on('click', function(e){
  e.preventDefault();
  calculate();
  if(!clicked){
    clicked = true;
    timer = setTimeout(function(){
      scrollEl.stop().animate({scrollTop: Math.min(scrollArea.scrollTop() + scrollAreaHeight, scrollDistance)}, animSpeed);
      clicked = false;
    }, 200);
  }else if(clicked){
    clicked = false;
    scrollEl.stop().animate({scrollTop: scrollDistance}, animSpeed);
  }
});

function nextLevel(els, level){
  if(els.length === 1 && level > 0) return;
  els.each(function(){
    var el = $(this);
    var currentLevel = level;
    var hasScroll = checkScroll(el);
    if(hasScroll){
      scrollEl = el;
    }else if(currentLevel < maxLevel){
      currentLevel++;
      nextLevel(el.children(), currentLevel);
    }
  });
}

function checkScroll(el){
  el.scrollTop(20);
  return el.scrollTop() === 20;
}

function getContentHeight(){
  var result = 0;
  (scrollEl.is(window) ? doc : scrollEl.children()).each(function(){
    result += $(this).outerHeight(true);
  });
  return result;
}

function calculate(){
  contentHeight = getContentHeight();
  scrollAreaHeight = scrollArea.height();
  scrollDistance = contentHeight - scrollAreaHeight;
  if(timer) clearTimeout(timer);
}

win.on('resize', function(){
  if(resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(calculate, 200);
});