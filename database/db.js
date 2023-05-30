const mongoose = require("mongoose")
const config = require("../config/config")
console.log(config)
mongoose.connect(config.mongodburl).then(() => {
    
    console.log("database connection is established")
}).catch((err) => {
    console.log("error while connecting in database" , err)
})