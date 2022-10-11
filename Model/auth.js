const mongoose=require('mongoose')
const SchemaVariable=mongoose.Schema;
const authSchema=new SchemaVariable({
    f_name:{
        type:String,
        required:true
    },
    l_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required:true
    },
    status:{type:String},
    p_image:{type:String}
})

module.exports=mongoose.model('auth_data',authSchema)