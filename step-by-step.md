# React-jk-jk

A dumb joke book app, with TDD and css animation intro


## Start your Tooling

Open the vscode terminal and split screen it, in one start snow pack by running
```
 npm start
```
and in the other start jest in `--watch` mode by running
```
npm run jest
```

## Setup your style space

Add a `_variable.scss` Declare your constants, in SCSS, we need to start with our device widths.
Add a container class to wrap your app, setup a  basic layout. Add some fonts to your `index.html` and setup some `font-family` rules. We don't want to style it too much just enough so we can stand to look at it during development

### Create your first test

We're going create a `tests` folder and add a new file called `App.test.tsx`. First we'll need to import the basic dependencies we need to test React components

```
import * as React from 'react';
import App from '../App'
import { render} from '@testing-library/react';
```

Our first test will be to make sure that our app has a heading, basic accessibility means that's a given

```
test('The document must have an heading', () => {

  const { getByRole} = render(
    <App />,
  );

  expect(getByRole('heading')).toBeTruthy();

  ```

*SIDENOTE:*
  _We want the test to be as simple a statement of what the app is doing as possible. In Behaviour-driven development we would use our Gherkin Scenario_


The test fails! We have Red. Now the core of TDD is getting it to turn Green. We call this RED-GREEN-REFACTOR.


Now we add an `h1` to our `App.tsx`

```
import * as React from 'react'

interface Props {}

export default function App({}: Props) {
  return (
    <div className="container">
      <h1>React Jk-Jk</h1>
    </div>
  )
}
```



