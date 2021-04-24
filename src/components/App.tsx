import * as React from "react"
import { useQuery, gql } from "@apollo/client"

const { useState } = React

interface Props {
    joke?: string
}

export const GET_JOKE_QUERY = gql`
    query joke {
        joke {
            id
            joke
            permalink
        }
    }
`

export default function App({ joke }: Props) {
    const [isClicked, setIsClicked] = useState(false)

    const { loading, data } = useQuery(GET_JOKE_QUERY)

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        data ? (
            <div className="container">
                <h1>React Jk-Jk</h1>
                <p>{JSON.stringify(data)}</p>
                {isClicked && <p>{joke}</p>}
                <button onClick={() => setIsClicked(true)}>Click me</button>
            </div>
        ) : null
    )
}
