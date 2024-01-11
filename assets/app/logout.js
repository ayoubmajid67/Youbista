let loginRegisterContent = `
<button type="button" class="btn btn-outline-success  me-2"  data-bs-toggle="modal" data-bs-target="#loginModal" id="loginNavBtn" >Login</button>

<button type="button" class="btn btn-outline-success" style="margin-left: 0.5rem"  data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
`;

function innerLogoutButtons() {
	navBarBtnsParent.innerHTML = loginRegisterContent;
}

function removeUserInfoFromLocalStorage() {
	localStorage.removeItem("userToken");
	localStorage.removeItem("user");

	if (localStorage.getItem("user")) {
		let user = JSON.parse(localStorage.getItem("user"));
		document.getElementById("usernameLogin").value = user.username;
	}
}
function removeAddPostContent() {
	mainContent.firstElementChild.innerHTML = "";
}
async function logout() {
	let currentPageName = window.location.pathname.split("/").pop().toLowerCase();

	removeUserInfoFromLocalStorage();
	innerLogoutButtons();
	if (currentPageName == "index.html") removeAddPostContent();
	else {
		addCommentForm = document.getElementById("addComments");
		addCommentForm.innerHTML = "";
	}

	await delay(200);
	appendAlert("Logged out successfully", "danger");

	await delay(100);
	await clearAlert();
}
