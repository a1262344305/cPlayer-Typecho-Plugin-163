# cPlayer-with-163-Typecho-Plugin
A typecho plugin for the beautiful html5 music player https://github.com/Copay/cPlayer

[Demo](https://imjad.cn/archives/none/with-cplayer-163-test)

## 介绍
1. 通过简短的代码在文章或页面中插入漂亮的Html5播放器
2. 调用网易云音乐外链，只输入歌曲id即可
2. 与cPlayer保持同步更新

## 安装方法
安装前请确保cache目录可写（保存缓存用，否则会让博客加载缓慢）

Download ZIP, 解压，将其中的 cPlayer 文件夹放入你博客中的 /usr/plugins 目录，在后台启用即可

## 使用方法
在文章编辑页面中，在要插入播放器的部分点击工具栏按钮或输入以下代码：
```
[cp163]skin=white|id=歌曲id|lrc=true[/cp163]
```
其中：
“skin”的值可为white或空，为white时是白色皮肤，为空或其他值时是黑色皮肤
“id”的值为网易云音乐的歌曲id
“lrc”的值可为true或false，分别对应歌词的开或关，为空或其他值时是关

例如：
```
[cp163]skin=white|id=33911781|lrc=true[/cp163]
```

## 效果
![demo](https://dn-imjad.qbox.me/cPlayer163.png)

清空生成的歌词缓存

前往插件设置页面点击红色按钮即可

## LICENSE

制作过程中参考了[zgq354](https://github.com/zgq354)和[Copay](https://github.com/Copay)二位的代码，特此感谢

MIT © [journey.ad](https://github.com/journey-ad/)
