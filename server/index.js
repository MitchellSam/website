const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Cookie = require('@hapi/cookie');
// const Bcrypt = require('bcrypt');

const publicPath = Path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080
const routes = require('./routes')
// const db = require('./db')

// const users = [
//     {
//         username: 'john',
//         // password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
//         password: '12345',
//         name: 'John Doe',
//         id: '2133d32a'
//     }
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

    // server.auth.strategy('session', 'cookie', {
    //     cookie: {
    //         name: 'sid-example',
    //         password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
    //         // password: '2hJ&aWNMvvR&uSh9uSHm%2GTU%WxxuYh',
    //         isSecure: false
    //     },
    //     validateFunc: async (request, session) => {
    //         const account = await users.find(
    //             (user) => (user.id === session.id)
    //         );

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
            // if (!req.session.counter) req.session.counter = 0
            // console.log('counter', ++req.session.counter)
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