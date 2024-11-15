import ApplicationError from "../../middlewares/applicationError.middleware.js";

const NO_POST_IN_APPLICATION = "There are no posts yet. Be the first to share and make your mark!";
const NO_POST_CREATED_BY_USER = "You haven't created any posts yet. Hurry up and share your first one!";
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

    static getByUserId(userId){
        const posts = postList.filter((post) => post.userid == userId);
        if(posts.length == 0) throw new ApplicationError(`${NO_POST_CREATED_BY_USER}`, POST_NOT_FOUND_CODE);
        return posts;
    }

    static addPost(userId, caption, imageUrl){
        let newId = (postList.length > 0) ? postList[postList.length-1].id + 1 : 1;
        const newPost = new PostsModel(newId, userId, caption, imageUrl);
        postList.push(newPost);
        return newPost;
    }

}

const postList = [
    new PostsModel(1, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(2, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
];
