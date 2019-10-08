const NodeSDR_Service     = require('./NodeSDR_Service')

const { addDependencies } = require('./NodeSDR_Dependency_Service')

const coreModulesJSON     = require('../../config/modules/nodesdr-core-modules.json')
const modulesJSON         = require('../../config/modules/modules.json')
const coreServicesJSON    = require('../../config/services/nodesdr-core-services.json')
const servicesJSON        = require('../../config/services/services.json')

class NodeSDR_Setup_Service extends NodeSDR_Service {

  constructor() {
    super()
  }

  static async setup() {
    console.log('Installing modules and services.')

    await addDependencies('modules', coreModulesJSON, true)
      .then(console.log(`Core modules installed`))
      .catch(error => console.error(error))

    await addDependencies('modules', modulesJSON, false)
      .then(console.log(`Modules installed`))
      .catch(error => console.error(error))

    // await addDependencies('services', coreServicesJSON, true)
    //   .then(console.log(`Core services installed`))
    //   .catch(error => console.error(error))

    // await addDependencies('services', servicesJSON, false)
    //   .then(console.log(`Services installed`))
    //   .catch(error => console.error(error))
  
    console.log('Setup complete.')
  }
}

module.exports = NodeSDR_Setup_Service