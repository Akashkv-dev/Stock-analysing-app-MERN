const express =require('express')
const router =express.Router();

const {registerUser,verify,loginUser}=require('../Controller/user')

router.post('/register',registerUser);
router.get('/verify',verify)
router.post('/login',loginUser)

module.exports=router