const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const publicPath = Path.join(__dirname, '../public');

const server = new Hapi.Server({
    port: 8080,
    routes: {
        files: {
            relativeTo: publicPath,
        },
    },
});

const provision = async () => {
    await server.register(Inert);
    await server.register(Vision);

    server.route({
        method: 'GET',
        path: '/images/{param*}',
        handler: {
            directory: {
                path: Path.join(publicPath, 'images'),
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            file: Path.join(publicPath, '/index.html'),
        },
    });

    try {
        await server.start();
    } catch (err) {
        console.log(err);
    }
    console.log('Server running at:', server.info.uri);
};

provision();