var request = require('request')

describe('get messages', () => {
 it('Should return 200 OK', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
        expect(res.statusCode).toEqual(200)
        done()
    })
})
})

describe('should get messages from tim', () => {
    it('tim', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(JSON.parser(res.body)[0].name).toEqual('tim')
            done()
        })
    })
    })