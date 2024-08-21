const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbconnect')
const Group= require('./Group');
const User=require('./User')

const GroupMember = sequelize.define('GroupMember',{
    groupId: {
        type: DataTypes.BIGINT,
        references: {
            model: Group,
            key: 'groupId'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: true
});



// Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });
// User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });

// (async ()=>{
//     try {
//     //   await sequelize.query('DROP TABLE IF EXISTS "GroupMembers";');
//         await GroupMember.sync({ alter:true })
//     } catch (error) {
//         console.error('Error syncing group table:', error);     
//     }
// })();

module.exports = GroupMember;