const axios = require('axios');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { verifyAndAuth } = require('./token');
const User = require('../models/user');


let sessions = {};

const getSessionHistory = (sessionId) => {
    if (!sessions[sessionId]) {
        sessions[sessionId] = [];
    }
    return sessions[sessionId];
};

const processResponse = (responseText) => {

    let resultTablePath = null;
    let resultVisualizationPath = null;


    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const urls = responseText.match(urlPattern);

    if (urls) {

        urls.forEach((url) => {
            if (url.includes('table')) {
                resultTablePath = url;
            } else if (url.includes('visualization')) {
                resultVisualizationPath = url;
            }
        });
    }


    const summary = responseText.split('.').slice(0, 1).join(' ') || 'No summary available';
    const resultText = responseText || 'No result text available';

    return {
        summary,
        result_text: resultText,
        ...(resultTablePath !== null && { result_table_path: resultTablePath }), // Can be null if no table URL found
        ...(resultVisualizationPath !== null && { result_visualization_path: resultVisualizationPath }), // Can be null if no visualization URL found
    };
};


router.post('/chat', verifyAndAuth, async (req, res) => {
    let { message, sessionId } = req.body;


    if (!sessionId) {
        sessionId = uuidv4();
    }

    try {

        const conversationHistory = getSessionHistory(sessionId);

        conversationHistory.push(`User: ${message}`);

        const prompt = conversationHistory.join('\n');

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct'
            ,
            {
                inputs: prompt,
                parameters: {
                    max_length: 150, 
                    temperature: 0.6, 
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                },
            }
        );

        let chatbotReply = response.data[0].generated_text;

        if (chatbotReply.startsWith(prompt)) {
            //removed the old chat which the ai sending in response
            chatbotReply = chatbotReply.replace(prompt, '').trim();
            //removed mini word which the ai referring itself with different names initially
            chatbotReply = chatbotReply.replace(/^.*?:\s*/g, "");
            chatbotReply = chatbotReply.replace(/Mini /g, "");
            //removed the unnecessary bot word
            chatbotReply = chatbotReply.replace(/Bot: /g, "");
        }

        //api sending limited response so removing trailling junk
        chatbotReply = chatbotReply.replace(/User.*?\n/g, '');
        let index = chatbotReply.lastIndexOf('.');
        chatbotReply = chatbotReply.substring(0, index+1);
        chatbotReply = chatbotReply.replace(/^[^A-Z]*/, "")
        

        const formattedResponse = processResponse(chatbotReply);

        conversationHistory.push(`Bot: ${chatbotReply}`);

        sessions[sessionId] = conversationHistory;


        res.json({ response: formattedResponse, sessionId });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while fetching chatbot response.' });
    }
});


router.post('/saveChat', verifyAndAuth, async (req, res) => {

    const newUser = {};
    const id1 = req.body.sessionId;

    const user2 = await User.find({ _id: req.user.id });
    let oldChat = user2[0].chats;
    if (oldChat === undefined) oldChat = [];
    oldChat.push({ id: id1, chat: sessions[id1] });
    newUser.chats = oldChat;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $set: newUser
        }, { new: true });
        if (!updatedUser) {
            res.status(400).json("not found");
        }
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(400).json({err});
    }
});

module.exports = router;