# echarts学习2

## esl 一个AMD加载器

- [https://github.com/ecomfe/esl](https://github.com/ecomfe/esl) 主页上说自己如何如何牛x，但他喵的链接页面里的内容都过期了
- doc/config.md 里面稍微写了些东西，稍微看看就明白了


## zrender 一个canvas的包装库

- [https://github.com/ecomfe/zrender](https://github.com/ecomfe/zrender) , [https://ecomfe.github.io/zrender/](https://ecomfe.github.io/zrender/) 一个德行，文档早就过期了，还写的有模有样，困惑了半天。
- github源码里有test目录，只要加上esl.js都能跑起来

## echarts的优劣

### 优点

- 文档，例子很齐全
- 支持的图表类型很多
- 支持一些例如data zoom等交互组件
- 浏览器支持，图表成体系，baidu支持
- 语法简单

### 缺点

- 不能完全自己定制化，虽然本身提供很多option，但如果不能满足，很难做。
- canvas的原因，都是代码实现，相对html，svg可读性差了些
- canvas支持html tag能力没有很大一个软肋

不知道那些确定svg的图表库能不能解决。

