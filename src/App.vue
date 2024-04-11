<script>
// Importing necessary modules and components
import { v4 as uuid } from 'uuid'
import ChatBox from './components/ChatBox.vue'
import Message from './components/Message.vue'
import ConnectForm from './components/ConnectForm.vue'

export default {
  name: 'App',
  // Registering components used in the template
  components: { ChatBox, Message, ConnectForm },
  // Computed properties
  computed: {
    console: () => console, // Access to console object for debugging
    window: () => window // Access to window object
  },
  // Data initialization
  data: () => ({
    user: undefined, // Current user
    messages: [], // Array to store chat messages
    p: new SimplePeer({
      // Peer connection configuration
      initiator: true,
      trickle: false,
      channelConfig: { negotiated: true, id: 0 },
      channelName: 'cool-channel',
      config: {
        config: { iceServers: [] }
      }
    }),
    connected: false // Flag to indicate if connected to peer
  }),
  mounted() {
    // Generating a unique user ID
    this.user = { name: 'myname', uid: uuid() }
    // Print connection on error
    this.p.on('error', (err) => console.log('error', err))
    // Print signal data
    this.p.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data))
    })
    // Handle successful connection
    this.p.on('connect', () => {
      console.log('CONNECT')
      this.connected = true
    })
    // Handle connection closure
    this.p.on('close', () => {
      console.log('CLOSED')
      this.connected = false
    })
    // Handle recieved messages and data
    this.p.on('data', (data) => {
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
        this.p.send(text)
        this.console.log('Sending to peer: ' + text)
      }
      this.messages = [...this.messages, createChat(text)]
    },
    // Print when connecting
    handleConnect(event, text) {
      this.p.signal(text)
      this.console.log(text)
    },
    // Set user as initiator or reciever
    handleInitiator(initiator) {
      this.p.initiator = initiator
      this.console.log(this.p)
    }
  }
}
</script>

<template>
  <div class="app">
    <ConnectForm @connect="handleConnect" @initiator="handleInitiator" />
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
