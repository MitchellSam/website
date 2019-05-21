const db = require('../db')

module.exports = [{
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
    method: 'POST',
    path: '/api/users',
    handler: async function (request, h) {        
        try {
            let payload = request.payload
            payload = {
                username: payload.username, 
                password: payload.password, 
                firstname: payload.firstname,
                lastname: payload.lastname
            }
            const data = await db.query(`INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)`, [payload.username, payload.password, payload.firstname, payload.lastname])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    method: 'PUT',
    path: '/api/users/{id}',
    handler: async function (request, h) {
        try {
            let payload = request.payload
            payload = {
                username: payload.username, 
                password: payload.password, 
                firstname: payload.firstname,
                lastname: payload.lastname
            }
            const data = await db.query(`UPDATE users SET (username, password, firstname, lastname) = ($1, $2, $3, $4) WHERE id = $5`, [payload.username, payload.password, payload.firstname, payload.lastname, request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
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