    let baseUrl = "https://tarmeezacademy.com/api/v1";
    let postsUrl = baseUrl + "/posts?limit=30";

    // posts dom parent :

    let domPostsParent = document.getElementById("posts");

    async function getJsonPosts() {
        try {
            let response = await axios.get(postsUrl);
            let data = await response.data;

            return data.data;
        } catch (error) {
            console.log("Error while  Fetching the data : ", error);
            throw error;
        }
    }

   
 class  cPost{
   
    checkValidValues(){

        if(this.profile instanceof Object){
          
         this.profile="./assets/imgs/profile.png"; 
        }
        
        if(this.bodyImg instanceof Object){
          
         this.bodyImg="assets/imgs/body.jpg"; 
        }
          if(this.name==null){
            this.name="no Name"; 
          }
        if(this.title ==null){
           this.title ="No Title"; 
        }
        if(this.bodyText==null){
        this.bodyText="No Body"; 
        }
        

        
    }
   
    constructor(profileImg,username,name,bodyImg,createdDate,title,bodyText,comments){

    this.profile=profileImg; 
    this.name=name;
    this.username=username; 
    this.bodyImg=bodyImg;
    this.createdDate=createdDate; 
    this.title=title; 
    this.bodyText=bodyText;
    this.comments=comments;  
    this.checkValidValues(); 

   }



  }
    function resetPostInfo(){


    }

    function postJsonToHtml(jsonPost) {

         

       
       
       
        let createdDate=jsonPost.created_at;  
        let titleContent=jsonPost.title; 
         let PostObject=new cPost( 
            jsonPost.author.profile_image,
            jsonPost.author.username,
            jsonPost.author.name,
            bodyImage=jsonPost.image,
            jsonPost.created_at,
            titleContent,
            jsonPost.title,
            jsonPost.comments_count
            );
       
        
        htmlPost = `
            <div class="card w-100 shadow-sm" style="width: 18rem">
                                <div class="card-header d-flex align-items-end gap-2">
                                    <img src="${PostObject.profile}" alt="profile img" class="rounded-circle border border-2" style="width: 44px; height: 44px;  margin-left: 1px" />
                                    <h4 class="text-secondary"><span class="text-black">@${PostObject.username}</span> ${PostObject.name}</h4>
                                </div>
                                <img src="${PostObject.bodyImg}" class="img-fluid" alt="Post img " style="aspect-ratio: 16/9; object-fit: cover" />
                                <h6 class="px-1 pt-1 text-end">${PostObject.createdDate}</h6>
                                <div class="card-body pt-1">
                                    <h5 class="card-title">${PostObject.title}</h5>
                                    <p class="card-text">${PostObject.bodyText}.</p>
                                    <hr />
                                    <a href="#" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<b>${PostObject.comments}</b>" data-bs-custom-class="custom-tooltip"> Comments</a>
                                </div>
            </div>
            
            `;
        return htmlPost;
    }

    function getMyPost() {
        return `<div class="card w-100 shadow-sm" style="width: 18rem">
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
        domPostsParent.innerHTML += getMyPost();
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
