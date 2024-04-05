<template>
  <div>
    <input v-model="text" placeholder="add SDP from other browser window" type="text" />
    <button @click="submit">Submit</button>
    <button v-if="toggled" :class="['initiator', { toggled }]" @click="onToggle">Initiator</button>
    <button v-else :class="['initiator', { toggled }]" @click="onToggle">Await</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      toggled: true
    }
  },
  methods: {
    submit(event) {
      // This fires an event which we will handle
      // in the parent component
      this.$emit('connect', event, this.text)
    },
    onToggle() {
      this.toggled = !this.toggled
      this.$emit('initiator', this.toggled)
    }
  }
}
</script>

<style scoped>
.initiator {
  background: #260c83;
  padding: 1rem;
  width: fit-content;
}

.initiator.toggled {
  background: #d40505;
}
h5 {
  margin: 0 0 0.5rem 0;
}
</style>
