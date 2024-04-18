const db = require('../../data/dbConfig')


async function insert(record) {
    const id = await db('records').insert(record)
    return id
}

async function getAll() {
    return await db('records')
}


module.exports = {
    insert,
    getAll
}