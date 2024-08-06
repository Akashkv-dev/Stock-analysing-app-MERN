const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    port:5432,
    logging:false,
    dialectOptions: {
        connectTimeout: 60000, // 60 seconds
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;

    