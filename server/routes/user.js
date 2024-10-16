
const router = require('express').Router();
const User = require('../models/user');
const { verifyAndAuth } = require('./token')


//get all users
router.get('/', verifyAndAuth, async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;