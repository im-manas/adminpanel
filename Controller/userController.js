const userModel=require('../Model/user')


exports.getAddUser=(req,res)=>{
    let messege=req.flash('error')
    if(messege.length>0)
    {
        messege=messege[0]
    }
    else
    {
        messege=null
    }
    let {isLoggedIn}=req.session;
    res.render('User/add-user',{
        title:"Add-user",
        isLoggedIn:isLoggedIn,
        errorMsg:messege
    })
}

exports.postUserData=async (req,res)=>{
    let {name, email, password, phone, address, status} = req.body;
    let p_image=req.file
    let p_imageUrl=p_image?.path
    const userValue =await  userModel.findOne({email:email})
    if(userValue)
    {
        req.flash('error','Email already exist')
        return res.redirect('/add-user')
    }
    const formData = new userModel({name:name, email:email, password:password,phone:phone, address:address, p_image:p_imageUrl, status:status})
    const results = await formData.save()
    res.redirect('/view-user')
}

exports.getUserDetails= async (req,res)=>{
    let { isLoggedIn }= req.session;
    const results=await userModel.find()
        res.render('User/view-user',{
                title:"User-Details",
                data:results,
                isLoggedIn:isLoggedIn
            })
    }

    exports.getDeleteUser=async (req,res)=>{
        let user_id=req.params.user_id
        const result= await userModel.deleteOne({_id:user_id})
        console.log(result);
        res.redirect('/view-user')
    }

    exports.getEditUser=async (req,res)=>{
        let {isLoggedIn}=req.session
        let user_id=req.params.user_id
        const results = await userModel.findById(user_id)
            res.render('User/edit-user',{
                title:"Edit Page",
                data:results,
                isLoggedIn : isLoggedIn
            })
    }

        exports.postEditUser=async (req,res)=>{
        const {name, email, confpassword, phone, address, status, id, image}=req.body
        let p_image=req.file;
        let image_url;
        if(p_image===undefined)
        {
            image_url=image
        }else{
            image_url=p_image.path
        }
        console.log("image",p_image);
        const updatedData = await userModel.findById(id)
           updatedData.name=name
           updatedData.email=email
           updatedData.password=confpassword
           updatedData.phone=phone
           updatedData.address=address
           updatedData.status=status
           updatedData.p_image=image_url;
        let results =  updatedData.save()
                return res.redirect('/view-user')
            }