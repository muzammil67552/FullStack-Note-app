const mongoose = require("mongoose");

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/note_app");
        console.log("SuccessFully Connected To DB")
    } catch (error) {
        console.log("Error in Connecting Db", error.message)
    }
}

module.exports = connectToMongoDB