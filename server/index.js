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

app.use(express.json());
app.use(cors({ origin: 'https://chat-bot-hp42.vercel.app/' }));

app.use('/api/auth', authRoute);
app.use('/api/chats', chatRoute);
app.use('/api/users', userRoute);

app.listen(port, () => {
    console.log(`Chatbot server running on http://localhost:${port}`);
});
