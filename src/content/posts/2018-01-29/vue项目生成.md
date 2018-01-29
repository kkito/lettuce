## Vue生成项目

### 关于脚手架

有很多所谓的脚手架工具可以帮助生成项目，这些优质的脚手架往往带上了很多软件开发的最佳实践。诸如测试、持续集成配置、自动化编译、优化目录结构、打包等等。对于绝大多数人来说，使用脚手架往往比自己折腾出来的好很多。

即使有经验的我觉得还是在原有的基础上改来的更加高效，能避免出错，也能方便后续复用。

刚开始接触编程的vc中就有wizard，后来rails中集成了很多scaffold，在到nodejs中的各种。

如较为通用的 yeoman [http://yeoman.io/](http://yeoman.io/)

ember [https://ember-cli.com/](https://ember-cli.com/)

react [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)

vue也不例外 vue-cli [https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli) 

其他的一些资料 [https://cn.vuejs.org/v2/guide/installation.html#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7-CLI](https://cn.vuejs.org/v2/guide/installation.html#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7-CLI)

### 集成的工具

- 单元测试工具通常使用 jest
- 集成测试（end to end aka: e2e） nightwatchjs
- lint工具 eslint
- 打包工具 webpack

etc

### typescript

使用ts来作为开发语言,有些非官方的库

vue cli可以支持github的项目模板
vue init -h
```
# create a new project straight from a github template
$ vue init username/repo my-project
```

[https://github.com/ducksoupdev/vue-webpack-typescript](https://github.com/ducksoupdev/vue-webpack-typescript)

```
vue init ducksoupdev/vue-webpack-typescript tsvue
```

