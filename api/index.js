import express from 'express'
import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
})

client.on('error', (err) => console.log('Redis Client Error', err))
;(async () => {
  await client.connect()
})()

app.get('/', (req, res) => res.send('Express on Vercel'))

app.get('/counter', async (req, res) => {
  try {
    const counter = await client.incr('counter')
    res.json({ count: counter })
  } catch (err) {
    console.error('Error accessing Redis:', err)
    res.json({ count: Math.rount(Math.random() * 4) })
  }
})

module.exports = app
