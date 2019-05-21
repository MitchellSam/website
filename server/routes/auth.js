const db = require('../db')

module.exports = [{
    method: 'GET',
    path: '/auth/me',
    handler: async function (request, h) {
        try {
            const data = await db.query('SELECT * FROM posts')
            return h.response(data.rows)

            /////

            // if (!req.session.userId) {
            //     res.sendStatus(401)
            //   } else {
            //     const user = await User.findById(req.session.userId)
            //     if (!user) {
            //       res.sendStatus(401)
            //     } else {
            //       res.json(user)
            //     }
            //   }

        } catch (error) {
            console.error(error)
        }
    }
}, {
    method: 'PUT',
    path: '/auth/login',
    handler: async function (request, h) {
        try {
            let payload = request.payload
            payload = {
                title: request.payload.title,
                content: request.payload.content
            }
            const data = await db.query(`UPDATE posts SET (title, content) = ($1, $2) WHERE id = $3`, [payload.title, payload.content, request.params.id])
            return h.response(data.rows)

            /////

            // const user = await User.findOne({
            //     where: {
            //       email: req.body.email,
            //       password: req.body.password
            //     }
            //   })
            //   if (!user) {
            //     res.sendStatus(401)
            //   } else {
            //     // attach user id to the session
            //     req.session.userId = user.id
            //     res.json(user)
            //   }

        } catch (error) {
            console.error(error)
        }
    }
}, {
    method: 'DELETE',
    path: '/auth/logout',
    handler: async function (request, h) {
        try {
            const data = await db.query('DELETE FROM posts WHERE id = $1', [request.params.id])
            return h.response(data.rows)

            /////

            // delete req.session.userId;
            // res.sendStatus(204)
  
        } catch (error) {
            console.error(error)
        }
    }
}];