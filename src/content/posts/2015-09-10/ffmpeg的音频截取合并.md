## ffmepg 音频 视频 分离合并等操作

1. 去掉视频中的声音，变成默片 http://superuser.com/questions/268985/remove-audio-from-video-file-with-ffmpeg

```
ffmpeg -i video.mp4 -c copy -an video-no-audio.mp4
```


1. 获得视频中的声音文件 http://stackoverflow.com/questions/9913032/ffmpeg-to-extract-audio-from-video
```
ffmpeg -i video.mp4 -vn -acodec copy audio.aac
```


1. 合并视频和声音文件 http://davidwalsh.name/combine-audio-video 

```
ffmpeg -i video-no-audio.mp4 -i 01.mp3 -c:v copy -c:a copy merge-video-audio.mp4 # 不行啊
ffmpeg -i 01.mp3 01.m4a
ffmpeg -i video-no-audio.mp4 -i 01.m4a -c:v copy -c:a copy merge-video-audio.mp4 # 可以了，后续细看
```

1. 分割视频 http://stackoverflow.com/questions/5651654/ffmpeg-how-to-split-video-efficiently
```
ffmpeg -i video.mp4 -vcodec copy -acodec copy -ss 00:00:00 -t 00:01:00 part1.mp4
```


1. 合并多个视频，合并多个音频 http://superuser.com/questions/587511/concatenate-multiple-wav-files-using-single-command-without-extra-file 效果不咋样
```
ffmpeg -i part1.mp4 -i part2.mp4 -i part3.mp4 -filter_complex '[0:0] [0:1] [1:0] [1:1] [2:0] [2:1] concat=n=3:v=1:a=1 [v] [a]'   -map '[v]' -map '[a]' output.mp4
ffmpeg -i part1.mp4 -i part3.mp4 -filter_complex '[0:0] [0:1] [1:0] [1:1] concat=n=2:v=1:a=1 [v] [a]'   -map '[v]' -map '[a]' output.mp4
```


1. 生成空白slient mp3

```
ffmpeg -ar 48000 -t 60 -f s16le -acodec pcm_s16le -ac 2 -i /dev/zero -acodec libmp3lame -aq 4 output.mp3
```

2. 两个音频重叠合并起来，时间按短的来

```
ffmpeg -i 01.MP3 -i output.mp3 -filter_complex amerge -c:a libmp3lame -q:a 4 concat2.mp3
```

3. 两个音频加起来

```
ffmpeg -i "concat:01.MP3|02.MP3" -i 02.MP3 -acodec copy test.mp3 -map_metadata 0:1
ffmpeg -i "concat:01.MP3|02.MP3"  -acodec copy test2.mp3
```

