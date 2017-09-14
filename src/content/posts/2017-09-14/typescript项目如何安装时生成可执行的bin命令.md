## typescript项目如何安装时生成可执行的bin命令

### npm安装生成的命令

有很多基于npm的工具，这些工具在安装后就会生成一些命令，如
```
npm install -g http-server
```
项目代码 https://github.com/indexzero/http-server

安装之后就会有一个http-server和一个hs命令, 通过which等命令发现是装在的node环境的bin目录下的一个软连接，真正指向了../lib/node_modules/http-server/bin/http-server 

### bin文件是如何安装的

npm提供了npm link 命令去生成见 https://docs.npmjs.com/cli/link

但我们运行的时候没有跑npm link只是跑了npm install , 查看npm代码就发现，npm install其实做了很多事情，不单单安装相关的库依赖

### typescript项目碰到的问题

typescript项目原始代码是ts文件，如果安装机器上没有装ts的话是没法编译的，如果和上述一样link了一个ts命令，其实是跑不起来的。有一些思路

 - 项目依赖typescript，bin命令直接调用 node_modules/下相关的ts命令去执行代码。
 - 利用ts-node等命令去处理
 - 代码提交上去的时候直接把编译完成的js代码放在代码库中
 - 安装的时候把代码编译成js代码

### 如何在安装的时候编译成js

可能还是觉得上述第四种方案是比较方便、自动化的。如何去实现这个流程呢？借助之前npm link的思路，能不能在npm install的时候触发相关操作？

npm源码中lib/install.js中有很多方案可选，通常使用一些钩子script去处理。http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html 。常见的方案使用postinstall/prepublish等写上相关script，install的之后就会执行该步骤。在步骤中直接去run build等。

```
"scripts": {
    "tsc": "tsc",
    "build": "npm run tsc",
    "prepublish": "npm run build"
  }
```

### 钩子script使用很常见

```
  "scripts": {
      "clean": "rimraf lib && rimraf coverage",
      "format": "prettier --write \"{src,__tests__}/**/*.ts\" --single-quote --trailing-comma es5",
      "lint": "tslint --force --format verbose \"src/**/*.ts\"",
      "prepublish": "npm run build",
      "prebuild": "npm run clean && npm run format && npm run lint && echo Using TypeScript && tsc --version",
      "build": "tsc --pretty",
      "test": "jest",
      "coverage": "jest --coverage",
      "watch": "npm run build -- --watch",
      "watch:test": "jest --watch"
    }
```

