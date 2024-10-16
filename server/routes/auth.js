const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

console.log()

router.post('/register', [
    body('username').isLength({min: 3}),
    body('password').isLength({min: 8})

], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(success, errors);
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    })
    try{
        const savedUser = await newUser.save();
        success = true;
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(400).json(err)
    }

})

router.post('/login', async (req, res)=>{
    
    let success=false;

    try{
        const user1 = await User.findOne({username: req.body.username});
        if(!user1){
            res.status(404).json("user does not exists");
            return;
        }
        success = true;
        const accesstoken = jwt.sign({id: user1._id}, process.env.jwt_key);
        const {password, ...others} = user1._doc;
        res.status(200).json({...others, accesstoken});
    }
    catch(err){
        res.status(404).json('hrell');
    }
})

module.exports = router;