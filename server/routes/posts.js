const db = require('../db')

module.exports = [{
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
    method: 'POST',
    path: '/api/posts',
    handler: async function (request, h) {        
        try {
            let payload = request.payload
            payload = {
                title: payload.title, 
                content: payload.content, 
                userId: payload.userId
            }
            const data = await db.query(`INSERT INTO posts (title, content, "userId") VALUES ($1, $2, $3)`, [payload.title, payload.content, payload.userId])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
    method: 'PUT',
    path: '/api/posts/{id}',
    handler: async function (request, h) {
        try {
            let payload = request.payload || {
                title: 'title', 
                content: 'content', 
                userId: null
            }
            payload = {
                title: payload.title || 'title', 
                content: payload.content || 'content', 
                userId: payload.userId || null
            }
            const data = await db.query(`UPDATE posts SET (title, content) = ($1, $2) WHERE id = $3`, [payload.title, payload.content, request.params.id])
            return h.response(data.rows)
        } catch (error) {
            console.error(error)
        }
    }
}, {
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