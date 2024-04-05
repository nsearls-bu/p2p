# p2p-chat

P2P chat application built with VueJS, Vite, and WebRTC for browser client to browser client connection. Demo of usage:

![Demo clip](./demo.mov)

WebRTC is a feature of modern browsers that allow browser to browser connection.
This project is still missing a "signaling server" that automatically handles the P2P connetions. In this version, one must do it manually.
In the top right, the user must manually submit the WebRTC handshake using the browser dev tools console to get the offer and answers.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
