const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://vinaypunani:C9218730@cluster0.8zbnsyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


const userSchema =new mongoose.Schema({
    name: String,
    email: String,
    image: String
})

module.exports =  mongoose.model('users', userSchema)