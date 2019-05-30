const db = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

const Joi = require('@hapi/joi')

module.exports = [{
    // Load the logged in user
    method: 'GET',
    path: '/auth/me',
    handler: function (request, h) {
        try {
            if (!request.state.session) {
                return 'You are a guest user.'
            } else {
                return request.state.session.userId
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
                return 'Incorrect login.'
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
                return user.rows[0]
            }
        } catch (error) {
            console.error(error)
        }
    }
    // handler: async function (request, h) {
    //     const { username, password } = request.payload
    //     try {
    //         const user = await db.query('SELECT * FROM users WHERE username = $1', [username])
    //         console.log(username, password, user.rows[0].password)
    //         bcrypt.compare(password, user.rows[0].password, async function (err, res) {
    //             if (err) {
    //                 console.log(err.stack);
    //             }
    //             if (res) {
    //                 // Passwords match
    //                 let cookie = request.state.session

    //                 if (!cookie) {
    //                     cookie = {
    //                         userId: user.rows[0].id,
    //                         counter: 0,
    //                     }
    //                 }
    //                 ++cookie.counter

    //                 console.log(cookie)

    //                 h.state('session', cookie)
    //                 // return user.rows[0]
    //                 return user.rows[0]
    //             } else {
    //                 // Passwords don't match
    //                 return 'Incorrect login.'
    //             }
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
}, {
    // Log out the user
    method: 'DELETE',
    path: '/auth/logout',
    handler: async function (request, h) {
        try {
            h.unstate('session')
            return 'Logout Successful!'
        } catch (error) {
            console.error(error)
        }
    }
}];