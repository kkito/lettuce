## 一个screencast的介绍视频
* 视频要翻墙的(http://emberjs.com/guides/)
* 视频介绍了一个blog的展现

## get started 的例子(http://emberjs.com/guides/getting-started/)
* 一个TODO List的例子

## 照这个guide上的概念一些个人理解

1. Application 很大程度上只是一个namespace的作用
2. Template 使用handlebars作为模板<http://handlebarsjs.com/>
3. 在handlebars的基础上增加了很多helper block helper , eg outlet , link-to
4. 自定义view和内置的一些view如TextField ， Checkbox etc
5. App.Router.map中定义route和resource的区别，resource可以内嵌route，最关键是route只是对应一个路径，而resource对应的一个类似restful的一个资源，有index ， new等route [文档](http://emberjs.com/guides/routing/defining-your-routes/#toc_resources) 中有说明没有内嵌route的resource不生成index
6. 自定义Route和Controller Route可以自定义见(http://emberjs.com/guides/routing) , controller定义了一些操作action (http://emberjs.com/guides/controllers/) , Route和Controller等一些命名约定 (http://emberjs.com/guides/concepts/naming-conventions/)


