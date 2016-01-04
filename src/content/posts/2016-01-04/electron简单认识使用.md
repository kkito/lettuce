# electron的任何和使用

## 一些前因后果

[Atom](https://atom.io/) 编辑器基于nodejs，把一些基础部分抽取出来成了electron。可以变成跨平台的GUI app。

## quick start

官方[quck start](http://electron.atom.io/docs/v0.36.0/tutorial/quick-start/) 有个[demo项目](https://github.com/atom/electron-quick-start)

## Dialog模块

分为main process和renderer process，有很多模块。Dialog模块是main process的。

```
// 修改demo app的main.js, 按close的时候dialog展现
app.on('ready', function() {
  const dialog = require('electron').dialog;
  mainWindow.loadURL('file://' + __dirname + '/index.html');
          
  mainWindow.on('closed', function() {
      dialog.showErrorBox("dialog", "this his content")
      mainWindow = null;
  });  
});
```


## renderer process调用main process的方案

[remote模块](http://electron.atom.io/docs/v0.36.0/api/remote/) 就是处理这的，官方demo居然跑不起来，自己改了改

```
// 类似nodejs普通方式export一个简单方法
//eg 新建 mapNumbers.js 
exports.showDialog = function(){
  var dialog = require('electron').dialog;
  dialog.showErrorBox("dialog", "this his content")
    return "myname";
}

//index.html中script中添加
// clickhandler添加上事件即可
function clickhandler() {
    var mapNumbers = require("remote").require("./mapNumbers");
    console.log(mapNumbers)
    console.log(mapNumbers.showDialog());
}
```
