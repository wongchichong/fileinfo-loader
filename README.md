# webpack-fileinfo-loader

Inject/patch/add source file properties into code using fs.stat.

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
        {
            loader: 'webpack-fileinfo-loader',
            //default option
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

### Build your application

```bash
npm run build
```

### Run unit tests

```bash
npm run test
```

### Run coverage

```bash
npm run coverage
```

### Docker

Or simply run the example using docker:

```bash
docker-compose up
```
