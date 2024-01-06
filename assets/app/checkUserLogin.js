window.onload = function () {
	if (localStorage.getItem("userToken") && localStorage.getItem("user")) goToLoginPage();
	else {
		innerLogoutButtons();
		removeUserInfoFromLocalStorage();
		removeAddPostContent();
	}
};
