  /*   
   用户是否需要添加滑动滚动条
  */

  var callback1 = {};
  callback1.start = function() {
      nav_Bar.style.opacity = 1;
  }
  callback1.in = function() {
      var top = - cssTransform(nav_ul, 'translateY') * nav_scale;
      cssTransform(nav_Bar, 'translateY' , top);
  }
  callback1.over = function() {
      nav_Bar.style.opacity = 0;
  }
  /* 左侧商品分类  */
  var nav_bar =  document.querySelector('#nav-bar');
  var nav_ul = document.querySelector('#nav-bar ul');
    /* 动态计算scrollbar的高度  scale 比例系数 */
  var nav_Bar = document.querySelector('#scrollBar');
  var nav_scale = nav_bar.clientHeight / nav_ul.offsetHeight;
  nav_Bar.style.height = nav_scale * nav_bar.clientHeight  + "px";
  scroll(nav_bar, nav_ul, callback1);


  var callback2 = {};
  callback2.start = function() {
      pro_Bar.style.opacity = 1;
  }
  callback2.in = function() {
      var top = - cssTransform(pro_scroll, 'translateY') * pro_scale;
      cssTransform(pro_Bar, 'translateY' , top);
  }
  callback2.over = function() {
      pro_Bar.style.opacity = 0;
  }
  /* 左侧商品分类  */
  var pro_detail =  document.querySelector('.pro-detail');
  var pro_scroll = document.querySelector('.pro-scroll');
    /* 动态计算scrollbar的高度  scale 比例系数 */
  var pro_Bar = document.querySelector('.pro-detail #scrollBar');
  var pro_scale = pro_detail.clientHeight / pro_scroll.offsetHeight;
  pro_Bar.style.height = pro_scale * pro_detail.clientHeight  + "px";
  scroll(pro_detail,pro_scroll,callback2);


/* 左侧商品分类 点击切换"当前状态" */
var lis = $('#nav-bar ul li');
lis.map(function(index,item){
   $(item).on('click',function(){
       if (index == 0) {
         $(this).addClass('cur')
         .css({color: "#FE256B"})
         .siblings()
         .removeClass('cur')
         .css({color: "black"});
       } else {
         $(this).addClass('cur')
         .css({color: "#2F80ED"})
         .siblings()
         .removeClass('cur')
         .css({color: "black"});
       }
   })
})

