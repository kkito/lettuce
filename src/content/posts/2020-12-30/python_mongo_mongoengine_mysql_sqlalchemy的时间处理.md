## python中orm数据库的时间处理

项目中用到了mysql和mongo，对应使用了orm工具sqlalchemy 和 mongoengine

在时间字段的处理上一直很头疼。

### mysql

mysql时间相关的字段本身不带有时区信息,又涉及到查询时希望看到的时间可读性的问题，所以都直接存了本地时间

本地也不存在冬令时夏令时这些概念，所以不不会出啥问题。加上sqlalchemy查询时也没有做啥时区转换于是大家都默认数据库字段就直接存本地时间

问题是查出来的 `datetime` 对象也不会设置上时区信息，这在之后的一些操作都碰到的问题，比如两个时间的比较，时间的序列化等等

### mongo

mongo相对好的一点是默认时间都是带有时区信息的，通过时间对象直接保存就可以了，当然select出来的可读性确实打些折扣

但存utc时间应该是一个更大维度上的最佳实践

但在使用mongoengine上也存在类似问题，默认位置拿到的对象不带有时区信息，这让人很纳闷，本来已经带有时区信息了为啥不加上

### 序列化

时间格式的序列化也是五花八门，一种做法是自定义，个人不推荐，一旦自定义，各种序列化反序列化都是处理，万一有国际化的需求，时区信息等概念，按之前经验基本都会翻车

通常用iso8601 (RFC3339) 格式作为标准协议，各自都有标准库实现序列化反序列化

但如果datetime不带时区信息，这事又比较麻烦，特别一些如`orjson` 库，如果不带时区会生成一个不带时区的如 `2020-12-30T12:00:01` 这样格式，各种标准反序列化时表现各不相同，有当成utc，也有当成本地时区的

### pytz自身的问题

python 还有一个让人头疼的是时区本身非常容易掉进坑了， pytz生成一个 LMT的时区 https://www.timeanddate.com/time/local-mean-time.html

言之凿凿这是标准blahblah，但发现一堆人掉坑，非常无语

当然 使用的时候一定要试用 `localize` 就可解决

### 方案

整个系统使用时间都是带有timezone的datetime， 最好都使用系统默认时区

产生时间的几个场景

1. 代码里会生成时间，此时使用封装的now方法，返回带有本地时区的时间
2. 客户端的参数, 采用统一的parse方法，返回本地时区的时间， 客户端参数的格式也必须使用 iso8601
3. mongoengine里数据库里查出来的数据，解决方案在 `connect` 方法调用是 传入 `tzinfo`, `tz_aware` 就好了
4. sqlalchemy (mysql) 查出来的数据， 这里花了不少时间, 开始想通过sqlalchemy入手解决，找了半天没有好的方案,后来小伙伴推荐 `pendulum` ，受启发，通过 `pymysql` 里查找

```python

from mongoengine import connect
from pymysql.converters import conversions, FIELD_TYPE, convert_datetime


# mongoengine
def connect_mongo(settings):
    return connect(
        settings['mongo']['database'],
        host=settings['mongo']['host'],
        port=settings['mongo']['port'],
        username=settings['mongo'].get('user', ""),
        password=settings['mongo'].get('password', ""),
        tz_aware=True,
        tzinfo=datetime_util.get_default_timezone(), # set tzinfo
	)

# mysql 
def custom_datetime_convert_with_timezone(obj):
    """ 返回回来的时间格式都带有时区信息,用项目默认时区 """
    return datetime_util.set_default_timezone(
        convert_datetime(obj)
    )

conversions[FIELD_TYPE.DATETIME] = custom_datetime_convert_with_timezone
conversions[FIELD_TYPE.TIMESTAMP] = custom_datetime_convert_with_timezone
    
```

还有sqlalchemy	的Datetime(timezone=True) 的不知道能不能解决，没太仔细研究

