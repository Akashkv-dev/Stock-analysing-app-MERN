const express =require('express')
const router =express.Router();

const {registerUser,verify,loginUser,creatGroup,getGroupData,addMem}=require('../Controller/user')
const userAuth =require('../Middleware/userAuth')

router.post('/register',registerUser);
router.get('/verify',verify)
router.post('/login',loginUser)
router.post('/addgroup',userAuth,creatGroup)
router.get('/getgroup',userAuth,getGroupData)
router.post('/addMember',userAuth,addMem)


module.exports=router