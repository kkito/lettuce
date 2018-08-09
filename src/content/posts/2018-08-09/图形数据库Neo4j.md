# 图形数据库 Neo4j

## 安装 on mac

```
brew install neo4j
brew services start neo4j 
```

visit [http://127.0.0.1:7474/browser/](http://127.0.0.1:7474/browser/) # 出错，google了一圈说java8的问题

装了java8 还是不行 `cd /usr/local/Cellar/neo4j/3.3.4/bin`  `./neo4j console ` 可以，先这么玩吧

## 创建语句

```
create(e:Employee{age:25 , name: 'ali'})
```

## 查询语句

```
MATCH (a:Dept) where a.deptno = 10 RETURN a.deptno,a.dname
MATCH (dept:Dept) where dept.deptno = 10 RETURN dept.deptno,dept.dname
MATCH (dept: Dept) RETURN dept.deptno,dept.dname
```

Dept ， Employee 才是文档名，前面那部分是别名，随便取

## id的问题

```
MATCH (n:Employee) RETURN id(n)
MATCH (n:Employee) where id(n) = 40 RETURN n.age
```

有一堆默认的方法 [https://neo4j.com/docs/developer-manual/current/cypher/functions/scalar/#functions-id](https://neo4j.com/docs/developer-manual/current/cypher/functions/scalar/#functions-id)

## 关系 Relation

```
MATCH (e:Customer),(cc:CreditCard) CREATE (e)-[r:DO_SHOPPING_WITH ]->(cc)


MATCH (e:Customer),(cc:CreditCard) where e.name = 'c1' and cc.no = "456" CREATE (e)-[r:FAVOURITE_CARD ]->(cc)

# 建立多个联系，可以重复建立多次，多个关系

MATCH (cust:Customer),(cc:CreditCard) where cust.name = "test"
CREATE (cust)-[r:DO_SHOPPING_WITH{shopdate:"12/12/2014",price:55000}]->(cc)

RETURN r

MATCH (fb1:FaceBookProfile1)-[like:LIKES]->(fb2:FaceBookProfile2)
RETURN like

# 删除关联关系

MATCH (cc: CreditCard)-[rel]-(c:Customer) where id(rel) = 1 delete rel

# set , remove
CREATE (book:Book {id:122,title:"Neo4j Tutorial",pages:340,price:250})

MATCH (book { id:122 }) REMOVE book.price RETURN book
MATCH (book { id:122 }) set book.price = 12 RETURN book
```


##  sort , limit 等

```
MATCH (emp:Employee) RETURN emp.empid,emp.name,emp.salary,emp.deptno order by emp.name desc
MATCH (n:Employee) RETURN n LIMIT 25
```

## 后续和思考

spring guides上有个neo4j的demo，可以尝试下 [https://spring.io/guides](https://spring.io/guides) , [https://spring.io/guides/gs/accessing-data-neo4j/](https://spring.io/guides/gs/accessing-data-neo4j/) [https://spring.io/guides/gs/accessing-neo4j-data-rest/](https://spring.io/guides/gs/accessing-neo4j-data-rest/)

应用场景，通过web形式图形化的展现说实话鸡肋的不行。图的理论也看了，但除了解决类似 [https://baike.baidu.com/item/%E4%B8%83%E6%A1%A5%E9%97%AE%E9%A2%98](https://baike.baidu.com/item/%E4%B8%83%E6%A1%A5%E9%97%AE%E9%A2%98) 之外，业务上那些能用上？

几点觉得有意义的

1. 除了节点数据之外，关系不仅有指向，而且有数据。总体感觉比一对多，多对多这些多了一个维度，但关系型数据库通过中间表也可以解决。
2. 查询效率问题。不用全部数据中找，只需要当前节点扩散出去即可，查询效率会高些。

感觉理解还不够深刻，再走些demo，看些书吧。



