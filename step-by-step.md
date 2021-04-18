#Setup CMD Snowpack


## TLDR: The npm install commands

```
npm init
npm install react react-dom
npm install --save-dev snowpack eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-xo jest @snowpack/plugin-sass
```




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




##### Create a styles folder 

#### reset your css create `styles/config/_reset.scss`
I'm using Andy Bell's [modern-css-reset](https://github.com/andy-piccalilli/modern-css-reset) 

#### create a `styles/index.scss`

```
@import 'config/reset';

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


### Start the Project

`npm start`










