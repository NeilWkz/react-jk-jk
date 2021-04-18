#Setup CMD Snowpack

### Start a new project

`npm init`

### Then add Snowpack
`npm install --save-dev snowpack`
### Setup React
`npm install react react-dom`
rename xo script so we can use `npm run test` for jest.

At this point we have a dilemma XO does not have a CLI plugin for snowpack, we have two options either we create our own plugin, or simply use the XO eslint config while writing a snowpack-plugin seems pretty straight forward It's my weekend and I've not yet descided to use this toolchain in my day to day job -- I have a toolchain to configure so I can build my app. Onwards!

### Add eslint-config-xo
`npm install --save-dev eslint-config-xo`

### Setup eslint and prettier

`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`

### Install Jest

`npm install --save-dev jest`

### Install SCSS support

`npm install --save-dev @snowpack/plugin-sass`

### Create a src directory 

### Setup Typescript by creating a `tsconfig.json`

```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "strict": true,
        "noImplicitReturns": true,
        "noImplicitAny": true,
        "module": "es6",
        "moduleResolution": "node",
        "target": "es5",
        "allowJs": true,
        "jsx": "react",
    },
    "include": [
        "./src/**/*"
    ]
}
```

### Create a `snowpack.config.json`


```
{
  "mount": {
    "dist": "/",
    "src": "/"
  },
  "plugins": [
    "@snowpack/plugin-sass"
  ]
}
```


### Add build rules to your `.gitignore`

```
.cache/
coverage/
dist/*
!dist/index.html
node_modules/
*.log
```


### Setup a basic structure for your react app

##### Create a components folder and create an App.tsx

```
import React, { ReactElement } from 'react'

interface Props {

}

export default function App({}: Props): ReactElement {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

```


#### reset your css

`npm install --save-dev modern-css-reset` 

props to Andy Bell for this excellent package

##### Create a styles folder and inside create an `index.scss`

```
@import './node_modules/modern-css-reset/dist/reset.css';
```


#### Create an index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Your Project Name</title>
    <meta name="description" content="A description of my app" />
    <meta name="author" content="Neil Ross" />
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

#### Create an `index.tsx`


```
import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './components/App';
import "./styles/index.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
```


### Insert snowpack `scripts` into your `package.json`

```
// <the start of your package.json >
 "scripts": {
    "clean": "rm dist/bundle.js",
    "start": "snowpack dev",
    "build": "snowpack build",
    "test": "jest"
  },
// <the rest of your package.json >
```











