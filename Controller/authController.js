const authModel = require("../Model/auth");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  let messege = req.flash("error");
  if (messege.length > 0) {
    messege = messege[0];
  } else {
    messege = null;
  }
  res.render("Auth/login", {
    title: "Login-page",
    errorMsg: messege,
  });
};

exports.getaddAdmin = (req, res) => {
  let messege = req.flash("error");
  if (messege.length > 0) {
    messege = messege[0];
  } else {
    messege = null;
  }
  res.render("Admin/add-admin", {
    title: "Add-Admin",
    errorMsg: messege,
  });
};

// exports.postReg= async (req,res)=>{
//     const { f_name , l_name , email  ,password, status   } =  req.body
//     const userValue =await authModel.findOne({email:email})
//     if(userValue)
//     {
//         console.log("email already in use");
//         req.flash('error','Email already exist')
//         return res.redirect('/addAdmin')
//     }
//     const hashPassword =await bcrypt.hash(password,12)
//     const userData=new authModel({f_name:f_name, l_name:l_name, email:email, password:hashPassword, status:status})
//     await userData.save()
//     res.redirect('/view-admin')
// }

exports.postReg = (req, res) => {
  console.log("data:", req.body);
  const { f_name, l_name, email, password, status } = req.body;
  let p_image=req.file
  let p_imageUrl=p_image.path
  authModel
    .findOne({ email: email })
    .then((userValue) => {
      if (userValue) {
        console.log("email already exixts");
        req.flash("error", "Email already exist");
        res.redirect("/addAdmin");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const userData = new authModel({
            f_name: f_name,
            l_name: l_name,
            email: email,
            password: hashPassword,
            status: status,
            p_image:p_imageUrl
          });
          return userData.save();
        })
        .then((result) => {
          console.log("reg done");
          return res.redirect("/view-admin");
        })
        .catch((err) => {
          console.log("err to reg", err);
        });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const userValue = await authModel.findOne({ email: email });
  if (!userValue) {
    req.flash("error", "error :: Invalid email");
    return res.redirect("/login");
  }
  const result = await bcrypt.compare(password, userValue.password);
  if (!result) {
    console.log("invalid password");
    req.flash("error", "error :: Invalid password");
    return res.redirect("/login");
  } else {
    req.session.isLoggedIn = true;
    req.session.user = userValue;
    console.log("loggedin...")
    res.redirect("/");
  }
};


exports.getLogout = (req, res) => {
  req.session.destroy();
  console.log("logout", req.session);
  res.redirect("/login");
};

exports.viewProfile=(req,res)=>{
  res.render('Auth/profile',{
    title:"Profile"
  })
}