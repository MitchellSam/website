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
    handler: async function (request, h) {
        try {
            const { username, password, firstname, lastname } = request.payload
            const data = await db.query(`INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`, [username, password, firstname, lastname])
            return data.rows
        } catch (error) {
            console.error(error)
        }
    }
    // handler: async function (request, h) {
    //     const { username, password, firstname, lastname } = request.payload
    //     let result = await bcrypt.hash(password, saltRounds, async function (err, hash) {
    //         if (err) {
    //             console.log(err.stack);
    //         }
    //         try {
    //             const data = await db.query(`INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`, [username, hash, firstname, lastname])
    //             // return data.rows
    //             console.log(data.rows)
    //             return data.rows
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     })
    //     return result
    // }
    // handler: async function (request, h) {
    //     const { username, password, firstname, lastname } = request.payload
    //     bcrypt.genSalt(saltRounds, function (err1, salt) {
    //         if (err1) {
    //             console.log(err1.stack);
    //         }
    //         bcrypt.hash(password, salt, async function (err2, hash) {
    //             // Store hash in your password DB.
    //             if (err2) {
    //                 console.log(err2.stack);
    //             }
    //             try {
    //                 const data = await db.query(`INSERT INTO users (username, password, firstname, lastname, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username, hash, firstname, lastname, salt])
    //                 return data.rows
    //             } catch (error) {
    //                 console.error(error)
    //             }
    //         });
    //     });
    // }
}, {
    // Edit a user's data
    method: 'PUT',
    path: '/api/users/{id}',
    handler: async function (request, h) {
        try {
            const { username, password, firstname, lastname } = request.payload
            const data = await db.query(`UPDATE users SET (username, password, firstname, lastname) = ($1, $2, $3, $4) WHERE id = $5 RETURNING *`, [username, password, firstname, lastname, request.params.id])
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
            return data.rows
        } catch (error) {
            console.error(error)
        }
    }
}];