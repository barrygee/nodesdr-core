/*
    Create a new TCP connection to the specified host:port
*/
const net = require('net');

function connect(host, port) {
    
    return client = net.connect(port, host, () => console.log(`client connected to ${host}:${port}`))

    // client.on('data', data => data.toString())

    // client.on('end', () => console.log(`client diconnected from ${host}:${port}`))
}

module.exports = {  
    connect : connect
}