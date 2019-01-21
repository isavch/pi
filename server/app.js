const express = require('express');
const path = require('path');
const ws = require('./ws');

const PORT = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN || 'pass@123';
const INDEX = path.join(__dirname, '../dist/index.html');

const server = express()
  .use(express.static(path.resolve(__dirname, '../dist')))
  .get('/api/login', (req, res) => {
    const secret = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
    const status = secret === SECRET_TOKEN ? 200 : 401;

    return res.sendStatus(status);
  })
  .get('/*', (req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

ws(server);
