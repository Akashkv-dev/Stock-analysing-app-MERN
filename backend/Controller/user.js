const { verify } = require("jsonwebtoken");
const userH = require("../Helpers/userH");
require('dotenv').config();
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
          console.log(datas);
          const token = generateToken(email);
          const link = `http://localhost:3000/verify?token=${token}`;

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
  if(update==true){

      res.status(200).send("verfication successful");
  }
  else{
    console.log('verify updating error');
  }
  }
};
