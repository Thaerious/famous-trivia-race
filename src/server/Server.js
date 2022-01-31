import config from "./config.js";
import Express from "express";
import http from "http";
import helmet from "helmet";
import Logger from '@thaerious/logger';
import cors from "./cors.js";
const logger = Logger.getLogger();

class Server {
    constructor () {
        this.app = Express();
        this.httpServer = http.createServer(this.app);

        this.app.use(helmet()); // automatic security settings (outgoing response headers)
        this.setupPageRenderingEndpoints();
        this.setup404();

        process.on(`SIGINT`, () => this.stop());
        process.on(`SIGTERM`, () => this.stop());
    }

    start (port, ip = `0.0.0.0`) {
        /** Start the index **/
        this.httpServer.listen(port, ip, () => {
            console.log(`HTTP listener started on port ${port}`);
        });
    }

    stop () {
        console.log(`Stopping server`);
        this.httpServer.close();
        process.exit();
    }

    setupPageRenderingEndpoints () {
        this.app.get(`*`, cors);

        this.app.use(`*`, (req, res, next) => {
            const ip = req.headers[`x-forwarded-for`] || req.socket.remoteAddress;
            logger.channel(`server`).log(ip + ` ` + req.originalUrl);
            next();
        });

        this.app.get(`/`, (req, res) => {
            res.sendFile(`html/index.html`, { root: config.server.PUBLIC_STATIC });
        });

        this.app.use(Express.static(config.server.PUBLIC_STATIC));
        this.app.use(Express.static(config.server.PUBLIC_GENERATED));
    }

    setup404 () {
        this.app.use(`*`, (req, res) => {
            logger.channel(`server`).log(`404 ` + req.originalUrl);
            res.statusMessage = `Page Not Found: 404`;
            res.status(404);
            res.send(`404: page not found`);
            res.end();
        });
    }
}

new Server().start(7000, '127.0.0.1');
