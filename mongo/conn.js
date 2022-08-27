const mongoose = require('mongoose')

const connectDb = async () => {
    const db = await mongoose.connect('mongodb://localhost:27017/test')
    if (db) {
        console.log("connection successful")
    }
}

module.exports = connectDb