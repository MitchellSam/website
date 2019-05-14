const db = require('../db')

module.exports = [{
    method: 'GET',
    path: '/api/users',
    handler: async function (request, h) {
        const data = await db.query('SELECT * FROM users')
        return h.response(data.rows)
    }
}, {
    method: 'GET',
    path: '/api/users/{id}',
    handler: async function (request, h) {
        const data = await db.query('SELECT * FROM users WHERE id = $1', [request.params.id])
        return h.response(data.rows)
    }
}, {
    method: 'GET',
    path: '/api/users/{id}/posts',
    handler: async function (request, h) {
        const data = await db.query('SELECT * FROM posts INNER JOIN users ON users.id = posts."userId" WHERE posts."userId" = $1', [request.params.id])
        return h.response(data.rows)
    }
}];