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

Our first test will be to make sure that our app has a heading. It's a basic accessibility requirement

```
test('The document must have an heading', () => {

  const { getByRole} = render(
    <App />,
  );

  expect(getByRole('heading')).toBeTruthy();

  ```

*SIDENOTE:*
  _We want the test to be as simple a statement of what the app is doing as possible. In Behaviour-driven development, we would use our Gherkin Scenario_


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

The test passes! We have Green. ONWARDS to fail once more, for our next test, we know that we need a button.


```
test('When the app loads there is a button', () => {
    const { getByRole} = render(
    <App />,
  );

  expect(getByRole('button')).toBeTruthy()
})
```

Wait, we've repeated the render method for our first test. We _should_ share that between our tests. So our test file becomes:

```
const renderApp = () => render(<App />)

test('The document should have an heading', () => {
  const { getByRole } = renderApp()

  expect(getByRole('heading')).toBeTruthy()
})

test('The app has a button', () => {

  const { getByRole } = renderApp()

  expect(getByRole('button')).toBeTruthy()
})
```

Adding a button makes us green, but we need our next test. Given a button, when the user clicks the button then a joke appears.

```
test('When the user clicks the button then a joke appears', () => {

  const testJoke = "What's brown and sticky? ... A stick"

  const { getByRole, getByText } = renderApp(testJoke)

  const button = getByRole('button')

  fireEvent.click(button)

  expect(getByText(testJoke)).toBeInTheDocument()

})
```

You may think that to make this test pass we'd need to go and fetch data from the server, we'd need to work our how we were going to display it, but that's not true. We're going to make the test pass in the dumbest way possible

In `App.tsx`

```
import * as React from 'react'

const { useState } = React
interface Props {
  joke?: string
}

export default function App({joke}: Props) {

  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className="container">
      <h1>React Jk-Jk</h1>
      {isClicked && <p>{joke}</p>}
      <button onClick={()=> setIsClicked(true)}>Click me</button>
    </div>
  )
}

```

Notice we make the component accept a prop `joke` so it can receive the text, and we use a `useState` to determine if the button has been clicked. That passes, now we must refactor


Now lets get some data

```
npm install @apollo/client graphql
```





