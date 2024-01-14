 

function setUpUi(){
	let  currentPageName=window.location.pathname.split('/').pop().toLowerCase();
	if (localStorage.getItem("userToken") && localStorage.getItem("user")) {
		if(currentPageName=='index.html')
		goToLoginPage();
	  else if(currentPageName=='profile.html')
	  goToProfilePage();
	
	  else 
	  goToLoginDetailsPage(); 

	  updatePostToLogin(); 
		
	}
	else {
		innerLogoutButtons();
		removeUserInfoFromLocalStorage();
	
	   if (currentPageName=='index.html')
		removeAddPostContent();

		 updatePostToLogout(); 
	}
}
window.onload =setUpUi;


