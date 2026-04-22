const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const port = process.env.PORT || 3000;

// const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, '../pages/main.html'));
});

app.listen(port, () => {
    console.log(`App listening on ${port}`)
});