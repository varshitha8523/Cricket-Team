const express=require('express')

const connectdb=require('./config/db')

const Player=require("./models/playerModel")
const playerRouter = require('./routes/playerRoutes')
const cors = require('cors');

const app=express()

app.use(cors());
app.use(express.json())

app.use('/api/v1/players',playerRouter)
app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})

connectdb();














