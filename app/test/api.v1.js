const chai      = require('chai')
const expect    = require('chai').expect
const chaiHttp  = require('chai-http')
const app       = require('../app')
const apiJSON   = require('./data/api.json')
const portsJSON = require('../modules/nodesdr-shipping-movements/config/ports.json')
const config    = require('../config/config.json')

chai.use(chaiHttp)

describe('API Version 1 (api.v1.js)', () => {

    describe('/api/v1/', () => {

        it('route \: \'/api/v1/\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                });
        });
    
        it('route \: \'/api/v1/\' should return JSON containing API version details', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/')
                .end((err, res) => {
                    expect(res.body).to.eql(apiJSON)
                    done()
                });
        });
    });

    describe('/api/v1/shipping-movements/ports/', () => {

        it('route \: \'/api/v1/shipping-movements/ports/\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                });
        });

        it('route \: \'/api/v1/shipping-movements/ports/\' should return JSON', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/')
                .end((err, res) => {
                    expect(res.body).to.eql(portsJSON)
                    done()
                });
        });
        
        it('route \: \'/api/v1/shipping-movements/ports/tyne\' should return HTTP status 200', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                });
        });

        it('route \: \'/api/v1/shipping-movements/ports/tyne\' should return a JSON object with \'urls\', \'location\', \'name\', \'frequencies\' keys', (done) => {
            chai.request(`localhost:${config.server.port}`)
                .get('/api/v1/shipping-movements/ports/tyne')
                .end((err, res) => {
                    expect(res.body).to.be.an('object')
                                    .that.has.all.keys('berth', 
                                                       'expected', 
                                                       'history')
                    done()
                });
        });
    });
});