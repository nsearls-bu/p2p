<template>
  <div v-if="this.activeUser">
    <button class="select-user" @click="handleMessage">Connect to user</button>
    <input
      v-model="userToMessage"
      list="active_users"
      placeholder="Choose an active user"
      id="active_user"
      name="list-of-active-users"
    />

    <datalist id="active_users">
      <option v-for="option in this.active_users" :key="option" :value="option.username">
        {{ option.username }}
      </option>
    </datalist>
  </div>
</template>

<script>
import { useMutation, useQuery, useSubscription } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { ref, watch } from 'vue'

export default {
  setup(props) {
    const active_users = ref([])
    const { result, onResult } = useSubscription(gql`
      subscription {
        newListActiveUsers {
          username
          expiresIn
        }
      }
    `)
    onResult((res) => {
      const newData = res.data.newListActiveUsers
      if (newData.length > 0 && props.activeUser !== null) {
        const newDataWithoutActiveUser = newData.filter(
          (activeUser) => activeUser.username !== props.activeUser.username
        )

        active_users.value = newDataWithoutActiveUser
      }
    })
    return { active_users }
  },
  props: ['activeUser'],
  data() {
    return {
      userToMessage: null
    }
  },
  methods: {
    handleMessage() {
      this.$emit('setUpConversation', this.activeUser, this.userToMessage)
    }
  }
}
</script>
<style scoped>
input {
  float: right;
}
.select-user {
  float: right;
}
</style>
