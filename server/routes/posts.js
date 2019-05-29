const db = require('../db')

module.exports = [{
    // Load all posts
    method: 'GET',
    path: '/api/posts',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM posts')
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Load single post
    method: 'GET',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM posts WHERE id = $1', [request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Create a post
    method: 'POST',
    path: '/api/posts',
    handler: async function (request, h) {
        try {
            const { title, content, userId } = request.payload
            const data = await db.query(`INSERT INTO posts (title, content, "userId") VALUES ($1, $2, $3)`, [title, content, userId])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Edit a post
    method: 'PUT',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        try {
            const { title, content } = request.payload
            const data = await db.query(`UPDATE posts SET (title, content) = ($1, $2) WHERE id = $3`, [title, content, request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Delete a post
    method: 'DELETE',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        try {
            const data = await db.query('DELETE FROM posts WHERE id = $1', [request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}];