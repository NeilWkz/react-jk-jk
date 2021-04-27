import * as React from "react"

interface Props {
    id: string
    joke: string
    permalink?: string
}
export default function Joke({id, joke}: Props) {
    return (
        <div className="joke" data-testid="joke" key={id}>
            <p>{joke}</p>
        </div>
    )
}
