let emailInput = document.getElementById("recipientsEmail");
let emailForm = document.getElementById("email-form");

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function checkEmail(){
    if(!validateEmail(emailInput.value) || !emailInput.value.length){
        alert("Please Enter A Valid Email Address!!!");
        return false;
    }else{
        return true;
    }
}

emailForm.addEventListener("submit", checkEmail);

