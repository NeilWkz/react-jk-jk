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
import React from 'react'

interface Props {
  
}

export const App = (props: Props) => {
  return (
    <div>
      
    </div>
  )
}
```


#### reset your css

`npm install --save-dev modern-css-reset` 

props to Andy Bell for this excellent 

##### Create a styles folder and inside create an `index.scss`

```
@import './node_modules/modern-css-reset/dist/reset.css';
```















