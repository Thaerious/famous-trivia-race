import config from "./config.js";
import Express from "express";
import http from "http";
import https from "https";
import helmet from "helmet";
import Logger from '@thaerious/logger';
import cors from "./cors.js";
import FS from "fs";
const logger = Logger.getLogger();

class Server {
    constructor () {
        this.app = Express();
        this.httpServer = http.createServer(this.app);

        if (FS.existsSync(config.SSL_KEY) && FS.existsSync(config.SSL_CERT)){
            this.httpsServer = https.createServer({
                key : FS.readFileSync(config.SSL_KEY),
                cert : FS.readFileSync(config.SSL_CERT)                
            }, this.app);    
        }

        this.app.use(helmet()); // automatic security settings (outgoing response headers)
        this.setupPageRenderingEndpoints();
        this.setup404();

        process.on(`SIGINT`, () => this.stop());
        process.on(`SIGTERM`, () => this.stop());
    }

    start (port, ip = `0.0.0.0`) {
        const sslPort = port + 443;

        /** Start the index **/
        this.httpServer.listen(port, ip, () => {
            console.log(`HTTP listener started on port ${port}`);
        });

        /** Start the index **/
        if (this.httpsServer){
            this.httpsServer.listen(sslPort, ip, () => {
                console.log(`HTTPS listener started on port ${sslPort}`);
            });        
        }else{
            console.log(`HTTPS server not started`);
        }
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

new Server().start(7000);
