/* 
* @Author: Qinshan
*/

/*  搜索框关键词隐藏 */
(function(){
  function keyWords() {
    var searchInput = document.getElementById('searchInput');
    searchInput.onfocus = function(){
      searchInput.value = "";
    }
    searchInput.onblur = function(){
      searchInput.value = "抢200元无门槛券";
    }
  }
  window.keyWords = keyWords;
})(window,document);

/* 搜索框颜色渐变  */
(function(window,document){
  var search = {  
    opacity: 0, 
    scrollTop: 0,
    searchGradient: function(){
      var search_container = document.querySelector('#header_container');
      var swipe = document.querySelector('.swipe');
      var swipeHeight  = swipe.offsetHeight;

      window.onscroll = function() {
        this.scrollTop = window.pageYOffset ||  document.documentElement.scrollTop || document.body.scrollTop;
        /* window被卷曲的高度 */
        if (this.scrollTop > swipeHeight) {
          this.opacity = 1;
        } else {
          this.opacity = 1 * (this.scrollTop / swipeHeight);
        }
        search_container.style.background = "rgba(250,188,9,"+opacity+")";
      }
    }
  };
  window.search = search;
})(window,document);


/*  封装C3属性函数 
* el   元素
* attr 属性名
* val  属性值
* 功能  设置/获取
* 使用注意: 该函数必须先设置 才能获取 
*/
(function(window) {
  function cssTransfrom(el, attr, val) {
    if (!el.transform) {
      el.transform = {}
    } 
    if (arguments.length > 2) {
        el.transform[attr] = val; 
        var sVal = " ";
        for (var s in el.transform) {
          switch(s) {
            case "rotate": 
            case "skewX":
            case "skewY":
                sVal += s+"("+el.transform[s]+"deg)";
                break;
            case "translateX":
            case "translateY":
            case "translateZ":
                sVal += s+"("+el.transform[s]+"px"+")";
                break;
            case "scaleX": 
            case "scaleY":
            case "scale": 
                sVal += s+"("+el.transform[s]+")";
                break;
          }
          el.style.WebkitTransform = el.style.transform = sVal;
        } 
    } else {
       val = el.transform[attr];
       if (typeof val == "undefined") {
         if (attr == "scale" || attr == "sacleX" || attr == "scaleY") {
           val = 1;
         } else {
           val = 0;
         }
       }
       return val;
    }
  }
  window.cssTransfrom = cssTransfrom 
})(window);


/*  
  Banner轮播 
*/
(function(window,document){
    function Banner() {
      var timer = null; 
      var wrap = document.querySelector('.swipe');
      var list = document.querySelector('.swipe-ul');
      list.innerHTML += list.innerHTML;
      var lis = document.querySelectorAll('.swipe-ul li');
      var dots = document.querySelectorAll('.pager ol li');
      /*  手指初始坐标 */
      var startPoint = 0;
      /* 滑动元素初始坐标 */
      var startX = 0;
      var now = 0;
      /* 判断是否有Y轴移动  */
      var isMove = true;
      var isFirst = true;
      cssTransfrom(list,'translateZ',0.01);
      cssTransfrom(list,'translateX',0);
      auto();
      wrap.addEventListener('touchstart', function(e){
          clearInterval(timer);
          list.style.transition = "none";
          var ListLeft = window.cssTransfrom(list,'translateX');
          now = Math.round(-ListLeft / wrap.offsetWidth);
          if ( now==0 ){
            now = dots.length;
          }
          if ( now == lis.length-1 ) {
            now = dots.length-1 ;
          }
          window.cssTransfrom(list,'translateX', -now * wrap.offsetWidth);
          startPoint = {pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY};
          startX = window.cssTransfrom(list,'translateX');
      });
      wrap.addEventListener('touchmove', function(e){
        if (!isMove) {
          return;
        } 
        var nowPoint = e.changedTouches[0];
        var disX = nowPoint.pageX - startPoint.pageX;
        var disY = nowPoint.pageY - startPoint.pageY;
        /* 防止用户在图片上上下滑动 */
        if (isFirst) {
          isFirst = false;
          if (Math.abs(disY) > Math.abs(disX)) {
            isMove = false;
          } 
        }
        if (isMove) {
          window.cssTransfrom(list,'translateX', startX + disX);
        }  
      });
      wrap.addEventListener('touchend', function(){
        /* 计算: 滑动到下一张还是上一张 
        * now : 滑动到第几张  1 2 3 ...
        */
        var ListLeft = window.cssTransfrom(list,'translateX');
        now = Math.round(-ListLeft / wrap.offsetWidth);
        list.style.transition = ".3s cubic-bezier(0.1,0.57,0.1,1)";
        tab();
        auto();
      });
      function auto() {
        clearInterval(timer);
        timer = setInterval(function(){
          if ( now == lis.length-1 ) {
            now = dots.length-1 ;
          }
          list.style.transition = "none";
          window.cssTransfrom(list,'translateX', -now * wrap.offsetWidth);
          /* 解决无缝轮播 回流闪现的问题  调整参数： 时间 大小 */
          setTimeout(function(){
            now++;
            list.style.transition = "0.6s";
            tab();
          },1000);
        },2000);
      }
      function tab() {
         window.cssTransfrom(list,'translateX', -now * wrap.offsetWidth);
         for (var i = 0; i < dots.length; i++) {
            dots[i].className = "";
         }
        dots[now%dots.length].className = "current";
      }
    }
    window.Banner = Banner;
})(window,document);

/* 
  秒杀时间 
*/
(function(window){
  /* 倒计时 */
	function downTime(){

		var time = 3 * 60 * 60;

		var ms_time = document.querySelector('.ms_time');

		var spans = document.querySelectorAll('.ms_time span');

		var timer  = setInterval(function(){
			time --;
			if(time <0){
				clearInterval(timer);
				return false;
			}
			var h = Math.floor(time/3600);

			var m = Math.floor(time%3600/60);

			var s = time%60;	

    	spans[0].innerHTML = Math.floor(h/10);
			spans[1].innerHTML = h%10;

			spans[2].innerHTML = Math.floor(m/10);
			spans[3].innerHTML = m%10;

			spans[4].innerHTML = Math.floor(s/10);
			spans[5].innerHTML = s%10;
			
		},1000);
	}
  window.downTime = downTime;
})(window);


/*
  秒杀Banner

  导航缓冲原理: 
  缓冲的快慢,和最后一次移动的速度有关
  速度快,缓冲距离越大
  速度慢,缓冲距离越小 
  速度 = 距离 / 时间

  距离 = 上次位置 - 移动后位置的位置 
  时间 = 上次时间 - 移动后位置的时间 

*/
(function(window,document){
  function Seckill() {
    var swiper = document.querySelector('.swiper');
    var slideEl  = document.querySelector('.swiper ul');
    var startPoint = 0 ;
    var startX = 0; 
    /* 导航超出限制 */
    var minX = swiper.clientWidth - slideEl.clientWidth;
    var step = 1;
    /* 
     导航缓冲 
     lastTiem: 手指按下的时间 
     lastX: 手指按下的坐标 
     TimeDis: 时间差 
     xDis: 距离差 
    */
    var lastTime = 0;
    var lastX = 0;
    var TimeDis = 0;
    var xDis = 0;
    cssTransfrom(slideEl, 'translateZ',0.01);
    cssTransfrom(slideEl, 'translateX',0);
    swiper.addEventListener('touchstart',function(e){
      slideEl.style.transition = "none";
      startPoint = e.changedTouches[0].pageX;
      startX = window.cssTransfrom(slideEl, 'translateX');
      lastTime = new Date().getTime(); 
      lastX = startPoint;
      TimeDis = 0;
      xDis = 0;
    });
    swiper.addEventListener('touchmove',function(e){
      var nowPoint = e.changedTouches[0].pageX;
      var dis = nowPoint - startPoint; 
      var left = dis + startX; 
      var nowTime = new Date().getTime();
      if (left > 0) {
        step = 1 - left / swiper.clientWidth ;  /* 根据长度计算弹性系数,超过越多,弹性系数越小 */
        left =  parseInt(step * left); 
      } else if (left < minX) {
        var over = minX - left ; /* 超出距离 */
        step  = 1 - over / swiper.clientWidth;
        over = parseInt(step * over);
        left = minX - over;
      }
      xDis = nowPoint - lastX ;
      TimeDis = nowTime - lastTime;
      lastX = nowPoint; 
      lastTime = nowTime;
      window.cssTransfrom(slideEl,'translateX', left);
    });
    swiper.addEventListener('touchend',function(e){
      TimeDis = TimeDis == 0 ? 1: TimeDis;
      /* 缓冲距离 */
      var bufferDis = (xDis / TimeDis ) * 200;
      var left = window.cssTransfrom(slideEl,'translateX');
      /* 回弹距离 */
      var target = left + bufferDis;
      /* 回弹时间 */
      var time = Math.abs(bufferDis*.9);
      time = time < 300 ? 300 : time;
      /* 贝塞尔曲线 */
      var type = " cubic-bezier(.34,.92,.58,.9)";
      if (target > 0) {
         target = 0;
         type = " cubic-bezier(0.1,0.57,0.1,1)";
      } else if (target < minX) {
         target = minX;
         type = " cubic-bezier(0.1,0.57,0.1,1)";
      }
      slideEl.style.transition = time+"ms" + type;
      window.cssTransfrom(slideEl,'translateX', target);
    })
  } 
  window.Seckill = Seckill;
})(window,document);


/*  
  信息滚动 
*/
(function(window, document){
   function infoRoll() {
      var index = 0;
      var infoBox = document.querySelector('.toutiao .content ul');
      var info = document.querySelectorAll('.toutiao .content ul li');
      var height = info[0].offsetHeight;
      infoBox.appendChild(info[0].cloneNode(true));
      infoBox.appendChild(info[1].cloneNode(true));
      var timer = null; 
      timer = setInterval(function(){
        index ++;
        if (index > 4) { 
            infoBox.style.transition = "none";
            window.cssTransfrom(infoBox, 'translateY', 0);
            index = 1;
        } else {
            infoBox.style.transition = "0.5s";
            window.cssTransfrom(infoBox, 'translateY', -index * height);
        }
      },1000);
   }
   window.infoRoll = infoRoll;
})(window, document);


/*  
 广告轮播
*/
(function(window, document){
  function adverBanner(wrap,list,lis,dots) {
    var timer = null; 
      var wrap = document.querySelector(wrap);
      console.log(wrap);
      var list = document.querySelector(list);
      list.innerHTML += list.innerHTML;
      var lis = document.querySelectorAll(lis);
      var dots = document.querySelectorAll(dots);
      /*  手指初始坐标 */
      var startPoint = 0;
      /* 滑动元素初始坐标 */
      var startX = 0;
      var now = 0;
      /* 判断是否有Y轴移动  */
      var isMove = true;
      var isFirst = true;
      cssTransfrom(list,'translateZ',0.01);
      cssTransfrom(list,'translateX',0);
      auto();
      wrap.addEventListener('touchstart', function(e){
          clearInterval(timer);
          // alert(11);
          list.style.transition = "none";
          var ListLeft = window.cssTransfrom(list,'translateX');
          now = Math.round(-ListLeft / wrap.offsetWidth);
          if ( now==0 ){
            now = 3;
          }
          if ( now == 5 ) {
            now = 2;
          }
          window.cssTransfrom(list,'translateX', -now * wrap.offsetWidth);
          startPoint = {pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY};
          startX = window.cssTransfrom(list,'translateX');
      });
      wrap.addEventListener('touchmove', function(e){
        if (!isMove) {
          return;
        } 
        var nowPoint = e.changedTouches[0];
        var disX = nowPoint.pageX - startPoint.pageX;
        var disY = nowPoint.pageY - startPoint.pageY;
        /* 防止用户在图片上上下滑动 */
        if (isFirst) {
          isFirst = false;
          if (Math.abs(disY) > Math.abs(disX)) {
            isMove = false;
          } 
        }
        if (isMove) {
          window.cssTransfrom(list,'translateX', startX + disX);
        }  
      });
      wrap.addEventListener('touchend', function(){
        /* 计算: 滑动到下一张还是上一张 
        * now : 滑动到第几张  1 2 3 ...
        */
        var ListLeft = window.cssTransfrom(list,'translateX');
        now = Math.round(-ListLeft / wrap.offsetWidth);
        list.style.transition = ".3s cubic-bezier(0.1,0.57,0.1,1)";
        tab();
        auto();
      });
      function auto() {
        clearInterval(timer);
        timer = setInterval(function(){
          if ( now == lis.length-1 ) {
            now = 2 ;
          }
          list.style.transition = "none";
          window.cssTransfrom(list,'translateX', -now * wrap.offsetWidth);
          console.log(now);
          /* 解决无缝轮播 回流闪现的问题  调整参数： 时间 大小 */
          setTimeout(function(){
            // console.log(now);
            now++;
            list.style.transition = "0.6s";
            tab();
          },1000);
        },3000);
      }
      function tab() {
         window.cssTransfrom(list,'translateX', -now * wrap.offsetWidth);
         for (var i = 0; i < dots.length; i++) {
            dots[i].className = "";
         }
        dots[now%3].className = "current";
      }
  }
  window.adverBanner = adverBanner;
})(window,document);


/*  关键字  */
keyWords();
/* 搜索框渐变 */
search.searchGradient();
/* 首页大Banner */
Banner();
/* 秒杀倒计时 */
downTime();
/* 秒杀Banner */
Seckill();
/* 信息滚动 */
infoRoll();
/* 广告轮播 */
adverBanner('.first-adver-banner','.first-adver-banner .swiper','.first-adver-banner  .swiper li','.first-adver-banner .pager li');
adverBanner('.second-adver-banner','.second-adver-banner .swiper','.second-adver-banner  .swiper li','.second-adver-banner .pager li');
adverBanner('.hdtj .swiper-container','.swiper-container .swiper-ul','.swiper-container .swiper-ul li','.swiper-container  .pager-ul li');
 


   
