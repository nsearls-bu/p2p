import { v4 as uuid } from 'uuid'
import swarm from 'discovery-swarm'
import getPort from 'get-port'

/**
 * Here we will save our TCP peer connections
 * using the peer id as key: { peer_id: TCP_Connection }
 */
const peers = {}
// Counter for connections, used for identify connections
let connSeq = 0

// Peer Identity, a random hash for identify your peer
const myId = uuid()
console.log('Your identity: ' + myId)

// reference to redline interface
let rl

/*
 * Function to get text input from user and send it to other peers
 * Like a chat :)
 */
const sendMessage = async (message) => {
  // Broadcast to peers
  for (let id in peers) {
    peers[id].conn.write(message)
  }
}
/**
 * Start a server using a swarm
 */

declare type onMessage = (data: string, user_id: string) => void;

const startSwarm = async (onMessage: onMessage) => {
  const sw = swarm()

  // Choose a random unused port for listening TCP peer connections
  const port = await getPort()

  sw.listen(port)
  console.log('Listening to port: ' + port)

  /**
   * The channel we are connecting to.
   * Peers should discover other peers in this channel
   */
  sw.join('our-fun-channel')

  sw.on('connection', (conn, info) => {
    // Connection id
    const seq = connSeq

    const peerId = info.id.toString('hex')
    console.log(`Connected #${seq} to peer: ${peerId}`)

    // Keep alive TCP connection with peer
    if (info.initiator) {
      try {
        conn.setKeepAlive(true, 600)
      } catch (exception) {
        console.log('exception', exception)
      }
    }

    conn.on('data', (data) => {
      // Here we handle incoming messages
      onMessage(data.toString(),  myId)
    })

    conn.on('close', () => {
      // Here we handle peer disconnection
      console.log(`Connection ${seq} closed, peer id: ${peerId}`)
      // If the closing connection is the last connection with the peer, removes the peer
      if (peers[peerId].seq === seq) {
        delete peers[peerId]
      }
    })

    // Save the connection
    if (!peers[peerId]) {
      peers[peerId] = {}
    }
    peers[peerId].conn = conn
    peers[peerId].seq = seq
    connSeq++
  })
}
export {sendMessage, startSwarm}