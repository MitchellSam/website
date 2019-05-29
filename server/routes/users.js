const db = require('../db')

module.exports = [{
    // Load all users
    method: 'GET',
    path: '/api/users',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM users')
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Load a user
    method: 'GET',
    path: '/api/users/{id}',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM users WHERE id = $1', [request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Load a user's posts
    method: 'GET',
    path: '/api/users/{id}/posts',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM posts INNER JOIN users ON users.id = posts."userId" WHERE posts."userId" = $1', [request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Register a new user
    method: 'POST',
    path: '/api/users',
    handler: async function (request, h) {
        try {
            const { username, password, firstname, lastname } = request.payload
            const data = await db.query(`INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)`, [username, password, firstname, lastname])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Edit a user's data
    method: 'PUT',
    path: '/api/users/{id}',
    handler: async function (request, h) {
        try {
            const { username, password, firstname, lastname } = request.payload
            const data = await db.query(`UPDATE users SET (username, password, firstname, lastname) = ($1, $2, $3, $4) WHERE id = $5`, [username, password, firstname, lastname, request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Delete a user
    method: 'DELETE',
    path: '/api/users/{id}',
    handler: async function (request, h) {
        try {
            const data = await db.query('DELETE FROM users WHERE id = $1', [request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}];