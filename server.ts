import express from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'
import swarm from 'discovery-swarm'
import getPort from 'get-port'
import sqlite3 from 'sqlite3'
import { startSwarm, sendMessage } from './swarm'
// import cors from 'cors'
const app = express()
// const PORT = await getPort()
var args = process.argv.slice(2)
var PORT = args[0]

// Middleware to parse JSON
app.use(bodyParser.json())

// Initialize SQLite database
const db = new sqlite3.Database(':memory:')

// Create messages table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, message TEXT, user_id TEXT)')
})

const insertMessage = (message, user_id) => {
  db.run('INSERT INTO messages (message,user_id) VALUES (?,?);', [message, user_id])
}

// Endpoint to send a message
app.post('/send-message', (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }
  const { user_id } = req.body
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' })
  }

  sendMessage(message)
  try {
    insertMessage(message, user_id)
    res.status(201).json({ success: true, message: 'Message sent successfully' })
  } catch {
    return res.status(500).json({ error: 'Failed to send message' })
  }
})

// Endpoint to retrieve messages
app.get('/get-messages', (req, res) => {
  console.log(req)
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages' })
    }
    res.status(200).json({ messages: rows })
  })
})

// Start the server

app.listen(PORT, () => {
  startSwarm((data, user_id) => {
    insertMessage(data, user_id)
  })
  console.log(`Server is running on http://localhost:${PORT}`)
})
