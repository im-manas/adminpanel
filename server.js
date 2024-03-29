const express=require('express')
const port=8088;
const appServer=express();
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session')
const mongodb_session=require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const multer = require('multer')
const authModel=require('./Model/auth')
const adminRouting=require('./Router/adminRoute')
const authRouting=require('./Router/authRoute')
const userRouting=require('./Router/userRoute')
const dbDriver='mongodb+srv://manaspramanik:Manas_1999@cluster0.vpytl.mongodb.net/adminpanel?retryWrites=true&w=majority'
// const dbDriver = 'mongodb://localhost:27017/adminpanel'
appServer.set('view engine','ejs')
appServer.set('views','View')

const storeValue=new mongodb_session({
    uri:'mongodb+srv://manaspramanik:Manas_1999@cluster0.vpytl.mongodb.net/adminpanel',
    // uri:'mongodb://localhost:27017/adminpanel',
    collection:'my-session'
})

appServer.use(session({secret:'manas',resave:false,saveUninitialized:false,store:storeValue}))
appServer.use(flash())
appServer.use(express.urlencoded({extended: true}));
appServer.use(express.static(path.join(__dirname,'Public')))
appServer.use('/image',express.static(path.join(__dirname,'/image')))
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
appServer.use(multer({storage:fileStorage,
fileFilter:fileFilter, limits:{fieldSize:1024*1024*5}}).single('p_image'))

appServer.use((req,res,next)=>{
    if(!req.session.user)
    {
        return next();
    }
    authModel.findById(req.session.user._id)
    .then(userValue=>{
        req.user = userValue;
        next();
    }).catch(err=> console.log("user not found",err))
});

appServer.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn;
    res.locals.user=req.session.user;
    next();
})

appServer.use(adminRouting)
appServer.use(authRouting)
appServer.use(userRouting)

mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log("Database Connected");
    appServer.listen(port,()=>{
    console.log(`Server Connected at http://127.0.0.1:${port}`);
    })
}).catch(err=>{
    console.log("not connected",err);
})
