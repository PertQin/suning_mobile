### 使用技术栈  
  - 动态计算rem，使网页兼容各移动端浏览器
  - 用less编写高效清晰的css代码 
  - 百分比布局、flex布局、媒体查询 
  - 原生js封装移动端部分特效 
  - 依赖zepto.js、swiper、iscroll等移动端常见库开发
  - 利用Ajax技术对DOM异步加载、登录注册验证 
  - 用nodeJs提供登录注册验证接口 
  - 使用animate.css提升体验
  - 对页面的加载的处理 
  	+ 图片：使用第三方loadLazy.js对楼层图片懒加载
  	+ 减少HTTP请求，使用gulp对js、css打包合并，对图片等静态资源压缩

#### 首页 
 - 搜索框渐变 √
 - 原生js封装移动端轮播图 √
   + 实现效果：
   + 1、拖动图片，距离超过Banner容器一半，图片换到下一张，反之，图片还是当前
   	 + 解决安卓真机下,transition动画闪烁问题 
	 + ① 开启3d加速 即 transition3d(x,y,z)
	 + ② css设置 
    	 + 运动元素父级 : -webkit-transform-style: perserve-3d
    	 + 运动元素： -webkit-backface-visibility: hidden;
   + 2、分页器的小圆点跟随图片滑动改变
   + 3、自动轮播
- 秒杀倒计时 √
- 秒杀商品轮播 √
  	+ 实现效果：
  	+ 1、滑动缓冲动画
  	+ 2、超出回弹动画
  	+ 动画基于c3的transition贝塞尔曲线
- 广告轮播 √
- 商品推荐轮播 √
- 图片懒加载 √
- 返回顶部 √

![](http://i1.piimg.com/519918/82da7335187d8640.png)

#### 分类页
- 原生js封装自定义scroll.js，用于分类目录 | 分类详细，实现特效： √
  + 滑动缓冲动画
  + 超出回弹动画
  + 动画基于Tween库的easeOut,backOut
- 封装自定义滚动条 √ 
- 分类目录每项点击后，分类详细切换到对应分类 ×
- 头部广告轮播 √

![](http://i4.buimg.com/519918/ad61dcdf1d3ef844.png)

#### 品牌页
- zepto+iScroll加载特效 √

![](http://i1.piimg.com/519918/db3e1b7e01d11aa6.png)

#### 商品详情页
- swiper第三方库实现商品图片轮播 √
- 抢购倒计时 √
- 地址三级联动 ×

![](http://i1.piimg.com/519918/40791e8a0764b996.png)

#### 登录注册页
- zepto+Ajax+正则 验证登录注册 √
- 验证码倒计时 √
- 第三方登录 √
 
![](http://i1.piimg.com/519918/60b9a20197eb410a.png)