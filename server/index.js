require('dotenv').config()
const process = require('process')
const routes = require('@util/routes')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
// app.use(cors())

// morgan.token('body', function (req) {
//   return JSON.stringify(req.body)
// })
// app.use(morgan(':method :url :status :response-time :body'))

app.use(routes)


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected on app termination')
    process.exit(0)
  })
})

module.exports = app
