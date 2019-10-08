const NodeSDR_Radio = require('../NodeSDR_Radio')

class NodeSDR_RTLSDR_Radio extends NodeSDR_Radio {

  constructor(settings) {
    super(settings)
  }
  
  // to complete
  static rtl_test() {
    const process = spawn('rtl_test')
      
      process.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        
        // pipe data to audio player - SOX?
      })
      
      process.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      })
      
      process.on('close', function (code) {
          console.log('child process exited with code ' + code);
      })
  } 

  // to do
  static rtl_sdr() {
  }

  // to complete
  rtl_fm() {
  
    try {
      const process = spawn('rtl_fm', [`-M ${this.mode()}`, `-f ${this.frequency()}`, `-l ${this.squelchLevel()}`, `-d ${this.deviceIndex()}`])
      
      // this needs to be a socket / stream ?????
      process.stdout.on('data', data => console.log('stdout: ' + data))
      
      process.stderr.on('data', data => console.log('stderr: ' + data))
      
      process.on('close', code => console.log('child process exited with code ' + code))

    } catch(error) {
      return new Error(`Error:  ${error.message}`)
    }
  }

  // to do
  static rtl_adsb() {
  }

  // to do
  static rtl_433() {
  }
}

module.exports = NodeSDR_RTLSDR_Radio