const WebSocket = require('ws')

class NodeSDR_WebSocket_Service {

  constructor() {} 

  connect(host, path, port) {

    if(host && path && port) {
      this.connection(new WebSocket(`ws://${ host }/${ path }:${ port }`)) // wss is to ws as https is to http
    }

    throw new Error('host, path and port are required.')
  }

  connection(connection) {
    /*
      - When the connection is successfully established, the open event is fired.
      - Once the connection is open, you can send data to the server.
    */
    connection.on('open', () => connection.send('test data.....'))

    connection.on('message', data => console.log('data', data))

    connection.on('error', error => { throw new Error(`${error}`) })
  }
}                                                                                              

module.exports = NodeSDR_WebSocket_Service

// reference: https://flaviocopes.com/node-websockets/