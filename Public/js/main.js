

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
        document.getElementById('alert').innerText = "Please enter confiirm password";
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


// $("#subbtn").on("click",function(e){
//     e.preventDefault();

//     var err =0

//     if($("#password").val() == ""){
//         err++
//         $("#msg_password").text("Enter valid password")
//     }else{
//         $("#msg_password").text("")
//     }

//     if(err == 0){
//         $("#loginForm").submit()
//     }

// })

