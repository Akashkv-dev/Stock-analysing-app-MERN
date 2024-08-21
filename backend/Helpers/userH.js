const { where } = require('sequelize');
const bycrypt = require('bcrypt');
const { User, Group, GroupMembers } = require('../Config/association')

module.exports = {
    insert: async (data) => {
        try {
            const {name,email,password} = data
            const saltRounds = 10
            const hashedPW = await bycrypt.hash(password,saltRounds);
            // console.log(hashedPW);
            const newUser = await User.create({
                name:name,
                email:email,
                password:hashedPW
            })
            // console.log('user created', newUser.toJSON());
            return true
        } catch (error) {
            throw("error inserting data",error)
        }
    },
    findUser: async (Email) => {
        try {
            const user = await User.findOne({ where: { email: Email } });
            // console.log(user);
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            throw error; 
        }
    },
    verifyingUser : async (email)=> {
        try {
            const [updated] =await User.update(
                { verified:true},
                {
                    where:{email:email, verified:false}
                }
            )
          
            return true
        
        } catch (error) {
            console.log(error);
        }
    },
    findAdId:async (adminId)=>{
        try {
            const admin =await User.findByPk(adminId)
            return admin;
        } catch (error) {
            console.error(error);
        }
    },
    create:async (gName,adminId)=>{
        try {
            const group = await Group.create({gName,admin:adminId})
            await GroupMembers.create({groupId:group.groupId,userId:adminId})
            return group;
        } catch (error) {
            console.error(error);
        }
    },
    findGroup:async ( id)=>{
        try {
            
            const groupMem = await GroupMembers.findAll({
                where: { userId: id },
                include: [
                  {
                    model: Group,
                    as: 'Group',
                  }
                ]
              });
            return groupMem;
        } catch (error) {
            console.error(error);
        }
    },
    addGrpMember:async (GrpId,userid)=>{
        console.log(GrpId,userid);
        try {
            GroupMembers.create({groupId:GrpId,userId:userid})
            return true
        } catch (error) {
           console.error(error); 
        }
    }

}