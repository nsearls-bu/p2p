<script>
import gql from 'graphql-tag'
import { useMutation, useSubscription } from '@vue/apollo-composable'
export default {
  computed: {
    console: () => console, // Access to console object for debugging
    window: () => window // Access to window object
  },
  setup() {
    const { mutate: createUser } = useMutation(gql`
      mutation {
        createUser(
          CreateUser: {
            username: "$username"
            cell: "$cell"
            password: "$password"
            email: "$email"
            firstName: "$firstName"
            lastName: "$lastName"
          }
        ) {
          id
        }
      }
    `)
    const { mutate: createActiveUser } = useMutation(gql`
      mutation {
        createActiveUser(username: "$username", password: "$password") {
          username
        }
      }
    `)

    return { createUser, createActiveUser }
  },
  data() {
    return {
      username: '',
      password: '',
      cell: '',
      firstname: '',
      lastname: '',
      email: '',
      login_username: '',
      login_password: ''
    }
  },
  methods: {
    signUp() {
      if (
        !(
          this.username === '' ||
          this.password === '' ||
          this.cell === '' ||
          this.firstname === '' ||
          this.lastname === '' ||
          this.email === ''
        )
      ) {
        this.createUser({
          username: this.username,
          cell: this.cell,
          password: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        })
      }
    },
    logIn() {
      if (!(this.login_username === '' || this.login_password === '')) {
        this.createActiveUser({
          username: this.login_username,
          password: this.login_password
        })
      }
    }
  }
}
</script>

<template>
  <transition name="logInModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="header">
            <button class="exit-button" @click="$emit('close')">X</button>
          </div>
          <h3>Login</h3>
          <h4>
            Username
            <input
              class="sign-up-input-form"
              v-model="login_username"
              placeholder="username"
              type="text"
            />
          </h4>
          <h4>
            Password
            <input
              class="sign-up-input-form"
              v-model="login_password"
              placeholder="Password"
              type="text"
            />
          </h4>
          <hr />
          <div class="sign-up">
            <h3>Sign up</h3>
            <h4>
              Username
              <input
                class="sign-up-input-form"
                v-model="username"
                placeholder="username"
                type="text"
              />
            </h4>
            <h4>
              Password
              <input
                class="sign-up-input-form"
                v-model="password"
                placeholder="Password"
                type="text"
              />
            </h4>
            <h4>
              Cell
              <input class="sign-up-input-form" v-model="cell" placeholder="Cell" type="text" />
            </h4>
            <h4>
              First name
              <input
                class="sign-up-input-form"
                v-model="firstname"
                placeholder="First name"
                type="text"
              />
            </h4>
            <h4>
              Last name
              <input
                class="sign-up-input-form"
                v-model="lastname"
                placeholder="Last name"
                type="text"
              />
            </h4>
            <h4>
              Email
              <input class="sign-up-input-form" v-model="email" placeholder="Email" type="text" />
            </h4>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="logIn()">Login</button>
              <button class="modal-default-button" @click="signUp()">Signup</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-footer {
  margin: 30px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.sign-up-input-form {
  width: 100%;
}
.modal-container {
  width: 400px;
  margin: 30px auto;
  margin-top: 10px;
  height: 800px;
  padding: 70px 30px;
  padding-top: 0px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: scroll;
}
.sign-up {
  /* margin: 20px; */
}
.modal-default-button {
  float: right;
  margin: 10px;
  width: 80px;
}
.exit-button {
  float: right;
  margin: 20px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}
.header {
  width: 100%;
  height: 60px;
  margin: 20px;
}
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
, useSubscription
