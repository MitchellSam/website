const db = require('../db')
const Joi = require('@hapi/joi')

module.exports = [{
    // Load the logged in user
    method: 'GET',
    path: '/auth/me',
    handler: async function (request, h) {
        try {
            if (!request.state.session) {
                return h.response('You are a guest user.')//.code(401)
            } else {
                return h.response(request.state.session.userId)
            }
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Log in the user
    method: 'POST',
    path: '/auth/login',
    handler: async function (request, h) {
        try {
            const { username, password } = request.payload
            const user = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])

            if (!user.rows[0]) {
                return h.response('Incorrect login.').code(401)
            } else {
                let cookie = request.state.session

                if (!cookie) {
                    cookie = {
                        userId: user.rows[0].id,
                        counter: 0,
                    }
                }
                ++cookie.counter

                h.state('session', cookie)
                return h.response(user.rows[0])
            }
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Log out the user
    method: 'DELETE',
    path: '/auth/logout',
    handler: async function (request, h) {
        try {
            h.unstate('session')
            return h.response('Logout Successful!')
        } catch (error) {
            console.error(error)
        }
    }
}];