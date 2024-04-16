<script>
export default {
  name: 'MessageBubble',
  props: [
    'text', // Content of the message
    'author', // Author of the message
    'uid', // Background variant of the box
    'isMine'
  ],
  data: (instance) => ({
    // To keep the state of the input content
    right: instance.isMine ? 'right' : 'left'
  })
}
</script>

<template>
  <div :class="['message', { right }, { isMine }]">
    <h5>{{ author }}</h5>
    {{ text }}
  </div>
</template>

<style scoped>
.message {
  background: #e7e7e7;
  border-radius: 10px;
  padding: 1rem;
  width: fit-content;
}

.message.right.isMine {
  background: #e7e7e7;
}
h5 {
  margin: 0 0 0.5rem 0;
}
</style>
