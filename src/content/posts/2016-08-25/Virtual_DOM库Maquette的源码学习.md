# Virtual_DOM库Maquette的源码学习

## 一些关于virtual dom的问题

- 为什么需要虚拟dom 随便贴一些文章 http://lyyourc.com/2016/01/31/Virtual-DOM/
- 具体的实现方式，基本上就是调用createElement
- 除了效率高的优点，我觉得更重要的是可以把html的工作完全去掉，用纯js代码来。至少在一些场景是很适用的

## Maquette

- 有官网比其他几个好多了，随便有几个github上星星很多
- typescript实现的，正好研究下

## 一些细节问题

- 如何生成相关的dom，参见源码方法createDom ， 基本就是createTextNode or createElement 
- 结构简单， project ， dom ， h其他一些边边角角
- 有个特点，onclick oninput方法之后会自动变，研究了一会
- 原理是eventHandlerInterceptor , 在处理function类型属性时，被这个方法拦截了
- 实现方式也挺搞怪，居然先调用了scheduleRender，再处理handler，开始看懵了
- 原理是用了requestAnimationFrame ， 相关介绍 http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/
- 此方法是可以被polyfill的，直接用settimeout替换即可 https://gist.github.com/paulirish/1579671
- 为啥这个搞怪，不直接调用handler之后再render呢？代码里有段注释说IE and Edge sometimes requestAnimationFrame balhbalh ， 但为啥要用requestAnimationFrame 呢？不解
