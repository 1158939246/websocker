let Websocket = require('websocket').server
let http = require('http')

let httpServer = http.createServer().listen(8080,()=>{
    console.log('http://localhost:8080')
})

let wsServer = new Websocket({
    httpServer,
    autoAcceptConnections: false
})

let conArr=[]

wsServer.on('request', (req) => {
    let connection = req.accept()
    conArr.push(connection)
    connection.on('message', (msg) => {
        console.log(msg)
        conArr.forEach(ele=>ele.send(msg.utf8Data))
    })
})

