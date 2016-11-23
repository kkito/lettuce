## VueJS的服务器端渲染

[vuejs](https://vuejs.org/) 最近很火爆，之前稍微试了下。

说说[server side render](https://vuejs.org/v2/guide/ssr.html)

官网例子

```
// Step 1: Create a Vue instance
var Vue = require('vue')
var app = new Vue({
  render: function (h) {
    return h('p', 'hello world')
  }
})
// Step 2: Create a renderer
var renderer = require('vue-server-renderer').createRenderer()
// Step 3: Render the Vue instance to HTML
renderer.renderToString(app, function (error, html) {
  if (error) throw error
  console.log(html)
  // => <p server-rendered="true">hello world</p>
})

```


可以通过nodejs把原本在客户端的渲染过程直接从服务器端输出，说是提高SEO的能力。

展示一个稍微复杂的例子。可以用到component等

```
var Vue = require('vue')
var myc = Vue.component('mycomponent', {
  template: '<div>A custom component!</div>'
})
Vue.component('mycomponent2', {
  template: '<div>A custom component2!<mycomponent/></div>'
})

var app2 = new Vue({
  template: '<div id="app"> {{ message }} <mycomponent2 /></div>' ,
  data: {
      message: 'Hello Vue!'
  }
})
var renderer = require('vue-server-renderer').createRenderer()
renderer.renderToString(app2, function (error, html) {
  if (error) throw error
  console.log(html)
})
```

server side render其他一些框架也都有，比如react。

对比下现在静态网站生成项目。可以同过render partial同样的去做一些抽象，当然语法看上去差了些。一些js交互，两边其实都受限制。

从页面来说关键还是页面控件的抽象，或许用标签这种大家更熟悉的概念能够帮助设计，技术把模块控件的抽象做的更好吧。
