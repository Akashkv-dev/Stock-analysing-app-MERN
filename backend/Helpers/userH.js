const User = require('../Modal/User');
const bycrypt = require('bcrypt');

module.exports = {
    insert: async (data) => {
        try {
            const {name,email,password} = data
            const saltRounds = 10
            const hashedPW = await bycrypt.hash(password,saltRounds);
            console.log(hashedPW);
            const newUser = await User.create({
                name:name,
                email:email,
                password:hashedPW
            })
            console.log('user created', newUser.toJSON());
        } catch (error) {
            throw("error inserting data",error)
        }
    },
    findUser: async (Email) => {
        try {
            const user = await User.findOne({ where: { email: Email } });
            console.log(user);
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            throw error; 
        }
    }
}