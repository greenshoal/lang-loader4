加载国际化json到内存中

## Install

```bash
$ npm install --save-dev lang-loader4
```


## Usage

在当前目录放置lang文件夹，其中放置国际化json字符串，例如：lang/cn.json、lang/en.json。

```js
var langLoader = require('lang-loader4');

var local = "cn"; //定义国际化区域

console.log(langLoader(local));

```

## License

[MIT](https://opensource.org/licenses/LGPL-3.0)
