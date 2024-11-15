import ApplicationError from "../../middlewares/applicationError.middleware.js";

const NO_POST_IN_APPLICATION = "There are no posts yet. Be the first to share and make your mark!";
const POST_NOT_FOUND = "Please check the post ID and try again. No post found with ID:";

const POST_NOT_FOUND_CODE = 404;


export default class PostsModel{
    constructor(id, userid, caption, imageurl){
        this.id = id;
        this.userid = userid;
        this.caption = caption;
        this.imageurl = imageurl;
    }

    static getAll(){
        if(postList.length == 0) throw new ApplicationError(NO_POST_IN_APPLICATION, POST_NOT_FOUND_CODE);
        return postList;
    }

    static getByPostId(postId){
        const post = postList.find((post) => post.id == postId);
        if(!post) throw new ApplicationError(`${POST_NOT_FOUND} ${postId}`, POST_NOT_FOUND_CODE);
        return post;
    }
}

const postList = [
    new PostsModel(1, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(2, 1, "Had a great day at the beach.", "http://example.com/image2.jpg")
];
