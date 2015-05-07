## Grape API 流程的理解

* config/routes mount ,mount XXX::Root => "/"
* 上述Root是满足actionpack中 router接口的，有一个call方法可以传递进去env
* lib/grape/api.rb 的call方法实现 , call方法为self的方法，内部会new一个实例 ,Api上绑定了很多endpoint，可以通过self.endpoints获得
* 再通过 rack-mount的流程从一堆endpoint中找到对应的endpoint
* 找到对应的endpoint之后，同样的执行call方法，endpoint的call方法是在实例上的，Root的call方法是在singleton上
* 所以虽然Root和其他一些类都是继承自 Grape::API ，但机制上完全两样，一个Root在流程上调用了self.call , 然后找到附着其上的实例化出来的endpoint中的一个，调用call
* 一堆endpoint中选择的流程应该和routes中的匹配流程一样，在前面的会优先选择
* 除Root之外其他继承自Grape::API的类，只要作用是mount到Root上，生成相关的endpoint，按我理解如果继承不同的基类更清晰一点
* 虽然没有参与到整个请求的过程中，但是mount上的可以通过before ， helpers等，有一定程度的自治能力
* API之间继承应该不是Grape的设计，因为除Root之外，其他都没有进行实例化，即使是Root，参与到请求流程也是通过self.call方法 , endpoint是包装的，压根不想让使用者知道

