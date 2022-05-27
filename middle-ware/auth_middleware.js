function CheckLoggedIn(req,res,next){
    if(req.session.isLoggedIn == true)
    {
        return res.redirect('/')
    }
    else{
        next()
    }
}

function CheckLogged(req,res,next){
    if(req.session.isLoggedIn == undefined || req.session.isLoggedIn == false){
        res.redirect('/login')
    }else{
        next()
    }
}

module.exports={CheckLoggedIn , CheckLogged};