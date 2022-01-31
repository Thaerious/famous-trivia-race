const config = {
    server : {
        // The directories to server files out of
        PUBLIC_STATIC : "public",
        PUBLIC_GENERATED : "output",
        SSL_KEY : "/etc/letsencrypt/live/frar.ca/privkey.pem",
        SSL_CERT : "/etc/letsencrypt/live/frar.ca/fullchain.pem"
    }
};
export default config;