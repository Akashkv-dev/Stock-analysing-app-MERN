const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbconnect')

const Group = sequelize.define('Group', {
    groupId:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true
    },
    gName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    admin:{
        type:DataTypes.NUMBER,
        references:{
            model:'Users',
            key:'id'
        },
        autoIncrement:false,
        unique:true
    },
    members:{
        type:DataTypes.NUMBER,
        references:{
            model:'Users',
            key:'id'
        },
        autoIncrement:false,
        unique:true
    },
},{
    timestamps:true
});

(async ()=>{
    try {
    //   await sequelize.query('DROP TABLE IF EXISTS "Groups";');
        await Group.sync({ alter:true })
    } catch (error) {
        console.error('Error syncing group table:', error);     
    }
})();

module.exports = Group;