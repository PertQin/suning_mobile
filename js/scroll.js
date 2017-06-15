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



function scroll(container, el ,callback) {
    var wrap = isString(container);
    var slideEl = isString(el);
    
    if (wrap && slideEl) {
        wrap = document.querySelector(wrap);
        slideEl = document.querySelector(slideEl);
    } else {
        if (isObject(container) && isObject(el)) {
          wrap = container;
          slideEl = el;
        }  else {
          return;
        }   
    }
 

    var startPoint = 0 ;
    var startY = 0; 
    /* 导航超出限制 */
    var minY = wrap.clientHeight - slideEl.clientHeight;
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
    var type = null;
    
      /*   
      去除transition动画,为封装自定义滚动条铺垫 

      Tween动画主要参数解释： 
      t: 当前的次数 
      b: 起始值 
      c: 起始值和目标值之间的差 
      d: 总次数 
    */
    var Tween = {
      easeOut: function(t, b, c, d){
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
      },
      backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
          s = 1.70158;  
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
      } 
    }

    cssTransform(slideEl, 'translateZ',0.01);
    cssTransform(slideEl, 'translateY',0);
    wrap.addEventListener('touchstart',function(e){
      clearInterval(slideEl.scroll);
      if (callback && callback.start) {
        callback.start();
      }
      startPoint = e.changedTouches[0].pageY;
      startY = window.cssTransform(slideEl, 'translateY');
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
      cssTransform(slideEl,'translateY', slideDis);
      if (callback && callback.in) {
        callback.in();
      }
    });
    wrap.addEventListener('touchend',function(e){
      TimeDis = TimeDis == 0 ? 1: TimeDis;
      /* 缓冲距离 */
      var bufferDis = (yDis / TimeDis ) * 120;
      var slideDis = cssTransform(slideEl,'translateY');
      /* 回弹距离 */
      var target = slideDis + bufferDis;
      /* 回弹时间 */
      var time = Math.abs(bufferDis*.9);
      time = time < 300 ? 300 : time;
      if (target > 0) {
         target = 0;
         type = "backOut";
      } else if (target < minY) {
         target = minY;
         type = "backOut";
      }
      // slideEl.style.transition = time+"ms" + type;
      // cssTransform(slideEl,'translateY', target);
      move(target, time, type);
    })

  

    /* 
    Tween动画函数
    @param: tareget 终点位置
    @param: time 动画时长 
    @param: type 动画类型 
     */
    function move(target, time, type) {
       var t = 0;
       var b = cssTransform(slideEl,'translateY');
       var c = target - b ;
       var d = Math.ceil(time / 20);
       clearInterval(slideEl.scroll);
       slideEl.scroll = setInterval(function(){
           t++; 
           if (t > d) {
             clearInterval(slideEl.scroll);
             if (callback && callback.over) {
                callback.over(scrollBar);
             }
           } else {
             var top = Tween['easeOut'](t, b, c, d);
             cssTransform(slideEl, 'translateY', top);
             if (callback && callback.in) {
                callback.in();
             }
           }
       },20);
    }
  } 