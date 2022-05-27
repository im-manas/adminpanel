const express=require('express')
const user_route=express.Router()
const user_controller=require('../Controller/userController')
const {CheckLoggedIn , CheckLogged} = require('../middle-ware/auth_middleware')
const multer=require('multer')


const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'image')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
const fileFilter=(req,file,callback)=>{
    if(file.mimetype.includes("png")||
    file.mimetype.includes("jpg")||
    file.mimetype.includes("jpeg"))
    {
        callback(null,true)
    }
    else
    {
        callback(null,false)
    }
}


user_route.get('/view-user',CheckLogged,user_controller.getUserDetails)
user_route.get('/add-user',CheckLogged,user_controller.getAddUser)
user_route.post('/add-user',[multer({storage:fileStorage,
    fileFilter:fileFilter, limits:{fieldSize:1024*1024*5}}).single('p_image')],user_controller.postUserData)
user_route.get('/delete-user/:user_id',user_controller.getDeleteUser)
user_route.get('/edit-user/:user_id',user_controller.getEditUser)
user_route.post('/edit-user',user_controller.postEditUser)


module.exports=user_route