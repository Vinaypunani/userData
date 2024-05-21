const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const userModels = require('./models/users')
const { log } = require('console')

const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/create', async (req,res)=>{
    var createUser = await userModels.create({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
   })
   res.redirect('/user')
})

app.get('/user', async (req, res)=>{
    var userRead = await userModels.find()

    res.render('users',{userRead: userRead})
})

app.get('/edit/:id', async (req, res)=>{
    let User = await userModels.findOne({_id:req.params.id})
    res.render('edit',{User})
})

app.get('/user/:id', async (req, res)=>{
    await userModels.findOneAndDelete({_id : req.params.id})
    res.redirect('/user')
})

app.post('/update/:id', async (req,res)=>{
    let {name, email, image} = req.body
    let updateUser = await userModels.findOneAndUpdate({_id: req.params.id},{name, email, image},{new:true})
    res.redirect('/user')
})

app.listen(3000)