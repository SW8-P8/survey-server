const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000
let counter = 0

// Serve static images from the public folder
app.use(express.static(path.join(__dirname, 'public')))

// Endpoint to get and increment the counter
app.get('/counter', (req, res) => {
  counter++
  res.json({ count: counter })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
