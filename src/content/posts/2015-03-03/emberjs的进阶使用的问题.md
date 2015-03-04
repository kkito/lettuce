## 初略看了下文档还有些问题需要解决

### 如何动态的加载x-handlebars template

有人给出答案(http://stackoverflow.com/questions/9469235/is-it-possible-to-load-a-handlebars-template-via-ajax) 通过ajax获得之后直接放在Ember.TEMPLATES中

### jade handlebars 

直接写jade代码，node parse之后应该可以正常使用


### model的使用，restful api ， model的缓存 ， 如何清理缓存

文档上的[model](http://emberjs.com/guides/models) 说明很详细，model的CRUD，使用adapter类配置服务器的一些url，header等信息。
DS.Model需要使用额外的[ember-data.js](https://github.com/emberjs/data) 项目说明和ember model的文档有很多重合内容。

store可以起到缓存作用，似乎还不支持只能使用 store.unloadAll(type)


### 自定义component和自定义helper的区别

[component](http://emberjs.com/guides/components/defining-a-component/) 虽然是基于handlebars，但是抽象层次比handlebars的helper要高，helper致力于提供一些便利方法，而component则类似react致力于组件。
component也可以nested (http://codepen.io/vinothwindows47/pen/syJAB?editors=101) ,[事件冒泡](http://stackoverflow.com/questions/24057289/ember-nested-components-events-bubbling)
