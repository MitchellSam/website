const db = require('../db')

module.exports = [{
    method: 'GET',
    path: '/api/posts',
    handler: async function (request, h) {
        const data = await db.query('SELECT * FROM posts')
        return h.response(data.rows)
    }
}, {
    method: 'GET',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        const data = await db.query('SELECT * FROM posts WHERE id = $1', [request.params.id])
        return h.response(data.rows)
    }
}, {
    method: 'POST',
    path: '/api/posts',
    handler: async function (request, h) {
        let payload = request.payload
        payload = {
            title: payload.title, 
            content: payload.content, 
            userId: payload.userId || 1
        }
        console.log('request', payload)
        // const data = await db.query(`INSERT INTO posts DEFAULT VALUES;`)
        const data = await db.query(`INSERT INTO posts (title, content, userId) VALUES ($1, $2, $3)`, [payload.title, payload.content, payload.userId])
        console.log('data', data.rows)
        return h.response(data.rows)
    }
}, {
    method: 'PUT',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        const data = await db.query('SELECT * FROM posts WHERE id = $1', [request.params.id])
        return h.response(data.rows)
    }
}, {
    method: 'DELETE',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        const data = await db.query('DELETE FROM posts WHERE id = $1', [request.params.id])
        return h.response(data.rows)
    }
}];