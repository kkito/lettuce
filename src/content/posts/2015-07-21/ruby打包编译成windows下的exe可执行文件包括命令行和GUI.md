## ruby在windows下打包编译成exe可执行文件(命令行 & GUI图形界面)

### windows xp下安装ruby

1. 虚拟机准备windows xp老古董系统
1. http://rubyinstaller.org/ 下载windows版的ruby安装包，2.2版本的
1. 安装好之后出错，看起来似乎默认是64位
1. 找一个老版本1.9.3，安装，ok

### 编译打包工具 ocra

1. 调研打包工具 rubyscript2exe , Exerb ， Ocra
1. 前两个似乎很久没更新了，而且不在github上，Ocra文档啥的比较多
1. c:\Ruby193\bin\gem install ocra
1. 随便写个ruby hello world程序，c:\Ruby193\bin\ruby.exe helloworld.rb # it works
1. c:\Ruby193\bin\ruby.exe C:\Ruby193\lib\ruby\gems\1.9.1\gems\ocra-1.3.5\bin\ocra helloworld.rb # 会生成一个ruby图标的exe


### 打包原理探究

1. 会把ruby的整个环境都打包起来，把需要的gem包也放进去
1. exe运行时自动解压缩到一个临时目录 eg： C:\Documents and Settings\CURRENTUSER\Local Settings\Temp\ocrE.tmp
1. 三个文件夹 bin lib src , 源代码就在src目录下 -__-!


### gui的编译 wxruby

1. 调研了shoes ， wxruby  , fxruby ，都挺混乱，先用wxruby吧
1. gem install wxruby helloworld程序出错
1. 原来还有版本一说 ， uninstall wxruby ； gem install wxruby-ruby19
1. ocra 编译，编译的时候会运行程序，关掉后继续，生成exe。点击exe，先跳出cmd的黑框，然后再有GUI的窗口
1. ocra编译的时候如何跳过 if !Object.const_defined?(:Ocra) then MinimalApp.new.main_loop  ;end
1. 执行exe的时候如何避免黑框 ocra --windows wxrubytest.rb # it works 
1. https://github.com/larsch/ocra 文档有很多参数 --icon --no-lzma等等

### 命令行优化，借鉴下linux下的做法
1. 安装好ruby之后的标准做法是要把ruby的bin目录放到系统环境变量的Path中去
1. 借鉴下linxu下的做法新建个c:\mybin , 把这个目录放到系统环境变量中去
1. c:\mybin\ruby.bat # 里面内容就是 c:\Ruby193\bin\ruby.exe %*
1. c:\mybin\ocra.cmd # c:\Ruby193\bin\ruby.exe C:\Ruby193\lib\ruby\gems\1.9.1\gems\ocra-1.3.5\bin\ocra %*
1. 运行起来就直接 ocra --windows wxrubytest.rb --output cool.exe


