import * as React from 'react'
import App from '../App'
import { render, fireEvent } from '@testing-library/react'


const renderApp = (joke?: string) => render(<App joke={joke} />)

test('The document should have an heading', () => {
  const { getByRole } = renderApp()

  expect(getByRole('heading')).toBeTruthy()
})

test('The app has a button', () => {

  const { getByRole } = renderApp()

  expect(getByRole('button')).toBeTruthy()
})


test('When the user clicks the button then a joke appears', () => {

  const testJoke = "What's brown and sticky? ... A stick"

  const { getByRole, getByText } = renderApp(testJoke)

  const button = getByRole('button')

  fireEvent.click(button)

  expect(getByText(testJoke)).toBeInTheDocument()

})
