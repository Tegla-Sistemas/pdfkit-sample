"use strict";

const cors = require('cors');
const compression = require('compression');
const express = require( "express" );
const session = require('express-session');
const routes = require( "./routes" );

const app = async config => {
    const { host, port } = config;
    const appExpress = express();  
    // store the config for later use
    global.config = config;

    appExpress.use(express.json());
    appExpress.use(express.urlencoded({extended: true}));
    appExpress.use(cors());
    appExpress.use(compression()); 
    // appExpress.use(helmet());   
    
    const server = appExpress.listen(process.env.PORT || port);
    // // register plugins
    // await plugins.register(appExpress);    
    // register routes
    await routes.register(appExpress);

    return server;

};

module.exports = app;