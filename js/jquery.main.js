$(function(){
  var btnTop = $('<a href="#">Вверх</a>').prependTo('body'),
    btnBottom = $('<a href="#">Вниз</a>').prependTo('body'),
    win = $(window);
  btnBottom.add(btnTop).css({
    position: 'fixed',
    top: 10,
    right: 10,
    font: '14px/17px Arial, Helvetica, sans-serif',
    color: '#c00',
    zIndex: 999999
  });
  btnBottom.css({
    top: '',
    bottom: 10
  });
  btnTop.on('click', function(e){
    e.preventDefault();
    win.scrollTop(0);
  });
  btnBottom.on('click', function(e){
    e.preventDefault();
    win.scrollTop(99999);
  });
});