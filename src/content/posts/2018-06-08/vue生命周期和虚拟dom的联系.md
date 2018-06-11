# vue生命周期和虚拟dom

项目里有一个vue的component，使用它的页面需要多次不停的使用它。但有希望这个component做的很独立、简单。每次都走一个完整的生命周期，不要有特殊的流程去重新渲染。

vue组建如何去不停的重新create呢？在解决的过程中对整个生命周期和虚拟dom有了更进一步的认识。

## 初始方案使用render

官方文档里有相关方案 [render-function](https://cn.vuejs.org/v2/guide/render-function.html) 看上去似乎就是我们想要的，但是实际中却碰到一些问题，文档上似乎也没提到对我们来说最关键一点。

开始按照文档的思路，手动建一个component，把需要的组建包装进去

```javascript
// usage:  <wrapper-component :data="showData"/>

Vue.component('wrapper-compoent', {
 render: function (createElement) {
    console.log('render is called from wrapper component')
    return createElement(
        'real-component'
    )
  },
  // .....
})
```

但是调试下来发现，虽然render方法确实每次被调用了，但是real-component除了第一次是create之后，后续都是update，而不是我们预想的通过createElement之后都会是create

## 尝试用虚拟dom来解释原因

文档上写了，createElement其实是创建了一个VNode，而不是真正的dom。VNode正式虚拟dom的概念。虽然每次都创建一个vnode，但是是不是渲染的时候把新创建的vnode和之前的vnode认为是同一个，只是部分属性不同。

如果这么理解，就可以解释为啥后续虽然调用了createElement但是只会发生update。

## 找下比较两个vnode的实现方式

发现有很多已经调研过这个vnode对比的问题了

```javascript
function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}
```

看代码有很多判断，上来就判断了key，就以key来尝试吧。

## 通过key来进行component的重新渲染

更改原先的render方法思路

```javascript
// usage:  <wrapper-component :data="showData" , :key="uniqKey"/>
Vue.component('wrapper-compoent', {
 render: function (createElement) {
    console.log('render is called from wrapper component')
    return createElement(
        'real-component' , 
        {key: this.key}
    )
  },
  props: ["key"]
})
```

搞定了，加上一个唯一性的key之后，每次都会从create开始。

继续考虑是不是不用render了

```html
<wrapper-component :data="showData" , :key="uniqKey"/>
 //换成
<real-component :data="showData" , :key="uniqKey"/>
```

发现一样可以！简单很多了。

再思考下vue-route同一个路由跳转下是不是也有类似问题。
尝试之后发现果然 见例子 [https://jsfiddle.net/kkito/zLdx9pno/2/](https://jsfiddle.net/kkito/zLdx9pno/2/)

## 最后的一些总结思考

vue的dom渲染机制底层还是虚拟dom，通过一些比较来判断是否要create或者只是update，或者甚至什么都不用操作。其他一些诸如生命周期都是构建在这个前提之上的。create ， mount，还是update。如果sameNode方法判断一样，就只会使用update。即使是vue route也一样。但加上了诸如key等一些特性，那么每次都会重新create。尝试在vue-route对应的component的create函数里指定了this.$vnode.key，就会重新create了。
看来原理才是所有的基础和本源。

