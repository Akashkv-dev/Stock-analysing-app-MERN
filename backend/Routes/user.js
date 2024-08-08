const express =require('express')
const router =express.Router();

const {registerUser,verify,loginUser,creatGroup}=require('../Controller/user')
const userAuth =require('../Middleware/userAuth')

router.post('/register',registerUser);
router.get('/verify',verify)
router.post('/login',loginUser)
router.post('/addgroup',userAuth,creatGroup)
module.exports=router