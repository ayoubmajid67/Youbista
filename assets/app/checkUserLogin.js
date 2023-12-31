  


window.onload=function(){

    if(localStorage.getItem("userToken")) goToLoginPage(); 
    else logout(); 
}

