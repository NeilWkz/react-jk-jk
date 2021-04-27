import * as React from "react"
import App, { GET_JOKE_QUERY } from "../App"
import {
    render,
    screen,
    fireEvent,
    waitForElementToBeRemoved,
    Screen,
} from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import { jokes } from "../mocks/App.mock"

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

const renderApp = () => {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <App />
        </MockedProvider>
    )
}

const doneLoading = (screen: Screen) =>
    waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))

test("The document should have an heading", async () => {
    renderApp()

    await doneLoading(screen)

    expect(screen.getByRole("heading")).toBeTruthy()
})

test("The app has a button", async () => {
    renderApp()

    await doneLoading(screen)

    expect(screen.getByRole("button")).toBeTruthy()
})

test("When fetching data the user is shown a loading message", () => {
    renderApp()

    expect(screen.getByText("Loading...")).toBeInTheDocument()
})

test("When data is fetched a joke is displayed on the screen", async () => {
    renderApp()
    await doneLoading(screen)

    expect(screen.getByTestId("joke")).toBeInTheDocument()
})

test("When the user clicks the button the app fetches a new joke", async () => {
    renderApp()

    await screen.findByTestId("joke")

    const button = screen.getByRole("button")

    fireEvent.click(button)

    await screen.findByTestId("joke")

    expect(mockJokes).toHaveBeenCalledTimes(2)
})
