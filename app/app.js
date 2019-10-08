const express                 = require('express')
const app                     = express()
const router                  = express.Router

const config                  = require('./config/config.json')
const mongoDBConfig           = require('./core/services/NodeSDR_Database_Service')
const apiRouter               = require('./core/router')

// Node SDR API router
app.use('/', apiRouter)

// connect to MongoDB
mongoDBConfig.connect()

app.listen(config.server.port, () => console.log(`Server running on localhost:${config.server.port}`))

module.exports = router