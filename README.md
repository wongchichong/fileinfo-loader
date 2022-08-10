# webpack-fileinfo-loader

Inject/patch/add source file properties into source code using fs.stat.

Webpack fileinfo-loader with:

- Webpack 5
- Typescript
- loader
- fs.stats

### Installation

```bash
yarn add -D webpack-fileinfo-loader
```

in webpack.config.js

```js
{
  module:{
    rules:{
    test: /\.[t]sx?$/,
    use: [
        {
            loader: 'ts-loader',
        },
        //... other loaderss
        {
            loader: 'webpack-fileinfo-loader',
            //default options
            options: {
                public: false,
                fullpath: false, 
                readis: false, //Call fs.stats isXXX() and return
                variable: '__fileinfo__'
            }
        },
    ],
    }
  }
}
```

### Sample outputs

with options 

```js
{ fullpath: false, readis: true, public:true }
```

```js
{
   name: "index.ts",
   path: "../src/index.ts",
   dev: 1688826636,
   mode: 33206,
   nlink: 1,
   uid: 0,
   gid: 0,
   rdev: 0,
   blksize: 4096,
   ino: 20829148281583652,
   size: 686,
   blocks: 1,
   atimeMs: 1660097340815.2515,
   mtimeMs: 1660096593287.9678,
   ctimeMs: 1660096593287.9678,
   birthtimeMs: 1660016087706.8528,
   atime: "2022-08-10T02:09:00.815Z",
   mtime: "2022-08-10T01:56:33.288Z",
   ctime: "2022-08-10T01:56:33.288Z",
   birthtime: "2022-08-09T03:34:47.707Z",
   isBlockDevice: false,
   isCharacterDevice: false,
   isDirectory: false,
   isFIFO: false,
   isFile: true,
   isSocket: false,
   isSymbolicLink: false
}
```
Sample compiled ts

```ts
export const __fileinfo__ = {"name":"Body.ts","path":"../src/Body.ts","dev":1688826636,"mode":33206,"nlink":1,"uid":0,"gid":0,"rdev":0,"blksize":4096,"ino":23362423071979616,"size":177,"blocks":0,"atimeMs":1660097347593.1262,"mtimeMs":1660035310273.6687,"ctimeMs":1660035314608.481,"birthtimeMs":1660016087765.6875,"atime":"2022-08-10T02:09:07.593Z","mtime":"2022-08-09T08:55:10.274Z","ctime":"2022-08-09T08:55:14.608Z","birthtime":"2022-08-09T03:34:47.766Z","isBlockDevice":false,"isCharacterDevice":false,"isDirectory":false,"isFIFO":false,"isFile":true,"isSocket":false,"isSymbolicLink":false};
    
import { prettyPrintJson } from 'pretty-print-json';
export default () => {
    return prettyPrintJson.toHtml(__fileinfo__);
};
```


