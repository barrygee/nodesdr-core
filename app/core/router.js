const express                           = require('express')
const router                            = express.Router()

const { setup } = require('./services/NodeSDR_Setup_Service')
// const NodeSDRCoreAdmin                  = require('../modules/nodesdr-core-admin/module')
// const NodeSDR_Core_SDRController_Router = require('../modules/nodesdr-core-sdr-controller/router')
// const adsbDecoderModuleRouter           = require('../modules/nodesdr-adsb-decoder/router/router')

// default route
router.get('/', (req, res) => {
  res.json({ api: { version: 1 } })
})

// initial application setup
router.get('/setup', (req, res) => setup().then(() => res.redirect('/')))

// install modules and services
// Node SDR Admin API router
// router.use('/admin', new NodeSDRCoreAdmin())

// RTL_SDR
// router.use('/sdr', NodeSDR_Core_SDRController_Router)

// adsb-decoder
// router.use('/adsb-decoder', adsbDecoderModuleRouter)


// catch all undefined routes - redirect back to the default route
router.get('*', (req, res) => res.redirect('/'))

module.exports = router;








// const adminRouter             = require('./adminRouter')

// const modules                 = require('../../../config/modules/modules.json')

// Require NodeSDR core modules
// const NodeSDRCoreAdmin        = require('./modules/nodesdr-core-admin/module')
// const NodeSDRCoreFrontend  = require('../../../modules/nodesdr-core-frontend/module')
// const NodeSDRCoreSDRControls  = require('../../../modules/nodesdr-core-sdr-controls/module')

// Require modules
// const NodeSDRADSBDecoder       = require('../../../modules/nodesdr-adsb-decoder/module')
// const NodeSDRShippingMovements = require('../modules/nodesdr-shipping-movements/module')

  // OLD - TO BE DELETE ONCE NEW METHOD IMPLIMENTED ABOVE
  // const shippingMovementsModuleRouter = require('../../../modules/nodesdr-shipping-movements/router')




// Node SDR Admin API router
// router.use('/admin', adminRouter)

// NodeSDR Core modules
// router.use(new NodeSDRCoreAdmin())
// router.use(new NodeSDRCoreFrontend())
// router.use(new NodeSDRCoreSDRControls())

// Modules
// router.use(new NodeSDRADSBDecoder())
// router.use(new NodeSDRShippingMovements())

    // OLD - TO BE DELETE ONCE NEW METHOD IMPLIMENTED ABOVE 
    // router.use('/shipping-movements', shippingMovementsModuleRouter.routes(utils))
    

