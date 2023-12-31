// shared between all
const baseUrl = "https://tarmeezacademy.com/api/v1";

//  app  resources :
const getPostsUrl = baseUrl + "/posts";
const backupProfileImg = "./assets/imgs/profile.png";
const backupBodyImg = "./assets/imgs/body.jpg";
let domPostsParent = document.getElementById("posts");

// login resources :
const loginUrl = baseUrl + "/login";

const errorMsgDom = document.getElementById("errorMsg");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.getElementById("closeBtn");
const navBarBtnsParent = document.getElementById("navBarButtons");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const loginModal = document.getElementById("loginModal");
const mainContent = document.getElementById("mainContent");
const LoginForm = document.getElementById("loginForm");

// register resources :
const registerUrl = baseUrl + "/register";

const errorRegisterMsgDom = document.getElementById("errorRegisterMsg");
const registerBtn = document.getElementById("registerBtn");
const closeRegisterBtn = document.getElementById("closeRegisterBtn");
const registerForm = document.getElementById("registerForm");


// add post resource : 
const imgContainer = document.querySelector("#addPostForm .imgContainer");
const imgContainerContent = document.querySelector("#addPostForm .imgContainer .content");

const postTitle=document.getElementById("postTitle"); 
const postBody = document.getElementById("postBody");
const postFileInput = document.getElementById("postImg");
const postTags = document.getElementById("postTags");
const AddPostFrom = document.getElementById("addPostForm");
const closeAddPostBtn = document.getElementById("closeAddPostBtn");
