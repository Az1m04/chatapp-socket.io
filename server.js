const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')
const app = express()

const server = http.createServer(app)
app.use(cors())
const io = socketIO(server)
const users = [{}]
io.on('connection', (socket) => {
  console.log('new connection')
  socket.on('joined', ({ user }) => {
    users[socket.id] = user
    console.log(`${user} has joinned`)
    socket.broadcast.emit('userJoined',{message:`${users[socket.id]} has joined`})
    socket.emit('welcome', { user: users[socket.id], message: 'welcome to the chat' })
  })

  socket.on('message',({message,id})=>{
      io.emit('sendmessage',{user:users[id],message,id})
  })


 socket.on("disconnect",()=>{
     socket.broadcast.emit("leave",{message:`${users[socket.id]} has left` })
     console.log("user left");
 })
 
})
app.get('/', (req, res) => {
  res.send('Working')
})

const port = 5001 || process.env.PORT
const host = 'localhost'

server.listen(port, host, () => {
  console.log(`http://${host}:${port}`)
})
