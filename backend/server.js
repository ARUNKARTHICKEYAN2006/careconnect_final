const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable serving uploads directory statically
app.use('/uploads', express.static('uploads'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allows all origins for local dev
    methods: ['GET', 'POST']
  }
});

// Connect to Local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/careconnect')
  .then(() => console.log('MongoDB local connected via Mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Socket.io handler for real-time chat between doctor and patient
io.on('connection', (socket) => {
  console.log('User connected to WebSockets:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on('send_message', (data) => {
    console.log('Message arrived', data);
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'CareConnect Backend is Running' }));

// Route placeholders (to be created next)
app.use('/api/patient', require('./routes/patient'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/appointment', require('./routes/appointment'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/upload', require('./routes/upload'));

const PORT = 5000;
server.listen(PORT, () => console.log(`Backend Server running smoothly on port ${PORT}`));
