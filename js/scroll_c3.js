 /* 
   wrap |slidEl 
       值类型:  string | Object
   wrap 滑动元素容器
   slidEl 滑动元素

 */
 
 function isString(el) {
    if( typeof(el) === "string") {
      return el;
    }
 }

 function isObject(el) {
  if( typeof(el) === "object") {
      return el;
    }
 }

 function scroll(container, el) {
    var wrap = isString(container);
    var slideEl = isString(el);
    
    if (wrap && slideEl) {
        wrap = document.querySelector(wrap);
        slideEl = document.querySelector(slideEl);
    } else {
        if (isObject(container) && isObject(el)) {
          wrap = container;
          slidEl = el;
        }  else {
          return;
        }   
    }
 

    var startPoint = 0 ;
    var startY = 0; 
    /* 导航超出限制 */
    var minY = wrap.offsetHeight - slideEl.offsetHeight;
    console.log(minY);
    var step = 1;
    /* 
     导航缓冲 
     lastTiem: 手指按下的时间 
     lastY: 手指按下的坐标 
     TimeDis: 时间差 
     yDis: 距离差 
    */
    var lastTime = 0;
    var lastY = 0;
    var TimeDis = 0;
    var yDis = 0;
    cssTransfrom(slideEl, 'translateZ',0.01);
    cssTransfrom(slideEl, 'translateY',0);
    wrap.addEventListener('touchstart',function(e){
      slideEl.style.transition = "none";
      startPoint = e.changedTouches[0].pageY;
      startY = window.cssTransfrom(slideEl, 'translateY');
      lastTime = new Date().getTime(); 
      lastY = startPoint;
      TimeDis = 0;
      yDis = 0;
    });
    wrap.addEventListener('touchmove',function(e){
      var nowPoint = e.changedTouches[0].pageY;
      var dis = nowPoint - startPoint; 
      var slideDis = dis + startY; 
      var nowTime = new Date().getTime();
      if (slideDis > 0) {
        step = 1 - slideDis / wrap.clientHeight ;  /* 根据长度计算弹性系数,超过越多,弹性系数越小 */
        slideDis =  parseInt(step * slideDis); 
      } else if (slideDis < minY) {
        var over = minY - slideDis ; /* 超出距离 */
        step  = 1 - over / wrap.clientHeight;
        over = parseInt(step * over);
        slideDis = minY - over;
      }
      yDis = nowPoint - lastY ;
      TimeDis = nowTime - lastTime;
      lastY = nowPoint; 
      lastTime = nowTime;
      cssTransfrom(slideEl,'translateY', slideDis);
    });
    wrap.addEventListener('touchend',function(e){
      TimeDis = TimeDis == 0 ? 1: TimeDis;
      /* 缓冲距离 */
      var bufferDis = (yDis / TimeDis ) * 200;
      var slideDis = cssTransfrom(slideEl,'translateY');
      /* 回弹距离 */
      var target = slideDis + bufferDis;
      /* 回弹时间 */
      var time = Math.abs(bufferDis*.9);
      time = time < 300 ? 300 : time;
      /* 贝塞尔曲线 */
      var type = " cubic-bezier(.34,.92,.58,.9)";
      if (target > 0) {
         target = 0;
         type = " cubic-bezier(0.1,0.57,0.1,1)";
      } else if (target < minY) {
         target = minY;
         type = " cubic-bezier(0.1,0.57,0.1,1)";
      }
      slideEl.style.transition = time+"ms" + type;
      cssTransfrom(slideEl,'translateY', target);
    })
  } 