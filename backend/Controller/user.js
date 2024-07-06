const userH = require('../Helpers/userH');

module.exports={
    registerUser:async (req,res)=>{
        console.log(req.body);
        try {
            const {name,email,password} =req.body;
            const pwLength = password.length;
            const datas = req.body;
            const user =await userH.findUser(email)
            if(user){
                res.status(401).json({message:'existing email'})
            }
            else {
                if(pwLength >=6){
                    console.log(datas);
                    await userH.insert(datas)
                    res.status(200).json({ message: "successfully inserted user data" });
                }
                else {
                    res
                      .status(400)
                      .json({ message: "Password should be atleast 6 characters" });
                  }
            }

        } catch (error) {
            throw(error)
        }
    }
}