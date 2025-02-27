// creating model for player in circket project
const mongoose=require('mongoose')
// ccreating schema for player
const Player=mongoose.Schema({
    first_name:{
        type:String,
        required:true

    },
    last_name:{
        type:String,
        required:true//i.e, that field is mandatory

    },
    email:{
            type:String,
            required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true

    }
})

// exporting this schema to use in index.js
module.exports=mongoose.model('Player',Player)//before , collection name and after , schema name 