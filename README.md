<h2>slide</h2>
=====
这是一个微信里经常看到的翻页效果。<br/>
demo1和demo2效果是一样的，没有吸附功能。<br/>
demo1和demo2区别就是demo1是1个大容器里tranlateY处理， demo2是分开每一个页面单独处理。<br/>
demo1的写法如果增加一页或者减少一页对css的影响比较大，但是demo1的性能应该是最好的。<br/>
demo2单独对当前page和上一个page或下一个page处理，增加或减少一页对css和js也影响不大。但是性能应该没有demo1好。<br/>
demo3是带吸附功能的,用transition实现的，性能方面我觉得会比jq的animate效果要好。<br/>
第一个github项目 谢谢围观 ^ ^。<br/>

<h2>widget</h2>
widget目录是封装好的插件，slide1是不带吸附功能的(为了好扩展性用了demo2的方法，单独对每个page处理)
slide2是带吸附功能的，用法的灰常简单，只需要调用一个方法传几个参数
例如：  <b style="color:red;"> slide('.slide_div', 4, 150);</b>
