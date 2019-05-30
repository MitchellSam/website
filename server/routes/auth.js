const db = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

const Joi = require('@hapi/joi')

module.exports = [{
    // Load the logged in user
    method: 'GET',
    path: '/auth/me',
    config: {
        auth: {
            mode: 'try'
        }
    },
    handler: function (request, h) {
        try {
            if (request.auth.isAuthenticated) {
                return request.auth.credentials
            } else {
                return 'You are a guest user.'
            }
        } catch (error) {
            console.error(error)
        }
    }
}, {
    // Log in the user
    method: 'POST',
    path: '/auth/login',
    config: {
        auth: {
            mode: 'try'
        }
    },
    handler: async function (request, h) {
        try {
            const { username, password } = request.payload
            const user = await db.query('SELECT * FROM users WHERE username = $1', [username])
            
            if (!user.rows[0] || !(await bcrypt.compare(password, user.rows[0].password))) {
                return 'Incorrect login.'

            // if (!user.rows[0]) {
            //     return 'Incorrect login.'
            } else {
                request.cookieAuth.set({ 
                    id: user.rows[0].id
                });

                // add other info to cookie
                let cookie = request.state.session
                if (!cookie) {
                    cookie = {
                        // userId: user.rows[0].id, // redundant with hapi-auth-cookie
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
    config: {
        auth: {
            mode: 'try'
        }
    },
    handler: async function (request, h) {
        try {
            request.cookieAuth.clear()
            h.unstate('session')
            return 'Logout Successful!'
        } catch (error) {
            console.error(error)
        }
    }
}];