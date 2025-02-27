// creating conrollers like req and res

// importing players model
 const Player=require('../models/playerModel')

//  cretaing controllers for get
 const  getPlayers=async(req,res)=>{
    // always use try and catch in controllers bcs controllers frequently throw error with try and catch we can easily handle the errors
 try{
    const data=await  Player.find({})
    res.status(200).send({
        success:true,
        message:'Data of Players',
        data //not writing data:data bcs in js if key and value is same it automatoically creates key so we didn't mentioned key i.e, data 
    })
 }catch(err){

    res.status(500).send({
        success:false,
        message:'INTERNAL SERVER ERROR',
        err
    })
 }
 }

//  creating controllers for post
 const addPlayers=async (req,res)=>{
    // we pass the body through req
    try{
        // writing add req
        // wrinting js destructured method in which taking all properties out from req. body like the one before = and after const
        const {first_name,last_name,email,phone,role,available} =req.body
        //   below line  is a vlidation that every field is filled i.e any 1 is true the if works
        // if(!first_name||!last_name||!email||!phone||!role||!available){
        //     return res.status(404).send({
        //         success:false,
        //         message:'each field is mandatory'

        // }) 

        // }
        //if all field are present inserting data
        await Player({
            first_name,
            last_name,
            email,
            phone,
            role,
            available
            
        }).save()
        // console.log(req.body) to see whether body we entered is coming or not
        res.status(200).send({
            success:true,
            message:'Data added successfully!!!'
        })

    }catch(err){

        console.log(err)//to understand errors easily if any error occurs
        
    res.status(500).send({
    
        success:false,
        message:'INTERNAL SERVER ERROR',
        err
    })
 }

 }


//  controller for updataing the data
const updatePlayer=async(req,res)=>{
    try{
     //for updating collection we req id from collection we pass that id using params in req
     const player_id=req.params.id
     await Player.updateOne({_id:player_id},{$set:req.body})//updateOne as we are updating 1 record ,_id:player_id  checking the id we send matched with any id in db and{$set:req.body} by this updated body is set into this record,
     res.status(200).send({
        success:true,
        message:'Player updated successfully!!!'
    })
    }catch(err){

        console.log(err)//to understand errors easily if any error occurs
        
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

//  exporting the controllers it is named exporting because in future we export other things also from this file
module.exports={getPlayers,addPlayers,updatePlayer,deletePlayer}