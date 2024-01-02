

const loginUrl = baseUrl + "/login";

const errorMsgDom = document.getElementById("errorMsg");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.getElementById("closeBtn");
const navBarBtnsParent=document.getElementById("navBarButtons"); 


let allowSubmission = true;
 

// get Login response :
async function getUserResponse(username, password) {	
	try {
		let response = await axios.post(loginUrl, {
			username: username,
			password: password,
		});

		let data = response.data;
		return data;
	} catch (error) {
		throw error.response.data.message;
	}
}

function showLoginErrorMsg(errorMsg) {
	const errorMsgDom = document.getElementById("errorMsg");
	errorMsgDom.classList.remove("text-success");
	errorMsgDom.classList.add("text-danger");
	errorMsgDom.innerText = errorMsg;
}

function showLoginSuccessMsg(successMsg) {
	const errorMsgDom = document.getElementById("errorMsg");
	errorMsgDom.classList.add("text-success");
	errorMsgDom.classList.remove("text-danger");
	errorMsgDom.innerText = successMsg;
}

const LoginForm = document.getElementById("loginForm");

LoginForm.addEventListener("submit", async function (event) {
	event.preventDefault();
	let status = await handleLogin();

	if (status)
		setTimeout(() => {
            errorMsgDom.innerHTML=""; 
			closeBtn.click();
            goToLoginPage(); 
		}, 160);
});

function  goToLoginPage(){

    let user=JSON.parse(localStorage.getItem("user")); 
    let profileImgUrl=user.profile_image; 
   if (profileImgUrl instanceof Object) {
    profileImgUrl=backupProfileImg; 
}
    navBarBtnsParent.innerHTML=`

    <img src="${profileImgUrl}" alt="profile img" class="rounded-circle border border-2  me-3" style="width: 44px; height: 44px;  margin-left: 1px" />
    <button type="button" class="btn btn-outline-danger  me-2" onclick="logout()">Logout</button>`; 


}

async function handleLogin() {
	let username = document.getElementById("usernameLogin").value;
	let password = document.getElementById("passwordLogin").value;

	try {
        
	 let  data= await getUserResponse(username, password);

        
       
		showLoginSuccessMsg("Your login was successful");

		// store the user token in local storage:
		localStorage.setItem("userToken", data.token);

        // store the use in the local storage : 
        localStorage.setItem("user",JSON.stringify(data.user)); 

		return true;
	} catch (errorMsg) {
		showLoginErrorMsg(errorMsg);
		return false;
	}
}
