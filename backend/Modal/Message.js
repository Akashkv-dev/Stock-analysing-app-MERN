const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbconnect');
const Group = require('./Group');
const User = require('./User');

const Message = sequelize.define('Message', {
    messageId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Groups',
            key: 'groupId'
        },
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
});

(async ()=>{
    try {
    //   await sequelize.query('DROP TABLE IF EXISTS "Message";');
        await Message.sync({ alter:true })
    } catch (error) {
        console.error('Error syncing group table:', error);     
    }
})();

module.exports = Message;
