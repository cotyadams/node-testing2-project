const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('records').truncate();
})
afterAll(async () => {
    await db.destroy()
})

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.NODE_ENV).toBe('testing')
    })
})


describe('[GET] /', () => {
    it('should return 200 ok', async () => {
        let res = await request(server).get('/')
        expect(res.status).toBe(200)
            
    })
    it('correct response body', async () => {
        let res = await request(server).get('/')
        expect(res.body).toEqual({message: 'running'})
    })
})
const data = [
    { record: 'avalon' },
    { record: 'hellrap' },
    { record: 'hexada' }
]
describe('[GET] /records', () => {
    it('should return 200 ok', async () => {
        let res = await request(server).get('/records')
        expect(res.status).toBe(200)
            
    })
    it('correct response body', async () => {
        await db('records').insert(data)
        let res = await request(server).get('/records')
        expect(res.body.length).toEqual(3)
    })
})


describe('[POST] /', () => {
    it('should return 200 ok', async () => {
        let res = await request(server)
            .post('/')
        .send({record: 'chemical'})
        expect(res.status).toBe(201)
            
    })
    it('correct response body', async () => {
        let res = await request(server)
            .post('/')
            .send({ record: 'chemical' });
        expect(res.body).toEqual([1])
    })
})