const express = require('express');
const connectToMongo = require('./db');
const authRoute = require('./routes/auth');
const chatRoute = require('./routes/chat');
const userRoute = require('./routes/user');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5000;
connectToMongo();


app.use(cors({
    origin: 'https://chat-bot-66lx.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://chat-bot-66lx.vercel.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/chats', chatRoute);
app.use('/api/users', userRoute);

app.listen(port, () => {
    console.log(`Chatbot server running on http://localhost:${port}`);
});
