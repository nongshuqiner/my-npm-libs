# my-npm-libs

## 概述

>构建一个自己的第三方库，以下是教程。也可以前往我的博客：[发布一个 npm 包，构建自己的第三方库](https://www.jianshu.com/p/14e5b3917d19)。

## 申请一个npm 账号 以及创建好相关 github 项目

前往申请 npm 账号： [https://www.npmjs.com/](https://www.npmjs.com/)

此处本人创建的 github 项目名字为[my-npm-libs](https://github.com/nongshuqiner/my-npm-libs)，你需要另外重新起个名字。

## 本地创建 npm 项目

我们需要创建自己npm项目。

``` shell

mkdir my-npm-libs # 创建文件夹，注意此处的名字和你上面创建的GitHub项目名称保持一致
 cd my-npm-libs # 进入文件
 # 此处使用 -y 可以跳过后面让你填写内容操作，所有内容都是用默认值就好，有需要的话回头可以在package.json 文件中进行修改
npm init -y # 默认配置

```

这里我们选择的是默认配置`npm init -y`，如果，你需要进行更详细的配置请使用：

``` shell
npm init
```

使用`npm init`的结果如图：

![npm init result](https://upload-images.jianshu.io/upload_images/4645892-8c4e20c1b8e883aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

查看[npm init文档](https://docs.npmjs.com/cli/init.html)，以查看更多详细内容。


## npm 项目目录

``` shell
mkdir examples lib src test # 创建所需目录
touch .babelrc .gitignore README.md # 创建所需文件
touch examples/index.html src/index.js
```

目录如下：

```
.
├── examples/                         // 目录: 放置案例文件
│   ├── index.html                    // 文件: 案例运行结果
├── lib/                              // 目录: 放置 script 引用的文件
├── src/                              // 目录: 库目录
│   ├── index.js                      // 文件: 库内容
├── test/                             // 目录: 放置单元测试文件
.babelrc
.gitignore
package.json
README.md
```

## 相关配置(请按照顺序进行配置)

### src/index.js 库内容

我们的包需要支持如下三种引用方式：

import引用

``` JavaScript
import ... from '...'
```

require引用

``` JavaScript
const ... = require('...')
```

标签引用

``` html
<script src="..."></script>
```

此处我们使用自己写的，获取某个元素在数组中存在的所有位置的方法：

``` JavaScript
// 获取数据类型
(function (root, globalName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node:
    module.exports = factory();
    // Use module export as simulated ES6 default export:(将模块导出用作模拟ES6默认导出)
    module.exports.default = module.exports;
  } else {
    // Browser:
    window[globalName] = factory();
  }
}(this, 'dataType', function () {
  'use strict';

  return function dataType (data) {
    return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
}));
```

### babel配置

由于，目前绝大部分的浏览器只支持ES5，故此我们需要把ES5以上的语法转换为ES5，我们需要引用babel。不了解babel的请移步[babel 官网](https://babeljs.io/)。

>如果你不需要进行语法转换则跳过此babel配置步骤。

我们需要配置babel，这里由于babel的更新babel的配置基本分为两类：
1.`babel6.X` 以及其以下版本
2.`babel7.X` 以及其以上版本


#### babel6.X以及其以下版本的配置

安装 Babel 命令行工具（`babel-cli`）以及一种 `Babel preset`：

``` shell
npm install --save-dev babel-cli babel-preset-env
```

创建一个 `.babelrc` 文件（或者使用你的 `package.json` 文件)：我们上面已经创建过了的话，此处不必再进行创建。

``` json
{
  "presets": ["env"]
}
```

由于 Babel 只进行语法转换（如箭头函数），你可以使用 `babel-polyfill` 来支持新的全局变量，如 `Promise` 或新的原生方法，如 `String.padStart（left-pad）`。它使用了 `core-js` 和 `regenerator` 。
安装 `babel-polyfill`：

``` shell
npm install --save-dev babel-polyfill
```

运行此命令将所有代码从 `src` 目录编译到 `lib`：

``` shell
./node_modules/.bin/babel src --out-dir lib
```

#### babel7.X以及其以上版本的配置

安装 Babel 命令行工具（`@babel/cli`）、Babel核心以及一种 `@babel preset` :

``` shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

在项目的根目录中创建名为 `babel.config.js` 的配置文件:

``` JavaScript
const presets = [
  ["@babel/env", {
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "67",
      safari: "11.1"
    },
    useBuiltIns: "usage"
  }]
]; // 上面的浏览器列表只是用于展示的示例。你必须根据想要支持的浏览器进行调整。
```

`@babel/polyfill` 模块包括 `core-js` 和自定义 `regenerator runtime` 来模拟完整的 `ES2015+` 环境。
这意味着你可以使用像 `Promise` 或 `WeakMap` 这样的新内置函数，像 `Array.from` 或 `Object.assign` 这样的静态方法，像 `Array.prototype.includes` 这样的实例方法，以及 `generator` 函数（提供给你使用 `regenerator` 插件）。
安装`@babel/polyfill`：

``` shell
npm install --save @babel/polyfill
```

运行此命令将所有代码从 `src` 目录编译到 `lib`：

``` shell
./node_modules/.bin/babel src --out-dir lib
```

###.gitignore的配置

```
.DS_Store
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```

### package.json的配置

``` json
{
  "name": "my-npm-package",
  "version": "1.0.0",
  "description": "发布一个npm包，构建自己的第三方库",
  "author": "nongshuqiner <ym1185509297@163.com>",
  "license": "MIT",
  "main": "src/index.js",
  "files": [
    "examples",
    "lib",
    "src",
    "test"
  ],
  "private": false,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "examples": "open ./examples/index.html",
    "build": "./node_modules/.bin/babel src --out-dir lib"
  },
  "keywords": [
    "my-npm-package"
  ],
  "homepage": "https://github.com/nongshuqiner/my-npm-package.git",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nongshuqiner/my-npm-package.git"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0"
  }
}
```

### examples/index.html的配置

在配置 `examples/index.html` 前需要运行如下命令：

``` shell
./node_modules/.bin/babel src --out-dir lib
# 或者，由于我们在 package.json 中，已经配置了，故此也可以使用下面这个命令构建
npm run build
```

examples/index.html的内容：

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>my-npm-package</title>
  </head>
  <body>
    <div id="examples">
      <div class="">
        var a = [1, 2, 3, 4, 1, 5, 1, 7]，a的数据类型是什么？
      </div>
      <div id="result"></div>
    </div>
    <script src="../lib/index.js"></script>
    <script>
      console.log(window.dataType);
      var a = [1, 2, 3, 4, 1, 5, 1, 7];
      var result = document.getElementById('result');
      result.innerHTML = dataType(a);
    </script>
  </body>
</html>
```

我们可以通过如下命令进行案例测试：

```
npm run examples
```


### README.md的配置

``` md
# XXX(组件名)

## 概述

...

## Install(安装)

npm install --save ...

## Usage(使用)

...

... 其他内容 ...

## Donation

...

## Contact me(联系我)

...

## License

[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2018 - forever Naufal Rabbani
```

### test 单元测试

至于单元测试请自行选择相关库进行测试。

>至此一个基本的简单的npm第三方库构建完成。下面我们进行其他的发布工作。

## git提交

``` shell
git init
git add -A
git commit -m "first commit"
git remote add origin XXX
git push -u origin master
```

## 发布 npm 包

进入项目根目录，登录刚刚申请的npm 账号。登录完成以后执行提交。

``` shell
npm login # 登陆

npm publish # 发布
```

>发布npm包的时候需要注意把npm仓库镜像库，从国内的淘宝源切换到npm国外源，不然无法提交。

这里我做了一个`shell`文件，用以简化你的提交操作，你在根目录下新建一个文件`npm-publish.sh`，内容如下：

``` shell
#!/usr/bin/env bash

echo "\033[0;32m?\033[0m \033[36m请输入你的新发布的版本号(ex:1.0.0)：\033[0m"

read version

v='  "version": "'$version'",'

# 处理 package.json
sed -i -e "4s/^.*$/$v/" 'package.json'
if [ -f "package.json-e" ];then
  rm 'package.json-e'
fi
echo '\033[36m版本号修改成功\033[0m'

npm config get registry # 检查仓库镜像库

npm config set registry=http://registry.npmjs.org # 设置仓库镜像库: 淘宝镜像https://registry.npm.taobao.org

echo '\033[36m请进行登录相关操作：\033[0m'

npm login # 登陆

echo "-------\033[36mpublishing\033[0m-------"

npm publish # 发布

npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像

echo "\033[36m停止\033[0m"
```

然后，可以通过如下命令运行：

``` shell
sh npm-publish.sh
```

执行效果如图：

![sh npm-publish.sh结果](https://upload-images.jianshu.io/upload_images/4645892-308c565bc8d8ba1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Usage(使用)

发布成功后就可以使用了。使用有两种形式，一种是 `npm` 安装，一种是 `<script>` 引用。

### npm 安装：

``` shell
npm install --save my-npm-libs
```

``` JavaScript
import myNpmLibs from 'my-npm-libs'
var a = [1, 2, 3, 4, 1, 5, 1, 7]
console.log(myNpmLibs(a)) // array
// 或者
const myNpmLibs = require('my-npm-libs')
var a = [1, 2, 3, 4, 1, 5, 1, 7]
console.log(myNpmLibs(a)) // array
```

### `<script>`使用

``` HTML
<script src="//unpkg.com/my-npm-libs@1.0.0/lib/index.js"></script>
<script>
  console.log(window.dataType);
  var a = [1, 2, 3, 4, 1, 5, 1, 7];
  console.log(dataType(a));
</script>
```

## run(运行)

``` bash
# git clone ...
git clone https://github.com/nongshuqiner/my-npm-libs.git

# enter
cd my-npm-libs

# install dependencies
npm install

# open examples HTML
npm run examples

# 运行此命令将所有代码从 src 目录编译到 lib
npm run build
```

## Donation(打赏)

![payment-code.png](https://upload-images.jianshu.io/upload_images/4645892-20338f9a0a443ff2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Contact me(联系我)

Just Contact Me At:
- Email: ym1185509297@163.com
- 简书: [言墨儿](https://www.jianshu.com/u/319464da1cc1)

## License

[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2018 - forever Naufal Rabbani
