## wav格式音频压缩

折腾一些tts，正好碰到音频相关的问题。本以为没啥问题，结果一旦深入迷失了。

### 音频压缩

通常用ffmpeg这个工具来实现。

对应的一些参数

* -ar audio freq 采样率 ， 就是一秒钟内采样多少次，有个奈奎斯特定理，想要不失真就要在能接受的最高频率的2倍以上。人类的听力接受范围是 20 - 20kHz ,所以采样率要40kHz才不失真，所以一般都是44kHz 
* -ac audio channel 声道，有几个声道
* -ab 比特率/码率 就是采样的时候，采样的一份数据用多大的容量来记录。如果是16bit, 那么44x16 单位是 Kbps (K bit per second) 一般除8 ， 单位变成 KB/s , 如果不做压缩就直接乘以秒数就是文件的大小 , 当然还要考虑声道

* -f 猜测是format 哈哈

### wav格式大小怎么调整

调整采样率是可以的 ， 去掉声道也没问题，但如何调整码率呢？ wav格式是不能通过ab参数调整码率的。

wav具体的编码 [https://trac.ffmpeg.org/wiki/audio%20types](https://trac.ffmpeg.org/wiki/audio%20types)

通过`ffprobe` 看到当前的音频是一个格式为`pcm_s16le`的文件

* PCM Pulse-code modulation 脉冲编码调制 ，通过采样把模拟信号转换成数字信号
* s s16le中的s是 signed ，区别与unsigned signed， 能够表示负数unsigned 表示 0 -256 ， signed 就表示 -128 - + 128
* 16 bit位，ab中的概念
* le little endian , 区别于 big endian [https://en.wikipedia.org/wiki/Endianness](https://en.wikipedia.org/wiki/Endianness) 存储是小端序
