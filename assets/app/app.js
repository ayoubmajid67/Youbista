const baseUrl = "https://tarmeezacademy.com/api/v1";
const getPostsUrl = baseUrl + "/posts?limit=50";
const backupProfileImg = "./assets/imgs/profile.png";
const backupBodyImg = "./assets/imgs/body.jpg";

// posts dom parent :

let domPostsParent = document.getElementById("posts");

async function getJsonPosts() {
	try {
		let response = await axios.get(getPostsUrl);
		let data = await response.data;

		return data.data;
	} catch (error) {
		console.log("Error while  Fetching the data : ", error);
		throw error;
	}
}

class cPost {
	FillPostTags() {
		const arrTags = Array.from(this.tags);

		for (let i = 0; i < arrTags.length; i++) {
			if (i == 3) return;
			this.tagContent += `<a href="#" class=" btn text-secondary btn-outline-secondary  ">${arrTags[i]}</a>	`;
		}
	}
	checkValidValues() {
		if (this.profile instanceof Object) {
			this.profile = backupProfileImg;
		}

		if (this.bodyImg instanceof Object) {
			this.bodyImg = backupBodyImg;
		}
		if (this.name == null) {
			this.name = "no Name";
		}
		if (this.title == null) {
			this.title = "No Title";
		}
		if (this.bodyText == null) {
			this.bodyText = "No Body";
		}

		if (this.tags.length > 0) {
			this.FillPostTags();
		}
	}

	constructor(profileImg, username, name, bodyImg, createdDate, title, bodyText, tags, comments) {
		this.profile = profileImg;
		this.name = name;
		this.username = username;
		this.bodyImg = bodyImg;
		this.createdDate = createdDate;
		this.title = title;
		this.bodyText = bodyText;
		this.tags = tags;
		this.tagContent = "";
		this.comments = comments;
		this.checkValidValues();
	}
}

function postJsonToHtml(jsonPost) {
	let PostObject = new cPost(jsonPost.author.profile_image, jsonPost.author.username, jsonPost.author.name, (bodyImage = jsonPost.image), jsonPost.created_at, jsonPost.title, jsonPost.body, jsonPost.tags, jsonPost.comments_count);
	htmlPost = `
            <div class="card w-100 shadow-sm" style="width: 18rem">
                                <div class="card-header d-flex align-items-end gap-2">
                                    <img src="${PostObject.profile}" alt="profile img" class="rounded-circle border border-2" style="width: 44px; height: 44px;  margin-left: 1px" />
                                    <h4 class="text-secondary"><span class="text-black">@${PostObject.username}</span> ${PostObject.name}</h4>
                                </div>
                                <img src="${PostObject.bodyImg}" class="img-fluid" alt="Post img " style="aspect-ratio: 16/9; object-fit: contain" />
                                <h6 class="px-1 pt-1 text-end">${PostObject.createdDate}</h6>
                                <div class="card-body pt-1">
                                    <h5 class="card-title">${PostObject.title}</h5>
                                    <p class="card-text">${PostObject.bodyText}.</p>
                                    <hr />
                                  
                                    <div class="tagCommentContent d-flex justify-content-between  align-items-center g-2">

                                    <a href="#" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<b>${PostObject.comments}</b>" data-bs-custom-class="custom-tooltip"> Comments</a>
                                 <div class="tagContent d-flex gap-2 w-75 justify-content-end  overflow-hidden ">
                                             ${PostObject.tagContent}
                                 
                                </div>
                            
                                </div>
            </div>
            
            `;
	return htmlPost;
}

function getMainBeforePosts() {
	return `
	<div class="card w-100 shadow-sm" style="width: 18rem">
        <div class="card-header d-flex align-items-end gap-2">
            <img src="./assets/imgs/profile.png " alt="profile img" class="rounded-circle border border-2" style="width: 44px; height: 44px;  margin-left: 1px" />
            <h4 class="text-secondary"><span class="text-black">M</span>ajid</h4>
        </div>
        <img src="assets/imgs/body.jpg" class="img-fluid" alt="Post img " style="aspect-ratio: 16/9; object-fit: cover" />
        <h6 class="px-1 pt-1 text-end">2 min</h6>
        <div class="card-body pt-1">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <hr />
            <a href="#" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<b>3</b>" data-bs-custom-class="custom-tooltip"> Comments</a>
        </div>
    </div>`;
}

async function PushPostToDom() {
	domPostsParent.innerHTML = "";
	domPostsParent.innerHTML += getMainBeforePosts();
	let arrPosts = Array.from(await getJsonPosts());
	arrPosts.forEach((post) => {
		// get post as html
		htmlPost = postJsonToHtml(post);

		// push post to dom
		domPostsParent.innerHTML += htmlPost;
	});

	// Initialize tooltips for the newly added posts
	const newTooltipTriggerList = domPostsParent.querySelectorAll('[data-bs-toggle="tooltip"]');
	newTooltipTriggerList.forEach((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
}

PushPostToDom();
