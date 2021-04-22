import * as React from 'react'
import App, { GET_JOKE_QUERY } from '../App'
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

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

const renderApp = (joke?: string) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App joke={joke} />
    </MockedProvider>
  )
}

const doneLoading = (screen: { getByText: (arg0: RegExp) => any }) =>
  waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))

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

test('When fetching data the user is shown a loading message', () => {
  renderApp()

  expect(screen.getByText('Loading...')).toBeInTheDocument()
})
