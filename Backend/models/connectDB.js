const {Sequelize} = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName,dbUsername,dbPassword,
    {
        host: "localhost",
        dialect: "mysql"
    }
);

sequelize.authenticate().then(()=>{
    console.log("Sucessfully connect to the Database ✅")
    }
).catch((err)=>{
    console.log(err);
})

module.exports = sequelize; 