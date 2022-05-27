const authModel=require('../Model/auth')
const userModel=require('../Model/user')

exports.getIndex= async (req,res)=>{
   const adminCount =await authModel.find().count()
   const userCount= await userModel.find().count()
    res.render('Admin/index',{
        title:"home",
        userCount : userCount,
        adminCount : adminCount
    })
}

exports.getViewAdmin= async (req,res)=>{
    let { isLoggedIn }= req.session;
    const admin =await authModel.find();
    res.render('Admin/view-admin',{
            title:"Admin-Details",
            data:admin,
            isLoggedIn : isLoggedIn
        })
   
}

// exports.getaddAdmin=(req,res)=>{
//     let {isLoggedIn}=req.session
//     let messege=req.flash('error')
//     console.log(messege);
//     if(messege.length>0)
//     {
//         messege=messege[0]
//     }
//     else
//     {
//         messege=null
//     }
//     res.render('Admin/add-admin',{
//         title:"Add-Admin",
//         errorMsg:messege,
//         isLoggedIn:isLoggedIn
//     })
// }

exports.getDeleteAdmin=async (req,res)=>{
    let admin_id=req.params.admin_id
    console.log("admin id:",admin_id);
    const result= await authModel.deleteOne({_id:admin_id})
        console.log(result);
        res.redirect('/view-admin')
    }

exports.getEdit=async (req,res)=>{
    let {isLoggedIn}=req.session
    let admin_id=req.params.admin_id
    const results = await authModel.findById(admin_id)
        res.render('Admin/edit-admin',{
            title:"Edit Page",
            data:results,
            isLoggedIn : isLoggedIn
        })
}

exports.postEditData=async (req,res)=>{
    const {f_name, l_name, email, status,id}=req.body
    const updatedData = await authModel.findById(id)
       updatedData.f_name=f_name
       updatedData.l_name=l_name
       updatedData.email=email
       updatedData.status=status
    let results =  updatedData.save()
            return res.redirect('/view-admin')
        }
    
