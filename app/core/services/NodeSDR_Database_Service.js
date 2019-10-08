const mongoose = require('mongoose')
const config   = require('../../config/config')

function connect(database = config.database) {
    
    // connect to MongoDB
    mongoose.connect(config.database.protocol + config.database.host + '/' + config.database.name, config.database.config)

    // once the connection to MongoDB is open
    mongoose.connection.once('open', () => console.log('Connection to MongoDB has been made.'))
                       .on('error', error => console.log('An error occured: ', error))
}

module.exports = {
  connect: connect
}