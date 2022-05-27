const mongoose=require('mongoose')
const SchemaVariable=mongoose.Schema;

const authSchema=new SchemaVariable({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    p_image:{
        type:String
        
    },
    status:{
        type:String
    }
    
})

module.exports=mongoose.model('user_data',authSchema)