const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbconnect')
// const Group = require('../Modal/Group')
const GroupMember=require('./GroupMembers')

const User = sequelize.define('User', {
    id:{
        type:DataTypes.BIGINT,
        autoIncrement :true,
        primaryKey:true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role : {
        type:DataTypes.STRING,
        defaultValue:'user'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue:'Active'
    },
    deleted: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    verified : {
        type : DataTypes.BOOLEAN,
        defaultValue:false
    },
}, {
        timestamps: true
});


// User.hasMany(GroupMember, { foreignKey: 'userId' });
// GroupMember.belongsTo(User, { foreignKey: 'id' });

// //Sync the model with the database
// (async () => {
//     try {
//     //   await sequelize.query('DROP TABLE IF EXISTS "Users";');
//       await User.sync({ alter: true });
//     //   console.log('User table updated!');
//     } catch (error) {
//       console.error('Error syncing user table:', error);
//     }
//   })();
  
  module.exports = User;