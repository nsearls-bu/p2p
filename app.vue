import {v4 as uuid} from 'uuid';
<script>
import {v4 as uuid} from 'uuid'
export default {
  name: "App",

  computed: {
    console: () => console,
    window: () => window,
  },
  data: () => ({
    user: undefined,
    messages: [],
  }),
  mounted() {
    this.console.log('hello')
    this.user = { name: "myname", uid: uuid() };
  },
  methods: {
    handleSubmit(event, text) {
      this.console.log(text)
      event.preventDefault();
      const createChat = (text) => ({
        text,
        uid: this.user?.uid,
        author: this.user?.name,
      });
      this.messages = [...this.messages, createChat(text)];

    },
  },
};
</script>

<template>
  <div class="app">
    <div class="messages">
      <Message
        v-for="message in messages"
        :key="message.uid"
        :text="message.text"
        :author="message.author"
        :uid="message.uid"
        :isMine="myuid == uid"
      />
    </div>

    <ChatBox class="chat-box" @submit-Chat="handleSubmit" />
  </div>
</template>

<style>
@font-face {
  font-family: "Georama";
  src: url("./assets/Georama.ttf");
}

@font-face {
  font-family: "Georama";
  src: url("./assets/Georama.ttf");
  font-weight: bold;
}

* {
  box-sizing: border-box;
}

html {
  font-family: "Georama", sans-serif;
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
