const db = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = [{
    // Load all users
    method: 'GET',
    path: '/api/users',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM users')
            return data.rows
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
            return data.rows
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
            return data.rows
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Register a new user
    method: 'POST',
    path: '/api/users',
    config: {
        auth: {
            mode: 'try'
        }
    },
    handler: async function (request, h) {
        try {
            const { username, password, firstname, lastname } = request.payload
            const hashedPass = await bcrypt.hash(password, saltRounds)
            const data = await db.query(`INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`, [username, hashedPass, firstname, lastname])
            return data.rows
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
            const hashedPass = await bcrypt.hash(password, saltRounds)
            const data = await db.query(`UPDATE users SET (username, password, firstname, lastname) = ($1, $2, $3, $4) WHERE id = $5 RETURNING *`, [username, hashedPass, firstname, lastname, request.params.id])
            return data.rows
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
            const data = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [request.params.id])
            // h.unstate('session')
            // auth logout
            return 'User deleted and logged out.'
        } catch (error) {
            console.error(error)
        }
    }
}];