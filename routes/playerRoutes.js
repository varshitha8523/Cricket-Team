

const express=require('express')


const {getPlayers, addPlayers, updatePlayer, deletePlayer}=require('../controllers/playerController')

const playerRouter=express.Router()
playerRouter.get('/get-players',getPlayers)

playerRouter.post('/add-players',addPlayers)


playerRouter.put('/update-players/:id',updatePlayer)
playerRouter.delete('/delete-players/:id',deletePlayer)


 module.exports=playerRouter;

