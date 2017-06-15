## 项目简介
  - 本项目较为完整地了一套苏宁易购web移动端购物流程
  - 主要有主页，登录注册，商品列表，品牌页，商品详情等页面
  - 动态计算rem，使网页兼容各移动端浏览器
  - 用less编写高效清晰的css代码 
  - 百分比布局、flex布局、媒体查询 
  - 原生js封装移动端部分特效 
  - 依赖zepto.js、swiper、iscroll等移动端常见库开发
  - 利用Ajax技术对DOM异步加载、登录注册验证 
  - 用nodeJs提供登录注册验证接口 
  	- 打开命令窗口，输入 `node app.js` 开启服务
  	- 服务监听3000端口
  - 增加了对html5新标签的使用
  - 利用animate.css、css3提升体验
  - 对页面的加载的处理 
  	+ 图片：使用第三方loadLazy.js插件对楼层图片懒加载,用webpjs使webp格式的图片兼容不同浏览器、背景图设置background-size，普通图片设置宽高
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

#### 商品列表页
- 原生js封装自定义scroll.js，用于分类目录 | 分类详细，实现特效： √
  + 滑动缓冲动画
  + 超出回弹动画
  + 动画基于Tween库的easeOut,backOut
- 封装自定义滚动条 √ 
- 分类目录每项点击后，分类详细切换到对应分类 ×
- 头部广告轮播 √

![](http://i4.buimg.com/519918/ad61dcdf1d3ef844.png)

#### 品牌页
- zepto+iScroll+ajax上拉加载数据 √
  + 构建了brand.json文件，模拟后台数据
  + 利用IScroll的scrollStart、scroll、scrollEnd三个事件切换提示动画
  + 通过ajax从后台请求过来数据，拼凑模板，渲染到页面上。

![](http://i1.piimg.com/519918/db3e1b7e01d11aa6.png)

#### 商品详情页
- swiper第三方库实现商品图片轮播 √
- 抢购倒计时 √
- 地址三级联动 ×

![](http://i1.piimg.com/519918/40791e8a0764b996.png)

#### 登录注册页
- zepto+Ajax+正则 验证登录注册 √
- 验证码倒计时 √
- sessionStorage记录账户 √
- 第三方登录 √
 
![](http://i1.piimg.com/519918/60b9a20197eb410a.png)

![](https://ooo.0o0.ooo/2017/06/15/5942355d7e70a.png)

![](https://ooo.0o0.ooo/2017/06/15/594235f7391ac.png)