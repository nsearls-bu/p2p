<script>
import { v4 as uuid } from 'uuid'
import ChatBox from './components/ChatBox.vue'
import Message from './components/Message.vue'
import ConnectForm from './components/ConnectForm.vue'

export default {
  name: 'App',
  components: { ChatBox, Message, ConnectForm },
  computed: {
    console: () => console,
    window: () => window
  },
  data: () => ({
    user: undefined,
    messages: [],
    p: new SimplePeer({
      initiator: true,
      trickle: false,
      channelConfig: { negotiated: true, id: 0 },
      channelName: 'cool-channel',
      config: {
        config: { iceServers: [] }
      }
    }),
    connected: false
  }),
  mounted() {
    this.user = { name: 'myname', uid: uuid() }
    this.p.on('error', (err) => console.log('error', err))

    this.p.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data))
    })

    this.p.on('connect', () => {
      console.log('CONNECT')
      this.connected = true
    })
    this.p.on('close', () => {
      console.log('CLOSED')
      this.connected = false
    })

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
    handleSubmit(event, text) {
      event.preventDefault()
      const createChat = (text) => ({
        text,
        uid: this.user?.uid,
        author: this.user?.name
      })
      if (this.connected) {
        this.p.send(text)
        this.console.log('Sending to peer: ' + text)
      }
      this.messages = [...this.messages, createChat(text)]
    },
    handleConnect(event, text) {
      this.p.signal(text)
      this.console.log(text)
    },
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
      <Message
        v-for="message in messages"
        :key="message.uid"
        :text="message.text"
        :author="message.author"
        :uid="message.uid"
        :isMine="user.uid == message.uid"
      />
    </div>

    <ChatBox class="chat-box" @submit-Chat="handleSubmit" />
  </div>
</template>

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

.message + .message {
  margin-top: 1rem;
}

.message.right {
  margin-left: auto;
}
</style>
