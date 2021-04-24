import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import './styles/index.scss'

import {ApolloClient, InMemoryCache} from '@apollo/client'
import {ApolloProvider} from '@apollo/client/react'

const uri = 'https://icanhazdadjoke.com/graphql'

const client = new ApolloClient({
	// Link: authLink.concat(httpLink),
	uri,
	cache: new InMemoryCache()
})

const mountNode = document.getElementById('app')
ReactDOM.render(
	<ApolloProvider client={client}>
		<App joke="What's brown and sticky? ... A stick" />
	</ApolloProvider>,
	mountNode
)
