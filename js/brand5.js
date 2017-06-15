/*
  基本参数: 
    myScroll  IScroll插件实例化对象
    pullUpEl  pullUp的DOM对象 
    pullUpOffset  pullup的高度 

*/

var myScroll,
    pullUpEl,
    pullUpOffset;

/*  上拉请求数据  */
function pullUpAction () {
  $.getJSON('./test.json', function (data, state) {
    if (data && data.state == 1 && state == 'success') {
      //本地测试，为了看到加载中效果故加上定时器
      setTimeout(function () {
        /* 成功获取到数据后 添加到ul列表里面 */
        $('.pro-show ul').append(data.data);
        /* 此时DOM结构改变,需要告诉IScroll,重新计算 */
        myScroll.refresh();
      }, 600);
    }
  });
}

//去除浏览器默认事件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//domready后绑定初始化事件
document.addEventListener('DOMContentLoaded', loaded, false);


function loaded() {
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		
		myScroll = new iScroll('wrapper', {
			vScrollbar : false,
			topOffset : pullUpOffset,
			onRefresh : function () {
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
			},
			onScrollMove: function () {
				if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				}
			},
			onScrollEnd: function () {
				if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
					pullUpAction();
				}
			}
		});
}

  

