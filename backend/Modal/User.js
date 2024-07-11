const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbconnect')

const User = sequelize.define('User', {
    id:{
        type:DataTypes.BIGINT,
        autoIncrement :true,
        primaryKey:true
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

// Sync the model with the database
(async () => {
    try {
    //   await sequelize.query('DROP TABLE IF EXISTS "Users";');
      await User.sync({ alter: true });
      console.log('User table updated!');
    } catch (error) {
      console.error('Error syncing user table:', error);
    }
  })();
  
  module.exports = User;