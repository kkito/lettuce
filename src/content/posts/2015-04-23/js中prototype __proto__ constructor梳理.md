```javascript
//prototype和__proto__通常指向同一个对象，prototype是类的属性
// __proto__ 是实例的属性

var Human = function(){
    this.name = "human";
}

var Person = function(){
    this.name = "persion"
}
//Person看做类
Person.prototype = new Human();


// p是Person的实例
var p = new Person();
p.__proto__

//new的具体过程
var p = {}
p.__proto__ = Person.prototype;
Person.call(p);


//constructor 原意指向构造的方法

var h = new Human();
h.constructor === Human;

// 但是prototype继承之后会打乱他
var p = new Person();
p.constructor != Person;
p.constructor === Human; // 猜测这个属性直接通过prototype上找了

// 通过constructor找到实现的方法的路径堵死了
// 可以手动实现指定当前实例的constructor
p.constructor = Person;

p.constructor === Person;
p.prototype.constructor === Human

// 通过instanceof来判断实例
p instanceof Person


// 结论找个OO库吧

```
