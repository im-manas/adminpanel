const express=require('express')
const admin_route=express.Router()
const admin_controller=require('../Controller/adminController')
const {CheckLoggedIn , CheckLogged} = require('../middle-ware/auth_middleware')

admin_route.get('/',CheckLogged,admin_controller.getIndex)
admin_route.get('/view-admin',CheckLogged,admin_controller.getViewAdmin)
admin_route.get('/delete/:admin_id',admin_controller.getDeleteAdmin)
admin_route.get('/edit/:admin_id',admin_controller.getEdit)
admin_route.post('/edit',admin_controller.postEditData)




module.exports=admin_route;