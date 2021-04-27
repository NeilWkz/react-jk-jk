# React-jk-jk

A dumb joke book app, with TDD. Built on Snowpack with help from my [React Snowpack QuickStart](https://github.com/NeilWkz/React-Snowpack-Quick-Start). If you want to follow along, feel free to use `Create React App`


>Before we start you should be aware that is a tutorial to demonstrate TDD methodology in a React application, not to teach you how to build a joke fetching app. The technology choices used in this article are unsuitable for a small content marketing app. It would be a performance blunder to load the React framework unless already required for a critical path elsewhere within the platform. A more appropriate choice for a content marketing app would be vanilla js, alpine-js or Svelte. Please also be aware `apollo-client` is also a chunky dependancy, and again if you're working on a platform that can be warranted, but if you want a lightweight graphQL client consider `graphql-request`

## Start your Tooling

Open the vscode terminal and split-screen it, in one start snow pack by running

```
 npm start
```

and in the other start jest in `--watch` mode by running

```
npm run jest
```

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

_SIDENOTE:_
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

Now let's get some data

```
npm install @apollo/client graphql
```

This testing data requires a short introduction to the basis of most test Mocking. When we mock api data we are providing our component with data that will not change, so we can be sure that we are testing our component in isolation. Mocking with React Context means that we need to create a test wrapper. Thankfully `apollo-client` comes with it's own `mockedProvider` that makes this easy.

```
import { MockedProvider } from '@apollo/client/testing'

const mocks = []

const renderApp = (joke?: string) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App joke={joke} />
    </MockedProvider>
  )
}
```

The next part we need to generate our mock. I'm going to use the https://icanhazdadjoke.com/api as a data source, and the [insomnia app](https://insomnia.rest/download) to grab my mock.

> I'm using the graphQL endpoint as for demo purposes, to get that to work locally would cause CORS issues. Now CORS issues are *why* we work with Backend Developers, professionally I'd slack a colleague to sort our the CORS policy, here I'm using the [allow CORS chrome extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en) to enable CORS locally.

We can construct a graphql query and hit the endpoint

```
query joke {
  joke {
    id
    joke
    permalink
  }
}
```

The data returned in Insomnia can form the basis of the mock that we pass to `mockedProvider`. we give our query a name of `GET_JOKE_QUERY`.

```
const mocks = [
  {
    request: {
      query: GET_JOKE_QUERY,
    },
    result: {
      data: {
        joke: {
          __typename: 'Joke',
          id: 'sPfqWDlq4Ed',
          joke: '"Hey, dad, did you get a haircut?" "No, I got them all cut."',
          permalink: 'https://icanhazdadjoke.com/j/sPfqWDlq4Ed',
        },
      },
    },
  },
]
```

The first state that we'll test is loading so we'll write the following test:

```
test('When fetching data the user is shown a loading message', () => {
  const { getByText } = renderApp()

  expect(getByText('Loading...')).toBeInTheDocument()
})

```

Now we're going to wire up our data plumbing with graphQL, first in `index.tsx` we set up `apollo-client`

```
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const uri = 'https://icanhazdadjoke.com/graphql'

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  uri,
  cache: new InMemoryCache(),
})

var mountNode = document.getElementById('app')
ReactDOM.render(
  <ApolloProvider client={client}>
    <App joke="What's brown and sticky? ... A stick" />
  </ApolloProvider>,
  mountNode
)
```

Now back in our `App.tsx` we import `useQuery` and add our `GET_JOKE_QUERY` to the head of the file

```
import { useQuery, gql } from '@apollo/client'

export const GET_JOKE_QUERY = gql`
  query joke {
    joke {
      id
      joke
      permalink
    }
  }
`
```

Then in the body of the component we destructure loading from `useQuery` and add an early return with a loading message.

```
export default function App({ joke }: Props) {
  const [isClicked, setIsClicked] = useState(false)

  const { loading } = useQuery(GET_JOKE_QUERY)

  if (loading) return <p>Loading...</p>

  return (
    <div className="container">
      <h1>React Jk-Jk</h1>
      {isClicked && <p>{joke}</p>}
      <button onClick={() => setIsClicked(true)}>Click me</button>
    </div>
  )
}

```

Great :-) now our loading test passes, but now all of our other tests fail, we need to make our other tests asyncronus and introduce async await. We can update our other tests to be

```

test('The document should have an heading', async () => {
  const { getByRole, getByText } = renderApp()

  await waitForElementToBeRemoved(() => getByText(/Loading.../i))

  expect(getByRole('heading')).toBeTruthy()
})

test('The app has a button', async () => {
  const { getByRole, getByText } = renderApp()

  await waitForElementToBeRemoved(() => getByText(/Loading.../i))

  expect(getByRole('button')).toBeTruthy()
})

test('When the user clicks the button then a joke appears', async () => {
  const testJoke = "What's brown and sticky? ... A stick"

  const { getByRole, getByText } = renderApp(testJoke)

  await waitForElementToBeRemoved(() => getByText(/Loading.../i))

  const button = getByRole('button')

  fireEvent.click(button)

  expect(getByText(testJoke)).toBeInTheDocument()
})
```

That's good that all 4 tests are GREEN, and passing, but that's a 3 repetitions so we need to _refactor_ that into a helper. I'm not necessarily a DRY (don't repeat yourself) programmer - I prefer a WET approach (write eveything twice so save on hasty abstractions). I'm going to do two things, I'm going to import the screen method from Testing Library, and then I'm going to consolidate those awaits into a helper function.

`import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'`

Then the helper

```
const doneLoading = (screen: { getByText: (arg0: RegExp) => any }) =>
  waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
```

So it has the benefit of making our test a _bit_ more readable:

```
test('The document should have an heading', async () => {
  renderApp()

  await doneLoading(screen)

  expect(screen.getByRole('heading')).toBeTruthy()
})

test('The app has a button', async () => {
  renderApp()

  await doneLoading(screen)

  expect(screen.getByRole('button')).toBeTruthy()
})

test('When the user clicks the button then a joke appears', async () => {
  const testJoke = "What's brown and sticky? ... A stick"

  renderApp(testJoke)

  await doneLoading(screen)

  const button = screen.getByRole('button')

  fireEvent.click(button)

  expect(screen.getByText(testJoke)).toBeInTheDocument()
})
```

Now we want to change the behaviour so that the app loads and then fetches data and then shows us a joke so we write:

```
test("When data is fetched a joke is displayed on the screen", async ()=> {
  renderApp()
  await doneLoading(screen)

  expect(screen.getByTestId('joke')).toBeInTheDocument()

})
```

So the fastest way to make that green is to simply add a test-id to our App.tsx

```
return (
        data ? (
            <div className="container">
                <h1>React Jk-Jk</h1>
                <p data-testid="joke">{JSON.stringify(data)}</p>
                {isClicked && <p>{joke}</p>}
                <button onClick={() => setIsClicked(true)}>Click me</button>
            </div>
        ) : null
    )
}
```

We need to refactor to get the behaviour we want. We're going to need to actually display a joke.
So we're going to create a small component to display a joke. 

```
import * as React from 'react'

interface Joke {
  id: string
  joke: string
  permalink: string
}
export default function Joke(jokeData: Joke) {
  return (
    <div>
      <p>{jokeData.joke}</p>
    </div>
  )
}
```

Now we have a failing test we need to refactor our _"When the user clicks the button then a joke appears"_ test. We're going to change this to be _"When the user clicks the button the app fetches a new joke"_. We refactor our spec:

```
test("When the user clicks the button the app fetches a new joke", async () => {
    renderApp()

    await screen.findByTestId("joke")

    const button = screen.getByRole("button")

    fireEvent.click(button)

    await screen.findByTestId("joke")

    expect(mockJokes).toHaveBeenCalledTimes(2)
})
```

You'll notice that instead of awaiting our  `doneLoading` function we are now awaiting a joke appearing on the screen, then clicking our button and then awaiting another joke. Our `expect` statement now introduces another key concept of testing, mocking. So let's write our mock.

To make this test grow green, we need to get some more results from our service and store them in our mock. Now we create an array of only the results

```
const jokes = [
  {
      data: {
          joke: {
              id: "39Etc2orc",
              joke:
                  "Why did the man run around his bed? Because he was trying to catch up on his sleep!",
              permalink: "https://icanhazdadjoke.com/j/39Etc2orc",
              __typename: "Joke",
          },
      },
  },
  {
      data: {
          joke: {
              __typename: "Joke",
              id: "sPfqWDlq4Ed",
              joke:
                  '"Hey, dad, did you get a haircut?" "No, I got them all cut."',
              permalink: "https://icanhazdadjoke.com/j/sPfqWDlq4Ed",
          },
      },
  },
  {
      data: {
          joke: {
              id: "wcxHJBl3gFd",
              joke:
                  "I am terrified of elevators. I\u2019m going to start taking steps to avoid them.",
              permalink: "https://icanhazdadjoke.com/j/wcxHJBl3gFd",
              __typename: "Joke",
          },
      },
  },
]

```

Then we need make the mockedProvider request different jokes:
, 
```
const mocks = [
    {
        request: {
            query: GET_JOKE_QUERY,
        },
        result: () => mocks[0],
        newData: () => mocks[1],
    },
]
```
We could test the `screen.findByTestId("joke").content` and then click the button and test that the content had changed, but we're trying to test that the button has called the apollo client's `refetch` method. We go a step further and create a jest function to return the data.

```
const mockJokes = jest
    .fn()
    .mockReturnValue(jokes[0])
    .mockReturnValueOnce(jokes[1])
    .mockReturnValueOnce(jokes[2])

const mocks = [
    {
        request: {
            query: GET_JOKE_QUERY,
        },
        result: () => mockJokes(),
        newData: () => mockJokes(),
    },
]

beforeEach(() => mockJokes.mockClear())
```

The `jest.fn()` method is so important to the process of testing. It's likely that if we're struggling to test something, we need to take a step back and refocus on the way in which we're mocking external dependencies. We're using the `mockReturnValue` to set default data, then we're making the function return a different `data` object from our array of mocks each time the function is called with `mockReturnValueOnce`. Importantly, because our expect is `expect(mockJokes).toHaveBeenCalledTimes(2)` we need to add jest's `beforeEach` hook to reset the mock before each test, otherwise the mock will persist, and for each test in the `App.test.tsx` it would run, meaning that by the time it reached our test it could be called 4 times, and when another developer in the future inserted new test before it would break our test.
So now we've refactored our test all that remains is to update our component to make it green.


In our App.tsx we update `useQuery` to destructure the `refetch` method, and then we update our `onClick` function to call `refetch()`. 


```
export default function App() {
    const { loading, data, refetch } = useQuery(GET_JOKE_QUERY)

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="container">
            <h1>React Jk-Jk</h1>
            {data && <Joke joke={data.joke.joke} id={data.joke.id} />}
            <button onClick={() => refetch()}>Click me</button>
        </div>
    )
}
```


And we're done with the test driven development. We've met the behaviour required. I intend to post another tutorial demonstrating how I would style the joke book app, because TDD may allow you deploy on Fridays and sleep soundly, but nothing is production-ready until it looks _good_ enough for users to want to use it. I'll update this page with a link when I write that tutorial.
If you have been, thanks for following along. I welcome any comments or feedback on this article.
