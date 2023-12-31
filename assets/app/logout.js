let loginRegisterContent=`
<button type="button" class="btn btn-outline-success  me-2"  data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>

<button type="button" class="btn btn-outline-success" style="margin-left: 0.5rem">Register</button>
`;



function logout(){
 
localStorage.removeItem("userToken");
localStorage.removeItem("user");  

navBarBtnsParent.innerHTML=loginRegisterContent; 


}