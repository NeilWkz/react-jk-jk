import * as React from "react"
import { useQuery, gql } from "@apollo/client"
import Joke from "./Joke"

export const GET_JOKE_QUERY = gql`
    query joke {
        joke {
            id
            joke
            permalink
        }
    }
`

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
