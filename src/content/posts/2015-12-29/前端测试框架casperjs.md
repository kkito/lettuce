## 前端测试框架 CasperJS 

### headless WebKit

PhantomJS做为一个headless的浏览器可以在命令行下完全当成一个普通浏览器操作，完全支持各种js，css，js的库等等。但作为测试他本身并不带有任何测试框架，CasperJS正式利用PhantomJS提供的机制，额外的有些封装和一些测试框架的支持。

### 安装CasperJS

理论上npm install -g capserjs就可以了，但是也不知道是慢还是墙，反正超级麻烦，taobao提供了cnpm , [http://npm.taobao.org](http://npm.taobao.org) ，安装好cnpm之后 cnpm install -g casperjs 就可以了

### 使用CasperJS的一般功能

```Javascript
var casper = require('casper').create();

// 开始请求
casper.start('http://beta.shuobaotang.com/', function() {
    // 可以获得title等各种属性
    this.echo(this.getTitle());
});

// thenOpen方式, 对应then方法的一个便利方式
casper.thenOpen('http://beta.shuobaotang.com/products/courseware/courseware.html', function() {
    this.echo(this.getTitle());
});

var hezuo_url = "http://beta.shuobaotang.com/cooperation/general.html";
var hezuo_url = "http://beta.shuobaotang.com/cooperation/public_school/cases.html";
    casper.thenOpen(hezuo_url, function() {
    this.echo(this.getTitle());
    // 可以模拟click等事件， fill方法可以模拟表单提交
    this.click('.floatnv a');
});

// 单纯的then方式
casper.then(function() {
    console.log("after clicked");
    this.echo(this.getTitle());
    this.echo(this.getCurrentUrl());
});

casper.then(function() {
    console.log("all finished");
});

casper.then(function() {
    console.log("i am done!");
});

casper.run(function(){
    console.log("totally compleleted!")
    this.exit();
});

// usage:  casperjs thefilename.js
```

### 利用CasperJS来测试

```Javascript
// 使用方式和普通的不一样，要加test
//usage casperjs test thefilename.js

// 这个不需要，也不能有
// var casper = require('casper').create();

// test.begin方法，参考帮助文档
casper.test.begin('visit main page valid', function suite(test) {
    casper.start('http://beta.shuobaotang.com/', function() {
        // 很多assert方法 参考文档
        test.assertTitle("首页——少儿英语学习数码教材,少儿英语学习网站-爱乐奇");
    }); 
    var hezuo_url = "http://beta.shuobaotang.com/cooperation/general.html";
    casper.thenOpen(hezuo_url, function() {
        test.assertTitle("产品概览_少儿英语数码教材_爱乐奇");
    }); 
    casper.run(function() {
        console.log("123123123123")
        // test done method , see document 
        test.done();
    }); 
});
 
//一个文件内可以有多个test
casper.test.begin('visit 2222 page valid', function suite(test) {
    casper.start('http://beta.shuobaotang.com/', function() {
        test.assertTitle("首页——少儿英语学习数码教材,少儿英语学习网站-爱乐奇");
    }); 
    var hezuo_url = "http://beta.shuobaotang.com/cooperation/general.html";
    casper.thenOpen(hezuo_url, function() {
        test.assertTitle("产品概览_少儿英语数码教材_爱乐奇");
    }); 
    casper.run(function() {
        console.log("123123123123")
        test.done();
    }); 
});
```
