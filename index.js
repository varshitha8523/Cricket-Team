// starting the instance of the server
const express=require('express')
// importing connectdb
const connectdb=require('./config/db')
// importing player module
const Player=require("./models/playerModel")
const playerRouter = require('./routes/playerRoutes')
// importing cors to allow requests from a different origin (in this case, your frontend).
const cors = require('cors');

// initailizing app
const app=express()//naming the instance as app
// Use the CORS middleware
app.use(cors());
app.use(express.json())// express.json() a middleware which takes the body u entered and converts it into json data

app.use('/api/v1/players',playerRouter)//// with this we are telling app to use all routes u create in playerrouter
// in '' we wrote absolute path i.e a standard url path 
//  generally starts with api ,
//  then v1 it is version 1 and in future  if we upgrade our backend we will say version 2  v2,v3.here we creating our 1st version i.e, v1,
// then mention for which u are using it here it is for players.


// get request
// app.get("/",async(req,res)=>{
//     // by below code if we enter get i.e / a entry is added in db
//    const data=await new Player({
//     first_name:"Varshitha",
//     last_name:"vemula",
//     email:"varshitha@gmail.com",
//     phone:9987654321,
//     role:'bowler',
//     available:true

//    }).save();//save i.e, adding this data in db
//    res.send({
//     data
//    })
// })


//listening server on port 3000
app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})

connectdb();














