// including all routes related to players

// creating instances of express

const express=require('express')

// importing controllers
const {getPlayers, addPlayers, updatePlayer, deletePlayer}=require('../controllers/playerController')

const playerRouter=express.Router()// express.Router() it is a func ,it  helps u to create different routers

// getting data of all users
playerRouter.get('/get-players',getPlayers)// adding getPlayers controller

// posting data of users

playerRouter.post('/add-players',addPlayers)//adding addPlayers controller

// updating req

playerRouter.put('/update-players/:id',updatePlayer)//adding updatePlayer controller and here id and in playercontroller under update heading line below try  ending id  should be same 

// delete req
playerRouter.delete('/delete-players/:id',deletePlayer)

// eporting the playerroutes to use in index.js
 module.exports=playerRouter;

