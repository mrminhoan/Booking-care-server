const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 3: Passing parameters separately (other dialects)
let sequelize;
if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
        host: process.env.HOST_LIVE,
        dialect: 'mysql',
        logging: false
    });

} else {
    sequelize = new Sequelize('hoidanit', 'root', null, {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    });
}
// const sequelize = new Sequelize('sql12676903', 'sql12676903', process.env.DATABASE_PASSWORD, {
//     host: 'sql12.freesqldatabase.com',
//     dialect: 'mysql',
//     logging: false
// });

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;