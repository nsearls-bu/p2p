<script>
// Importing necessary modules and components
import { v4 as uuid } from 'uuid'
import ChatBox from './components/ChatBox.vue'
import Message from './components/Message.vue'
import ConnectForm from './components/ConnectForm.vue'
import LogInModal from './components/LogInModal.vue'
import UserSearch from './components/UserSearch.vue'
import { useMutation, useQuery, useSubscription } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { myApolloClient } from './main'
import { provideApolloClient } from '@vue/apollo-composable'
export default {
  name: 'App',
  // Registering components used in the template
  components: { ChatBox, Message, ConnectForm, LogInModal, UserSearch },
  // Computed properties
  computed: {
    console: () => console, // Access to console object for debugging
    window: () => window // Access to window object
  },
  setup() {
    const { mutate: startConnection } = useMutation(gql`
      mutation startConnection(
        $initiatorUsername: String!
        $recipientUsername: String!
        $initiatorSDP: String!
      ) {
        startConnection(
          initiatorUsername: $initiatorUsername
          recipientUsername: $recipientUsername
          initiatorSDP: $initiatorSDP
        ) {
          id
        }
      }
    `)

    const { mutate: respondToHandShake } = useMutation(gql`
      mutation respondToHandShake(
        $initiatorUsername: String!
        $recipientUsername: String!
        $answerSDP: String!
      ) {
        respondToHandShake(
          initiatorUsername: $initiatorUsername
          recipientUsername: $recipientUsername
          answerSDP: $answerSDP
        ) {
          id
        }
      }
    `)
    return { startConnection, respondToHandShake }
  },

  watch: {
    activeUser() {
      const currentUser = Object.assign({}, this.activeUser)
      if (currentUser !== null) {
        const { onResult, loading } = provideApolloClient(myApolloClient)(() =>
          useSubscription(
            gql`
              subscription waitForConnection($username: String!) {
                waitForConnection(username: $username) {
                  id
                  initiatorSDP
                  answerSDP
                  initiatorUsername
                  recipientUsername
                }
              }
            `,
            { username: currentUser.username }
          )
        )
        onResult((res) => {
          if (res.data.waitForConnection.recipientUsername === currentUser.username) {
            if (res.data.waitForConnection.answerSDP === '') {
              // If we are the recipient
              this.connectedPeer = res.data.waitForConnection.initiatorUsername

              this.peer = new SimplePeer({
                // Peer connection configuration
                initiator: false,
                trickle: false,
                channelConfig: { negotiated: true, id: 0 },
                channelName: 'cool-channel',
                config: {
                  config: { iceServers: [] }
                }
              })
              this.peer.signal(res.data.waitForConnection.initiatorSDP)
              setTimeout(() => {
                this.respondToHandShake({
                  initiatorUsername: res.data.waitForConnection.initiatorUsername,
                  recipientUsername: res.data.waitForConnection.recipientUsername,
                  answerSDP: this.answerSDP
                })
              }, 500)
            }
          } else if (res.data.waitForConnection.initiatorUsername === currentUser.username) {
            // If we initiated the connection
            this.connectedPeer = res.data.waitForConnection.recipientUsername

            if (res.data.waitForConnection.answerSDP !== '') {
              this.peer.signal(res.data.waitForConnection.answerSDP)

              // We should be connected
            }
          }
        })
      }
    },
    peer() {
      this.peer.on('error', (err) => console.log('error', err))
      // Print signal data
      this.peer.on('signal', (data) => {
        if (data.type == 'offer') {
          this.initiatorSDP = JSON.stringify(data)
        } else if (data.type == 'answer') {
          this.answerSDP = JSON.stringify(data)
        }
      })
      // Handle successful connection
      this.peer.on('connect', () => {
        console.log('CONNECT')
        this.connected = true
      })
      // Handle connection closure
      this.peer.on('close', () => {
        console.log('CLOSED')
        this.connected = false
      })
      // Handle recieved messages and data
      this.peer.on('data', (data) => {
        this.console.log('Received: ' + data)
        const createChat = (text) => {
          const decoded = new TextDecoder().decode(text)
          return {
            text: decoded,
            uid: '-1',
            author: 'someone else'
          }
        }
        this.console.log(createChat(data))
        this.messages = [...this.messages, createChat(data)]
      })
    }
  },

  // Data initialization
  data: () => ({
    user: undefined, // Current user
    messages: [], // Array to store chat messages
    peer: null,
    initiatorSDP: '',
    answerSDP: '',
    connected: false, // Flag to indicate if connected to peer
    showLoginModal: false,
    activeUser: null,
    connectedPeer: ''
  }),
  mounted() {
    // Generating a unique user ID
    this.user = { name: 'myname', uid: uuid() }
    // Print connection on error
  },
  methods: {
    // On user submit to chat input form
    handleSubmit(event, text) {
      event.preventDefault()
      const createChat = (text) => ({
        text,
        uid: this.user?.uid,
        author: this.user?.name
      })
      // Send message only when connected
      if (this.connected) {
        this.peer.send(text)
        this.console.log('Sending to peer: ' + text)
      }
      this.messages = [...this.messages, createChat(text)]
    },

    handleShowLoginModal() {
      this.showLoginModal = !this.showLoginModal
    },
    handleLoggedIn(data) {
      this.activeUser = Object.assign({}, data.createActiveUser)
    },
    handleSetUpConversation(activeUser, username2) {
      const user1 = Object.assign({}, activeUser)

      this.peer = new SimplePeer({
        // Peer connection configuration
        initiator: true,
        trickle: false,
        channelConfig: { negotiated: true, id: 0 },
        channelName: 'cool-channel',
        config: {
          config: { iceServers: [] }
        }
      })
      setTimeout(
        () =>
          this.startConnection({
            initiatorUsername: user1.username,
            recipientUsername: username2,
            initiatorSDP: this.initiatorSDP
          }),
        500
      )
    }
  }
}
</script>

<template>
  <div class="app">
    <div>
      <LogInModal
        v-if="showLoginModal"
        @handleLoggedIn="handleLoggedIn"
        @close="handleShowLoginModal"
      />
      <UserSearch
        :activeUser="this.activeUser"
        class="user-search"
        @setUpConversation="handleSetUpConversation"
      />

      <div v-if="this.activeUser === null">Not logged in</div>
      <div v-else>Logged in as {{ this.activeUser.username }}</div>
    </div>
    <div>
      <button class="LoginButton" @click="handleShowLoginModal">Login/Signup</button>
    </div>
    <div class="messages">
      <!-- Displaying chat messages -->
      <Message
        v-for="message in messages"
        :key="message.uid"
        :text="message.text"
        :author="message.author"
        :uid="message.uid"
        :isMine="user.uid == message.uid"
      />
    </div>

    <!-- Chat box component for sending messages -->
    <ChatBox class="chat-box" @submit-Chat="handleSubmit" />
  </div>
</template>

<!-- Styles -->
<style>
@font-face {
  font-family: 'Georama';
  src: url('./assets/Georama.ttf');
}

@font-face {
  font-family: 'Georama';
  src: url('./assets/Georama.ttf');
  font-weight: bold;
}

* {
  box-sizing: border-box;
}

html {
  font-family: 'Georama', sans-serif;
}

body {
  margin: 0;
}

button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
/* App layout */
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}

/* Spacing between messages */
.message + .message {
  margin-top: 1rem;
}

/* Right-aligned messages */
.message.right {
  margin-left: auto;
}
</style>
import type LogInModalVue from './components/LogInModal.vue'; import type LogInModalVue from
'./components/LogInModal.vue';import type { watch } from 'vue'import type { myApolloClient } from
'./main'import type { myApolloClient } from './main'import type { myApolloClient } from
'./main'import type { myApolloClient } from './main'import type { myApolloClient } from './main'
