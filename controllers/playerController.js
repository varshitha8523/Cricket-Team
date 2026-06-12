
 const Player=require('../models/playerModel')

 const  getPlayers=async(req,res)=>{
    try{
    const data=await  Player.find({})
    res.status(200).send({
        success:true,
        message:'Data of Players',
        data  })
 }catch(err){

    res.status(500).send({
        success:false,
        message:'INTERNAL SERVER ERROR',
        err
    })
 }
 }


 const addPlayers=async (req,res)=>{
    
    try{
             const {first_name,last_name,email,phone,role,available} =req.body
       
        await Player({
            first_name,
            last_name,
            email,
            phone,
            role,
            available
            
        }).save()
       
        res.status(200).send({
            success:true,
            message:'Data added successfully!!!'
        })

    }catch(err){

        console.log(err)
        
    res.status(500).send({
    
        success:false,
        message:'INTERNAL SERVER ERROR',
        err
    })
 }

 }

const updatePlayer=async(req,res)=>{
    try{
  
     const player_id=req.params.id
     await Player.updateOne({_id:player_id},{$set:req.body})
     res.status(200).send({
        success:true,
        message:'Player updated successfully!!!'
    })
    }catch(err){

        console.log(err)
        
    res.status(500).send({
    
        success:false,
        message:'INTERNAL SERVER ERROR',
        err
    })
 }
}

const deletePlayer=async (req,res)=>{
    try{
      const player_id=req.params.id
      await Player.deleteOne({_id:player_id})
      res.status(200).send({
        success:true,
        message:'Player deleted successfully!!!'
    })
    }catch(err){

       
        
    res.status(500).send({
    
        success:false,
        message:'INTERNAL SERVER ERROR',
        err
    })
 }
}

module.exports={getPlayers,addPlayers,updatePlayer,deletePlayer}
