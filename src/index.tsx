import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import './styles/index.scss'

import {ApolloClient, InMemoryCache} from '@apollo/client'
import {ApolloProvider} from '@apollo/client/react'

const uri = 'https://icanhazdadjoke.com/graphql'

const client = new ApolloClient({
	uri,
	cache: new InMemoryCache()
})

const mountNode = document.getElementById('app')
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	mountNode
)
