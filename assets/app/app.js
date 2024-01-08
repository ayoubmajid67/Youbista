let lastPage = 2;
let currentPage = 1;
async function getJsonPosts(pageNumber) {
	try {
		let currentPageUrl = getPostsUrl + `?page=${pageNumber}`;
		let response = await axios.get(currentPageUrl);
		let data = await response.data;
		if (pageNumber == 1) lastPage = data.meta.last_page;
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

async function PushPostToDom(pageNumber) {
	let arrPosts = Array.from(await getJsonPosts(pageNumber));
	if (arrPosts.length == 0) return;
	arrPosts.forEach((post) => {
		// get post as html
		htmlPost = postJsonToHtml(post);

		// push post to dom
		domPostsParent.innerHTML += htmlPost;
	});

	initializeTooltips();
}

function checkScrollEnd() {
	// Current scroll position
	var scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

	// Total height of the webpage
	var totalHeight = document.documentElement.scrollHeight;

	// Window height
	var windowHeight = window.innerHeight;
	// Check if the scroll position plus the window height equals or exceeds the total height
	if (scrollTop + windowHeight >= totalHeight -80) return true;
	return false;
}
// Throttle function to limit the rate of function execution
function throttle(callback, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                callback.apply(context, args);
            }, wait);
        }
    };
}

async function insertNewPageToDom() {
    if (currentPage === 1) {
        domPostsParent.innerHTML = "";
        await PushPostToDom(currentPage++);
    } else if (checkScrollEnd()) {
        if (currentPage > lastPage) return;
        await PushPostToDom(currentPage++);
    }
}

// Applying throttling to the event listener
var throttledInsertNewPageToDom = throttle(insertNewPageToDom, 500); 

window.onload = insertNewPageToDom;
window.onscroll = throttledInsertNewPageToDom;


/*
```javascript
function throttle(callback, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                callback.apply(context, args);
            }, wait);
        }
    };
}
```

1. **`function throttle(callback, wait) { ... }`:**
   - This is a function named `throttle` that takes two parameters:
     - `callback`: The function to be throttled.
     - `wait`: The minimum time (in milliseconds) to wait between consecutive invocations of the throttled function.

2. **`var timeout;`:**
   - This variable will be used to store the timeout ID returned by `setTimeout`. It keeps track of whether 
   the function is currently throttled.

3. **`return function () { ... };`:**
   - The `throttle` function returns a new function (a closure). This returned function will be used 
   as the throttled version of the original `callback`.

4. **`var context = this;` and `var args = arguments;`:**
   - These lines capture the current `this` value and the arguments passed to the throttled function.
    This ensures that the original context (`this`) and arguments are preserved when invoking the `callback`.

5. **`if (!timeout) { ... }`:**
   - This condition checks if there is an existing timeout. If there is no existing timeout (`!timeout` is true),
    the block of code inside the `if` statement is executed.

6. **`timeout = setTimeout(function () { ... }, wait);`:**
   - This line sets a new timeout using `setTimeout`. The purpose of this timeout 
   is to delay the execution of the `callback` by the specified `wait` duration.

7. **`function () { ... }`:**
   - This is the callback function that will be executed after the timeout.

8. **`timeout = null;`:**
   - Once the timeout has triggered and the callback has been executed, `timeout`
    is set back to `null`. This is crucial because it allows the next invocation 
	to set a new timeout, controlling the rate at which the original function is called.

9. **`callback.apply(context, args);`:**
   - This line invokes the original `callback` using the `apply` method. The `apply`
    method is used to set the `this` value (`context`) and pass the arguments (`args`) to the `callback`. 
	This ensures that the `callback` is executed in the correct context with the correct arguments.

In summary, the `throttle` function is designed to limit the rate at which 
a function can be invoked. It achieves this by setting a timeout and ensuring that the original function is only called 
once within the specified time interval. The captured `this` and `arguments` ensure that the context and arguments 
of the original function are preserved during throttled invocations.
 */