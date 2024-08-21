const sequelize = require('./dbconnect')
const User=require('../Modal/User');
const Group=require('../Modal/Group')
const GroupMembers=require('../Modal/GroupMembers')

Group.hasMany(GroupMembers, { foreignKey: 'groupId' });
GroupMembers.belongsTo(Group, { foreignKey: 'groupId' });

User.hasMany(GroupMembers, { foreignKey: 'userId' });
GroupMembers.belongsTo(User, { foreignKey: 'userId' });

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

module.exports = {
    User,
    Group,
    GroupMembers
};