const express = require('express');
const server = require('http').createServer();
const app = express();
app.get('/', function(req, res) {
    res.sendFile('index.html', {root:__dirname});
    
});



server.on('request', app);
server.listen(3000, function() {console.log('server started on port 3000');});

process.on('SIGNINT', ()  =>  {
    server.close(()  => {
        shutdownDB();
    })
})

/** Begin WebSockets   */

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({server:server});

wss.on('connection', function connection(ws) { 
    const numClients = wss.clients.size;
    console.log('clients connected', numClients);

    wss.broadcast(`Current Visitors: ${numClients}`);

    if(ws.readyState === ws.OPEN) {
        ws.send("Welcome to my server ");
    }

    db.run(`INSERT INTO visitors (count,time) 
            VALUES(${numClients}, datetime('now'))
    
    `);

    wss.on('close', function close() {
        wss.broadcast(`Current Visitors: ${numClients}`);
        console.log("A client has disconnected");
        
    });


});


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client)  {
        client.send(data);
    });
}

/** end webSockets */
/** begin datababes */

const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.serialize(()         =>   {
    db.run(`  
    CREATE TABLE visitors    ( 
         count    INTEGER,
         time     TEXT
    )

    `)
});

function getCounts()    {
    db.each("SELECT * FROM visitors" ,  (err, row)     =>   {
        console.log(row);
    })
}

function shutdownDB() {
    getCounts();
    console.log("Shutting down db");
    db.close();
}