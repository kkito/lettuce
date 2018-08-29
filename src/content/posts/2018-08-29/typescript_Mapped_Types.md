## typescript中的 Mapped Types

ts 2.1中的新特性 [https://blogs.msdn.microsoft.com/typescript/2016/12/07/announcing-typescript-2-1/](https://blogs.msdn.microsoft.com/typescript/2016/12/07/announcing-typescript-2-1/)

理解还不深刻，但挺有意思。之前也没有在其他语言或者框架中见过类似的实现。

### ts中interface和type的区别

一些链接

- [https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.10](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.10)
- [https://stackoverflow.com/questions/36782896/in-typescript-what-is-the-difference-between-type-and-interface](https://stackoverflow.com/questions/36782896/in-typescript-what-is-the-difference-between-type-and-interface)
- [https://palantir.github.io/tslint/rules/interface-over-type-literal/](https://palantir.github.io/tslint/rules/interface-over-type-literal/)

`type`声明使用上更加灵活，可以定义的内容相比interface也更多


### type类型声明的一些常识

```
type TheStr = 'name'|'age'|'location' ;
const instr: TheStr = 'name';

const instr2: TheStr = 'name2'; // 报错 声明了TheStr类型，只能是上述3个之一
```

其他情况见文档


### 关键字 keyof 来获取属性

同样是ts 2.1版本的新特性，猜测纯粹是Mapped Types服务的

[https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html)

```javascript
interface Person {
    name: string;
    age: number;
    location: string;
}
type K1 = keyof Person; // "name" | "age" | "location" 
```

通过上述代码就可以获得对应的type


### 通过属性名获得类型和声明一个特殊type的接口

接口通过keyof来获取相关的属性，通过属性名也可以获得对应属性的类型

```
interface IPerson {
    age: number,
    name: string,
    location: string,
}

const a: IPerson["age"] = 23;

type theNameType = IPerson['name'] // theNameType实际上就是string
```

有了特定类型之后可以声明相关的type

```
type TheStr = 'name'|'age'|'location' ;
// 可以这么声明 ， 但是，如果这么声明的话使用起来就要 ..
type IThreeGun2  = {
    TheStr: boolean
}

// type本身也可以作为一个key
const gun2:IThreeGun2 = {
    TheStr: false
}

//所以应该声明成
type IThreeGun  = {
    [P in TheStr]: boolean
}

// 属性不能 有确否则报错
const gun:IThreeGun = {
    age: false,
    location: true,
    name: true,
}
```

### 官方新加入的Mapped Type举例

先来个 Partial ,  官方实现很简单 ,泛型这个不做讨论。用了`keyof` and `?`

```
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

如何使用呢?

```
export interface IPerson {
    // tslint:disable-next-line:no-bitwise
    age: number,
    name: string,
    location: string,
}

const name:Partial<IPerson> = {
    age:23
}

//如果不用Partial就报错，没有name之类的

const name2:IPerson = {
    age:23
}

```

### 其他一些Mapped Type

- Partial只是加了个 ？
- Required 加了个 -? 
- Readonly 加了 readonly
- Pick 充分利用泛型的， 挑一些属性出来
- Record
- Exclude Exclude from T those types that are assignable to U
- Extract Extract from T those types that are assignable to U
- Exclude Exclude null and undefined from T
- ReturnType Obtain the return type of a function type
- InstanceType Obtain the return type of a constructor function type


```
const myp2:Pick<IPerson , 'age' | 'name'> = {
    age: 23,
    name:"",
}

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```


### 一些例子

构建对象

```
ass User {
    public name?:string
    public age?:number
    constructor(options:Partial<User>) {
            Object.assign(this , options);
        }
}

const user = new User({age:23})
const user = new User({age:23 , name: ""})
const user2 = new User({age:""}) // 报错会
```

其他如返回只读属性等等，都非常便利

### 一些感悟

- 还是要跟紧时代的步伐
- 很多知识都需要融汇贯通
- 新的语言技术会有新的脑洞
- ts是一门好语言,动静结合
