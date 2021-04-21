import * as React from 'react'
import { useQuery, gql } from '@apollo/client'

const { useState } = React
interface Props {
  joke?: string
}

const GET_JOKE = gql`
  query joke(query: String) {
    joke(query: $query) {
      Joke
    }

  }
`

export default function App({ joke }: Props) {
  const [isClicked, setIsClicked] = useState(false)

  const { loading, error, data } = useQuery(GET_JOKE)

  console.log(data)

  return (
    <div className="container">
      <h1>React Jk-Jk</h1>
      {isClicked && <p>{joke}</p>}
      <button onClick={() => setIsClicked(true)}>Click me</button>
    </div>
  )
}
