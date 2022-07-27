

var password= document.getElementById('Password');
var flag = 1;
function check(elem){
    if(elem.value.length > 0){
        if(elem.value  != password.value){
            document.getElementById('alert').innerText = "Confirm password does not match";
            flag = 0;
        }else{
            document.getElementById('alert').innerText = "";
            flag = 1;
        }
    }else{
        document.getElementById('alert').innerText = "Please enter confirm password";
        flag = 0;
    }
}
// function validate() {

//     

//     if(flag==1){
//         return true;
//     }else{
//         return false;
//     }
// }

$("#subbtn").on("click",function(e){
    e.preventDefault();

    var err =0

    if($("#Name").val() == ""){
        err++
        $("#msg_name").text("enter name")
    }else{
        $("#msg_name").text("")
    }

    if($("#Email").val() == ""){
        err++
        $("#msg_email").text("enter email")
    }else{
        $("#msg_email").text("")
    }

    if($("#Phone").val() == ""){
        err++
        $("#msg_number").text("enter phone")
    }else{
        $("#msg_number").text("")
    }

    if($("#Textarea1").val() == ""){
        err++
        $("#msg_add").text("enter text")
    }else{
        $("#msg_add").text("")
    }

    if($("#p_image").val() == ""){
        err++
        $("#file_err").text("select an image")
    }else{
        $("#file_err").text("")
    }



    if(err == 0){
        $("#addForm").submit()
    }

})


$("#LoginBtn").on("click",function(e){
    e.preventDefault();

    var err =0

    if($("#AuthEmail").val() == ""){
        err++
        $("#msg_AuthEmail").text("Enter email")
    }else{
        $("#msg_AuthEmail").text("")
    }

    if($("#AuthPassword").val() == ""){
        err++
        $("#msg_AuthPassword").text("Enter Password")
    }else{
        $("#msg_AuthPassword").text("")
    }


    if(err == 0){
        $("#LogForm").submit()
    }

})

