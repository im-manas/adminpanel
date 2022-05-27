const authModel=require('../Model/auth')
const bcrypt=require('bcryptjs')

exports.getLogin=(req,res)=>{
    let messege=req.flash('error')
    if(messege.length>0)
    {
        messege=messege[0]
    }
    else
    {
        messege=null
    }
    res.render('Auth/login',{
        title:"Login-page",
        errorMsg:messege
    })
}

exports.getaddAdmin=(req,res)=>{
    let messege=req.flash('error')
    if(messege.length>0)
    {
        messege=messege[0]
    }
    else
    {
        messege=null
    }
    res.render('Admin/add-admin',{
        title:"Add-Admin",
        errorMsg:messege,
    })
}



exports.postReg= async (req,res)=>{
    const { f_name , l_name , email  ,password, status   } =  req.body
    const userValue =await  authModel.findOne({email:email})
    if(userValue)
    {
        req.flash('error','Email already exist')
        return res.redirect('/addAdmin')    
    }
    const hashPassword =await bcrypt.hash(password,12)
    const userData=new authModel({f_name:f_name, l_name:l_name, email:email, password:hashPassword, status:status})
    await userData.save()
    res.redirect('/view-admin')   
}

exports.postLogin=async (req,res)=>{
    const {email, password }=req.body
    const userValue = await authModel.findOne({email:email})
        if(!userValue)
        {
            req.flash('error','error :: Invalid email')
            return res.redirect('/login')
        }
        const result= bcrypt.compare(password,userValue.password)
            if(!result)
            {
                console.log("invalid password")
                req.flash('error','error :: Invalid password')
                res.redirect('/login')
            }
            else
            {
                req.session.isLoggedIn = true;
                req.session.user=userValue;
                res.redirect('/')
            } 
        }

exports.getLogout=(req,res)=>{
    req.session.destroy()
    console.log("logout",req.session);
  res.redirect('/login');
}