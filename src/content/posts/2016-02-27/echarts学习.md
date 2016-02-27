# echarts了解学习

## 简单的例子

- [http://echarts.baidu.com/](http://echarts.baidu.com/)
- [echarts in github](https://github.com/ecomfe/echarts)
- [echarts2](http://echarts.baidu.com/echarts2/)

简单的例子略过

## action的概念

在页面通过其他途径操作图表的方式，例如，触发显示tooltip，参见文档
比如button的点击触发这个，对应的tooltip就会展现

```
myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0 ,
    dataIndex: 0
})
```


## 操作图表时触发事件，例如click柱状图的某一个

```
myChart.on("click" , function(obj){
    // obj {seriesIndex: 0, seriesName: "销量", name: "衬衫", dataIndex: 0, data: 5…}
    alert(obj.name + "的" + obj.seriesName + ":" + obj.value)
})
```


## 如果改变柱状图的颜色 ， 宽度

```
option属性 
    itemStyle: {
            normal: {
                barBorderRadius: 10, // 
                //color: "red",
                color: function(item){
                // item 为柱状图对应的一个数据， {seriesIndex: 0, seriesName: "销量", name: "衬衫", dataIndex: 0, data: 5…}
                // legend 也是通过这个方法拿的
       }
   }
}
```

[echarts2的文档](http://echarts.baidu.com/echarts2/doc/doc.html) 虽然是echarts2的文档，但和3很多都是一样的


## 如何刷新，如何动画刷新

直接setOption 就行 , 但动画没有了，扒代码似乎没有暴露出来。 讨巧可以把现有的销毁掉重新来

```
mychart.dispose();
mychart = echarts.init.....
mychart.setOption(....)
```


## 数据加载动画效果播放结束后的事件

如上，动画效果播放好之后似乎没有对应的效果暴露出来，但动画播放的时候是通过配置的 {animationDuration: 5000} , 理论上通过setTimeout可以来个事件出来


## 如果custom tooltip样式

echarts2的文档有些还有例子，很不错，例如[定制tooltip出现效果，异步等](http://echarts.baidu.com/echarts2/doc/example/tooltip.html)

