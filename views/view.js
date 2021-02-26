
var FirstName = document.getElementById("firstname");
var LastName = document.getElementById("lastname");
var Email = document.getElementById("email");
var DOB = document.getElementById("birthday");
var bio = document.getElementById("exampleFormControlTextarea1");
var submit = document.getElementById("submit");
var table = document.getElementById("mt");

$('#submit').click(function(){
    if(FirstName.value === ""){
        alert("Please enter Your Firstname");
        $("#myForm").submit(function(){
            return false;
        })
    }
    else if(LastName.value === ""){
        alert("Please enter Your Lastname");
        $("#myForm").submit(function(){
            return false;
        })
    }
    else if(Email.value === ""){
        alert("Please enter Your Email");
        $("#myForm").submit(function(){
            return false;
        })
    }
    else if(DOB.value === ""){
        alert("Please enter Your Date of Birth");
        $("#myForm").submit(function(){
            return false;
        })
    }
    else if(bio.value === ""){
        alert("Please enter Your short bio");
        $("#myForm").submit(function(){
            return false;
        })
    }
    else{
        alert(FirstName.value + ", Your Data has been recorded");
    }
    
});
