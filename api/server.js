const express = require('express')
const server = express()
const { getAll, insert } = require('./records/records-model')


server.use(express.json())


server.get('/', async (req, res) => {
    res.status(200).json({message: 'running'})
})
server.get('/records', async (req, res) => {
    const records = await getAll() 
    res.status(200).json(records)
})

server.post('/', async (req, res) => {
    const recordID = await insert(req.body)
    res.status(201).json(recordID)
}) 
module.exports = server