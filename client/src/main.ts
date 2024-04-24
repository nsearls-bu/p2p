import { createApp, provide, h } from 'vue'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
const cache = new InMemoryCache()
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql'
  })
)
const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' })
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const myApolloClient = new ApolloClient({
  link,
  cache
})
createApp({
  setup() {
    provide(DefaultApolloClient, myApolloClient)
  },
  render: () => h(App)
}).mount('#app')
