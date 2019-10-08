const utils = require('../utils')

class NodeSDR_Service {

  constructor(serviceName) { 
    this.serviceName = serviceName
    this.utils = utils
  } 

  serviceName() {
    return this.serviceName
  }
}

module.exports = NodeSDR_Service