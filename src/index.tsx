import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import './styles/index.scss'

import { ApolloClient } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const client = new ApolloClient({ uri, cache })

var mountNode = document.getElementById('app')
ReactDOM.render(
  <ApolloProvider client={client}>
    <App joke="What's brown and sticky? ... A stick" />
  </ApolloProvider>,
  mountNode
)
