const utils = require('../utils')

class NodeSDR_Module {

  constructor(moduleName) { 
    this.moduleName = moduleName
    this.utils = utils
  } 

  moduleName() {
    return this.moduleName
  }
}

module.exports = NodeSDR_Module