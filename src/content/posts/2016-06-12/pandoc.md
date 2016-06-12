## Pandoc安装使用

号称a universal document converter , 感觉也挺厉害的，各种转换。

### mac下安装

```
brew install pandoc
brew install Caskroom/cask/mactex # 生成pdf的时候需要
# 否则报错 pandoc: pdflatex not found. pdflatex is needed for pdf output.
# 看来生成pdf是借助了latex
```

### 使用
```
pandoc -h # 显示帮助
pandoc t1.md -f markdown -t html -s -o t1.html
pandoc t1.md -f markdown -t latex -o t1.pdf
```
