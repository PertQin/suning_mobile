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
  $.getJSON('./brand.json', function (data, state) {
    if (data && data.state == 1 && state == 'success') {
			var html = "";
			html += "<li>";
				html += "<a href='#'>";
					html += "<div class='img'>";
						html += "<img src="+data.data.phone+" alt=''>";
						if (data.data.yuding) {
							html += "<div class='yuding'></div>";
						}
					html += "</div>";
					html += "<div class='desc'>";
							html += "<p class='name'>";
									html +="<i class='product-label'>"+data.data.isLabel+"</i>"+data.data.name;
							html += "</p>";
							html += "<p class='infor-label'>";
									 for (var i = 0; i < data.data.info.length; i++) {
											html += "<i>"+data.data.info[i]+"</i>&nbsp";
									 }
							html += "</p>";
							html += "<div class='price'>";
								html += "<p class='price-box'>";
										html += "<span class='price-txt'>";
											html += "¥ <strong>"+data.data.price+"</strong>.00";
										html += "</span>";
										html += "<span class='product-label'>"+data.data.productlabel+"</span>";
								html += "</p>";   
								html += "<p class='shop-num'>";
											html += "<i>评价"+data.data.price+"条</i>";
											html += "<i>好评率"+data.data.rate+"%</i>";
								html += "</p>";
								html += "<p class='sale'>";
										html += data.data.sale;
								html += "</p>";
							html +="</div>";
						html +="</div>";
				html +="</a>";
			html +="</li>";
      //本地测试，为了看到加载中效果故加上定时器
			 setTimeout(function () {
        /* 成功获取到数据后 添加到ul列表里面 */
        $('.pro-show ul').append(html);
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
		
		/**
		 * 初始化iScroll控件
		 */
		myScroll = new IScroll('#wrapper', {
			vScrollbar : false,
			probeType: 2 
		});

    myScroll.on('scrollStart' ,function () {
			  console.log(pullUpEl.className);
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
		});
			
    myScroll.on('scroll', function () {
				if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				}
	  });

    myScroll.on('scrollEnd',function () {
			  console.log(3333);
				if(pullUpEl.className.match('flip')) {
				  pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
					pullUpAction(); 
				}
		});

	}

  

