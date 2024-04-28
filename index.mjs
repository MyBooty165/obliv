import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

const bare = createServer('/bare/');
const serve = new nodeStatic.Server('public/');

const server = http.createServer();

server.on('request', (req, res) => {
    const userAgent = req.headers['user-agent'];

    const isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent);

    if (isMobile) {
        res.writeHead(302, { 'Location': '/static/mobile.html' });
        res.end();
    } else {
        if (bare.shouldRoute(req)) {
            bare.routeRequest(req, res);
        } else {
            serve.serve(req, res);
        }
    }
});

server.on('upgrade', (req, socket, head) => {
    const userAgent = req.headers['user-agent'];

    const isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent);

    if (isMobile) {
        socket.end();
    } else {
        if (bare.shouldRoute(req, socket, head)) {
            bare.routeUpgrade(req, socket, head);
        } else {
            socket.end();
        }
    }
});

server.listen({
    port: process.env.PORT || 8080,
});
