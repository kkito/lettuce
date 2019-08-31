## mysql 字符校验 collation 

创建mysql表的时候通常很关心 `charset` , 比如设置成了latin1，就不能存中文。改成了utf8，发现还有问题。用户输入emoji表情会有问题，又要换成utf8mb4。各种折腾。

在各种折腾下，再看下collation吧。

### 比较创建两个不同的表的查询

```
CREATE TABLE `words` ( 
        `id` int(11) NOT NULL AUTO_INCREMENT,  
        PRIMARY KEY (`id`), 
        `word` varchar(128) NOT NULL ) ENGINE=InnoDB 
        DEFAULT CHARSET=utf8 
        DEFAULT COLLATE=utf8_general_ci;

" 创建一些数据
insert into words (word) values ('a') , ('A');
insert into words (word) values ('apple') , ('Apple');

```

执行查询的时候问题来了

```
select * from words where word = 'apple';
```

会出现两条数据， 把 `apple` , `Apple` 都查询出来。 肯定有很多的场景是需要这样的结果的，但如果我们只希望查到特定的 `apple` 该怎么办呢？

`collation` 就是要处理这样的问题

```
select * from words where word = 'apple' collate utf8_bin;

“ 注意链接的时候需要是utf8的 mysql -uroot -p123456 -h127.0.0.1 --default-character-set=utf8
```


### 说明下collation的一些内容

collation 相关的官网上有个专题文档 [https://dev.mysql.com/doc/refman/8.0/en/charset-collations.html](https://dev.mysql.com/doc/refman/8.0/en/charset-collations.html)

中间列了一些内容，如 charset和collation的关系，如何查询现有的collation等

```
show collation;
show charset;

show variables like '%char%';
show variables like '%coll%';
```

https://dev.mysql.com/doc/refman/8.0/en/show-collation.html

### 如何实现case sensitive 查询

> 如果整个系统都是需要case sensitive的查询的话，不放可以把默认的collation改了

> 或者创建表的时候可以指定cs的collation，如

```
CREATE TABLE `words` ( 
        `id` int(11) NOT NULL AUTO_INCREMENT,  
        PRIMARY KEY (`id`), `word` varchar(128) NOT NULL 
        ) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_bin;
insert into words (word) values ('Apple') , ('apple');
select * from words where word = 'apple';
```

这样也只会查出一条

> 或者可以单独的指定column 的collation

```
CREATE TABLE `words` ( 
        `id` int(11) NOT NULL AUTO_INCREMENT,  
        PRIMARY KEY (`id`), 
        `word` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL  
        ) ENGINE=InnoDB CHARSET=utf8;
```

都会达到同样的效果

> 如果一个表已经创建好了，也通可以select时指定collation

如之前的 `select * from words where word = 'apple';`

见文档 https://dev.mysql.com/doc/refman/8.0/en/charset-collate.html



### utf8 没有casesentive， 为啥，如何处理

有些字符集如latin1, 明显可以看到有不同的collation ci的case insensitive ， cs的 case sensitive ， 但奇怪的是utf8的并没有，查了一会发现是实现起来特别麻烦就没有实现。但如何实现utf8的cs呢，通常使用 utf8_bin这个collation来。关于_bin的collation，官方文档也有一些说明  https://dev.mysql.com/doc/refman/8.0/en/charset-binary-collations.html
