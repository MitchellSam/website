const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const publicPath = Path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080
const routes = require('./routes')

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

    server.route(routes)

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.file('index.html')
        }
    })

    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: {
            file: function (request) {
                return request.params.filename
            }
        }
    })

    // server.route({
    //     method: 'GET',
    //     path: '/images/{param*}',
    //     handler: {
    //         directory: {
    //             path: Path.join(publicPath, 'images'),
    //         },
    //     },
    // });

    try {
        await server.start();
    } catch (err) {
        console.log(err);
    }
    console.log('Server running at:', server.info.uri);
};

provision();