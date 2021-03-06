# JS的一些新语法

我长期以来一直觉得一些语法糖没有太大意思，通过一些设计、抽象一些方法、定义一些接口等都可以把之前比较复杂的语法变简单，如果语言提供一些简便语法、内置库类等也都不错。有个前提是团队里的小伙伴都应该熟悉。不要一个人用了一些新特性，其他人很懵圈。即使这个新特性是业内流行的，也不建议。还是以自己团队的标准来。哪怕是错了大家一起错。最好团队中这些问题拿出来讨论。

不过JS确实有不少新的语法出现，有些因为项目脚手架库或者lint的关系项目中大量使用了。

### class 

OO控，所以习惯于使用class，及时es6之前也想方设法往OO上靠，之后各种babel，ts等如鱼得水。但OO的思想很多小伙伴转换不过来，可惜。

### let/const vs var

`var`有一些缺陷，应该通过let或者const完全替换。因为会用lint，所以在绝大多数场景都会提示使用。那些没有重新赋值的变量也会提示用用const 而非 let

### 解构赋值

开始这个觉得比较鸡肋，其他语言也有类似功能。但自从react等开始流行就大量使用了解构赋值，特别是一堆的prop/state/store传来传去的时候，用解构赋值真是格调满满。

```
const [a , b] = [1,2];
const {c ,d} = {a: 1 , c:2 , d:3}

// eg
const {myProp ,otherProp} = props
```

### ...扩展运算符

扩展运算符基本上和解构赋值同样的命运。但他有些特殊场景确实实用。

- 数组copy `const newArray = [...oldArray]`
- 方法调用的参数扩展 `fun(...arr)`

### async/await

异步编程服务器的承载应该会大大提高。但似乎业内反应也平平，其他的一些如netty，tornado似乎也就那样。最近提ReactiveX，除了噱头之外，也没兴起太大波澜。

但自己之前确实花了些心思。js中有几种方案做异步

1. 使用callback，各种传递
2. 使用promise
3. generate 函数
4. async/await

相对而言async/await 语法上侵入性最少，甚至比之前的一些`yield`还要漂亮。

### for of / iterator

java世界之前曾经加了个`for in` ， js发现`for in` 自己已经有了，所以只能`for of`。好冷 XD

引入了iterator方便了很多，接口真是个强大的东西，一下子大家都理顺了。清晰明了。

