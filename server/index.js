const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Cookie = require('@hapi/cookie');
// const Joi = require('@hapi/joi')
// const Bcrypt = require('bcrypt');

const publicPath = Path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080
const routes = require('./routes')
// const db = require('./db')

// const users = [
//     {
//         id: 1,
//         name: 'john',
//         password: 'password',
//     },
// ];

const server = new Hapi.Server({
    port: PORT,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: publicPath,
        }
    }
});

const provision = async () => {
    await server.register(Inert);
    await server.register(Vision);
    await server.register(Cookie);

    server.state('session', {
        ttl: 1000 * 60 * 60 * 24,
        encoding: 'base64json',
        isSecure: false,
    });

    // server.auth.strategy('session', 'cookie', {
    //     cookie: {
    //         name: 'website-cookie',
    //         // password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
    //         password: '2hJ&aWNMvvR&uSh9uSHm%2GTU%WxxuYh',
    //         isSecure: false,
    //     },

    //     validateFunc: async (request, session) => {
    //         const account = users.find((user) => (user.id = session.id));

    //         if (!account) {
    //             return { valid: false };
    //         }

    //         return { valid: true, credentials: account };
    //     }
    // });

    // server.auth.default('session');

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: function (request, h) {
            return h.file('index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/{filename*}',
        handler: {
            directory: {
                path: Path.join(publicPath, 'assets'),
            },
        },
    })

    // server.route({
    //     method: 'GET',
    //     path: '/assets/images/{param*}',
    //     handler: {
    //         directory: {
    //             path: Path.join(publicPath, 'assets/images'),
    //         },
    //     },
    // });

    server.route(routes)

    try {
        await server.start();
    } catch (err) {
        console.log(err);
    }
    console.log('Server running at:', server.info.uri);
};

provision();