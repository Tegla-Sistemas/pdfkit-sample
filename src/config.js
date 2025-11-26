const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const HOST_URL = `http://${ HOST }:${ PORT }`;

module.exports = {
   port: PORT,
   host: HOST,
   url: HOST_URL
}