const dotenv = require("dotenv")
const path = require("path")

process.env.NODE_ENV = "test"

dotenv.config({ path: path.join(__dirname, `../environment/.${process.env.NODE_ENV}.env`) })


module.exports = {
    port: process.env.port,
    mongodburl: process.env.mongodburl,
    JWT: process.env.JWT

}