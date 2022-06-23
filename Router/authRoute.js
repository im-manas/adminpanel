const express=require('express')
const auth_route=express.Router()
const auth_controller=require('../Controller/authController')
const {CheckLoggedIn , CheckLogged} = require('../middle-ware/auth_middleware')

auth_route.get('/login',CheckLoggedIn,auth_controller.getLogin)
auth_route.get('/addAdmin',CheckLogged,auth_controller.getaddAdmin)
auth_route.post('/addAdmin',auth_controller.postReg)
auth_route.post('/login',auth_controller.postLogin)
auth_route.get('/logout',auth_controller.getLogout)
auth_route.get('/profile',CheckLogged,auth_controller.viewProfile)


module.exports=auth_route;