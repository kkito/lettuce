# cordova android 采坑

记录尝试cordova编译android app的各种采坑。尝试了mac和windows环境

## java版本的问题

开始报了java编译的问题，挺莫名的，本地java7不行，装了java10还是不行。似乎当前的一定要java8才可以。cordova 版本为 8.0.0。

java环境可以通过设定JAVA_HOME来指定。mac上使用了[sdkman](https://sdkman.io/) 一整套包括java，包括gradle都搞定了。windows下sdkman要整cygwin,放弃。官网上下了好几个版本的jdk，最终用8跑过。

## windows下内存问题

windows下报了些内存错误，尝试最终通过设定最小堆的方案解决。似乎是gradle跑不起来。没有太纠结。set _JAVA_OPTS=-Xms512m ，变量如何到java里去的？是通过gradle吗？有空要仔细研究下gradle。

## 模拟器环境

怎么打开调试的模拟器？开始先大家android stdio，点击avd的那个按钮，启动模拟器。然后在项目里运行 cordova run android 开始跑。有点傻叉。

cli下如何启动模拟器。[模拟器的cli](https://developer.android.com/studio/run/emulator-commandline) , 通过  emulator -list-avds ， emulator @xxx ， 来运行。通过adb命令安装和运行

```bash
./platform-tools/adb install .../platforms/android/app/build/outputs/apk/debug/app-debug.apk
./platform-tools/adb shell am start -n com.example.hello/com.example.hello.MainActivity

# 通过cordova命令启动
cordova emulate android --target="Nexus_5X_API_P"
```

## PANIC: Missing emulator engine program for 'x86' CPU

windows和mac下都碰到这个问题。指定了争取的emulator就好了。也不知道从哪里找了个错误的emulator命令。搜索有人说emulator-x86用这个命令就好了。但我本地发现 $android_sdk/emulator/emulator 运行时正常的。解决方法是在path中把 $android_sdk/emulator 放在path的最前面就好了。

## web中显式的调用onclick没反应

www目录下的index.html和js看上去都比较简单，自己瞎改改，但发现onclick居然没反应。调试发现是有个meta http-equiv="Content-Security-Policy" 的原因。

google的文档上有[说明](https://developer.chrome.com/extensions/contentSecurityPolicy#JSExecution) Inline JavaScript will not be executed 。

所以要么把那行meta删了，要不用代码的方式加上监听,ele.addEventListener('click' , func) [见mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

