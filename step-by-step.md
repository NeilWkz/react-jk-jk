#Setup CMD Snowpack

Then add Snowpack
`npm install --save-dev snowpack`
Setup React
`npm install react react-dom`
rename xo script so we can use `npm run test` for jest.

At this point we have a dilemma XO does not have a CLI plugin for snowpack, we have two options either we create our own plugin, or simply use the XO eslint config while writing a snowpack-plugin seems pretty straight forward. I have a toolchain to configure so I can build my app. Onwards!

Add eslint-config-xo
`npm install --save-dev eslint-config-xo`

Setup eslint and prettier

`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`

Setup Jest

`npm install --save-dev jest`







