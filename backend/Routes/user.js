const express =require('express')
const router =express.Router();

const {registerUser,verify}=require('../Controller/user')

router.post('/register',registerUser);
router.get('/verify',verify)

module.exports=router