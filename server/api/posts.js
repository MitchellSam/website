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
}];