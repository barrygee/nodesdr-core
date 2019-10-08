const { spawn }              = require('child_process')
const { sanitizeJSONObject } = require('./utils')

class NodeSDR_Radio {

  constructor(settings) {
    this.settings(settings)
  } 

  settings(settings) {

    /*
        TO DO ****validation is required on each of the provided fileds
    */
    const { 
      type          = '',
      state         = 'ready',
      name          = undefined,
      device_number = undefined,
      details       = '',
      frequency     = '',
      mode          = '',
      sample_rate    = '',
      device_index   = '',
      tuner_gain     = '',
      squelch_level  = '',
    } = sanitizeJSONObject(settings)

    if(device_index && name)
    {
      this.type(type.toLowerCase())
      this.state(state.toLowerCase())
      this.name(name)
      this.deviceNumber(device_number)
      this.details(details)
      this.frequency(frequency)
      this.mode(mode.toLowerCase())
      this.sampleRate(sample_rate)
      this.deviceIndex(device_index)
      this.tunerGain(tuner_gain)
      this.squelchLevel(squelch_level)
    } else {
      throw new Error('device_index and name parameters are required.')
    }
  }

  set type(type) {
    this._type = type
  }

  get type() {
    return this._type
  }

  set state(state) {
    this._state = state
  }

  get state() {
    return this._state
  }

  set name(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set deviceNumber(deviceNumber) {
    this._deviceNumber = deviceNumber
  }

  get deviceNumber() {
    return this._deviceNumber
  }

  set details(details) {
    this._details = details
  }

  get details() {
    return this._details
  }

  set frequency(frequencyInKhz) {
    this._frequency = frequencyInKhz
  }

  get frequency() {
    return this._frequency
  }

  set mode(mode) {
    this._mode = mode
  }

  get mode() {
    return this._mode
  }

  set sampleRate(sample_rate) {
    this._sampleRate = sample_rate
  }

  get sampleRate() {
    return this._sampleRate
  }

  set deviceIndex(device_index) {
    this._deviceIndex = device_index
  }

  get deviceIndex() {
    return this._deviceIndex
  }

  set tunerGain(tuner_gain) {
    this._tunerGain = tuner_gain
  }

  get tunerGain() {
    return this._tunerGain
  }

  set squelchLevel(squelch_level) {
    this._squelchLevel = squelch_level
  }

  get squelchLevel() {
    return this._squelchLevel
  }

  get status() {
    return {
      type:          this.type(),
      state:         this.state(),
      name:          this.name(),
      devicenumber:  this.deviceNumber(),
      details:       this.details(),
      frequency:     this.frequency(),
      mode:          this.mode(),
      sampleRate:    this.sampleRate(),
      deviceIndex:   this.deviceIndex(),
      tunerGain:     this.tunerGain(),
      squelchLevel:  this.squelchLevel()
    }
  }

}

module.exports = NodeSDR_Radio