const { nullOrUndefined, findPatternInString, cloneGitRepository } = require('../utils')

function addDependencies(type, moduleServiceDependencyJSON, isCoreModuleOrService) {

    return new Promise(async (resolve, reject) => {
    
      if(nullOrUndefined(moduleServiceDependencyJSON)) {
        reject(new Error('nodesdr-core-dependency-service.addDependency(): moduleServiceDependencyJSON is required')) 
      }

      for (let dependency of moduleServiceDependencyJSON.dependencies) {
        try {
          await cloneGitRepository(type, dependency.gitRepositoryURL, isCoreModuleOrService)
        } catch(error) {
          reject(error)
        }

        // regex to get string between last / and .git
        const gitRepositoryProjectDirectoryName = findPatternInString(/([^/]+)(?=.git)/g, dependency.gitRepositoryURL)

        resolve(gitRepositoryProjectDirectoryName[0])
      }
  }) // close promise
}

module.exports = { addDependencies }