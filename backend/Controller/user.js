const { verify } = require("jsonwebtoken");
const userH = require("../Helpers/userH");
require('dotenv').config();
const bycrypt = require('bcrypt');
const { generateToken, getMailOptions, getTransport } = require("../utils/service");

module.exports = {
  registerUser: async (req, res) => {
    console.log(req.body);
    try {
      const { name, email, password } = req.body;
      const pwLength = password.length;
      const datas = req.body;
      const user = await userH.findUser(email);
      if (user) {
        res.status(401).json({ message: "existing email" });
      } else {
        if (pwLength >= 6) {
          // console.log(datas);
          const role='user'
          const token = generateToken(email,role);
          const link = `http://localhost:5173/verify?token=${token}`;

          //Create mailrequest
          let mailRequest = getMailOptions(email, link);

          //Send mail
          return  getTransport().sendMail(mailRequest,async (error) => {
            if (error) {
              res.status(500).json({message:"Can't send email."});
            } else {
             const inserted = await userH.insert(datas);
             if(inserted == true){
               res.status(200).json({ message1: "successfully inserted user data",message2: `Link sent to ${email}` });
             }
             else {
              console.log("data not inserted");
             }
            }
          });
            
        } else {
          res
            .status(400)
            .json({ message: "Password should be atleast 6 characters" });
        }
      }
    } catch (error) {
      throw error;
    }
  },
  verify :async (req,res)=> {
    const {token} = req.query;
    console.log(token);
    if(!token) {
        res.status(401).json("invalid user token");
        return;
    }
    let decodetoken;
    try {
        decodetoken = verify(token,process.env.JWT_SECRET_KEY);
    } catch (error) {
        res.status(401).send('invalid authentication credentials');
        return
    }
    if (
        !decodetoken.hasOwnProperty("email") ||
        !decodetoken.hasOwnProperty("expirationDate")
      ) {
        res.status(401).send("Invalid authentication credentials.");
        return;
      }

      const { expirationDate } = decodetoken;
  if (expirationDate < new Date()) {
    res.status(401).send("Token has expired.");
    return;
  }  
  const email=decodetoken.email
  const update= await userH.verifyingUser(email)
  const user= await userH.findUser(email)
  if(update==true){

      res.status(200).json({massage:"verfication successful",email:user.email,name:user.name,token:token});
  }
  else{
    console.log('verify updating error');
  }
  },
  loginUser:async (req,res)=> {
    console.log(req.body);
    try {
      const {email,password} = req.body;
      const user = await userH.findUser(email);
      if(!user || user.deleted === true){
          res.status(404).json({message:'invalid user'})
      }else if(user.status === 'Deactive'){
        res.status(401).json({message:'Admin Blocked'})
      }else{
        const matched = await bycrypt.compare(password,user.password)
        // console.log(matched);
        if(matched){
          const token = generateToken(email,user.role);
          const name =user.name
          res.status(200).json({message:'user loggedIn',Token:token,role:'user',name:name,email:email})
        }else {
          res.status(400).json({ message: "invalid password" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "login error" });
    }    
  },
  creatGroup:async (req,res) =>{
    const groupName=req.body.groupName
  
    console.log('group',groupName);
    console.log(req.user);
  }  
};
