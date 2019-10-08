const chai      = require('chai');
const expect    = require('chai').expect;
const app       = require('../app');
const config    = require('../config/config.json');

describe('API (router.js)', () => {

    const url = `http://localhost:${config.server.port}`

    describe('/', () => {
    
        it('route \: \'/\' should return HTTP status 200', (done) => {
        chai.request(url)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })

        it('route \: \'/\' should return JSON containing API version details', (done) => {
        chai.request(url)
            .get('/')
            .end((err, res) => {
                expect(res.body).to.eql({ "api": { "version": 1 } })
                done()
            });
        });
    })

    describe('/api', () => {
        
        it('proving no API version number - \'/api\' should redirect to the current api version and return JSON containing API version details', (done) => {
            chai.request(url)
                .get('/api')
                .end((err, res) => {
                    expect(res.body).to.deep.equal({ "api": { "version": 1 } })
                    done()
                });
        });
    })

    describe('/api/v_INVALID_VERSION_NUMBER', () => {

        it('providing an invalid api version number - \'/api/v_INVALID_VERSION_NUMBER\' should redirect to the current api version and return JSON containing API version details', (done) => {
        chai.request(url)
            .get('/api')
            .end((err, res) => {
                expect(res.body).to.deep.equal({ "api": { "version": 1 } })
                done()
            });
        });
    })
})
