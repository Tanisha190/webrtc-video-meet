const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

let usersPerRoom = new Map() // room -> [ {socketId, username} ]
let roomMessages = new Map() // room -> [{message, username, timestamp}]

function checkAndNotifyUsers(room) {
  const users = usersPerRoom.get(room) || []
  if (users.length === 2) {
    console.log(`Both users connected in room ${room}, notifying...`)
    io.to(users[0].socketId).emit("ready", users[1].socketId)
    io.to(users[1].socketId).emit("ready", users[0].socketId)
  }
}

io.on("connection", socket => {

  console.log("User connected:", socket.id)

  socket.on("join-room", (data) => {
    const { room, username } = data
    socket.join(room)
    console.log(`User ${username} (${socket.id}) joined room ${room}`)

    // Add user to room
    if (!usersPerRoom.has(room)) {
      usersPerRoom.set(room, [])
    }
    usersPerRoom.get(room).push({ socketId: socket.id, username })

    // Send existing messages
    const messages = roomMessages.get(room) || []
    socket.emit("room-messages", messages)

    checkAndNotifyUsers(room)
  })

  socket.on("offer", data => {
    io.to(data.target).emit("offer", {
      sdp: data.sdp,
      sender: socket.id
    })
  })

  socket.on("answer", data => {
    io.to(data.target).emit("answer", {
      sdp: data.sdp
    })
  })

  socket.on("ice-candidate", data => {
    io.to(data.target).emit("ice-candidate", {
      candidate: data.candidate
    })
  })

  socket.on("chat-message", data => {
    const room = data.room
    const messageData = {
      message: data.message,
      username: data.username,
      timestamp: new Date().toLocaleTimeString()
    }

    // Store message
    if (!roomMessages.has(room)) {
      roomMessages.set(room, [])
    }
    roomMessages.get(room).push(messageData)

    // Emit to room
    io.to(room).emit("chat-message", messageData)
  })

  socket.on("leave-room", (data) => {
    const room = data.room
    console.log(`User ${socket.id} leaving room ${room}`)
    
    // Find and remove user from room
    if (usersPerRoom.has(room)) {
      const users = usersPerRoom.get(room)
      const index = users.findIndex(user => user.socketId === socket.id)
      if (index !== -1) {
        users.splice(index, 1)
        if (users.length === 1) {
          // Notify remaining user
          const remainingUser = users[0]
          io.to(remainingUser.socketId).emit("peer-disconnected")
        } else if (users.length === 0) {
          usersPerRoom.delete(room)
        }
      }
    }
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
    
    // Find room and remove user
    for (let [room, users] of usersPerRoom) {
      const index = users.findIndex(user => user.socketId === socket.id)
      if (index !== -1) {
        users.splice(index, 1)
        if (users.length === 1) {
          // Notify remaining user
          const remainingUser = users[0]
          io.to(remainingUser.socketId).emit("peer-disconnected")
        } else if (users.length === 0) {
          usersPerRoom.delete(room)
          // Optionally clear messages if room is empty
          // roomMessages.delete(room)
        }
        break
      }
    }
  })

})

server.listen(8000, () => {
  console.log("Server running on 8000")
})