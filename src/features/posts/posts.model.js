import ApplicationError from "../../middlewares/applicationError.middleware.js";

const NO_POST_IN_APPLICATION = "There are no posts yet. Be the first to share and make your mark!";
const NO_POST_CREATED_BY_USER = "You haven't created any posts yet. Hurry up and share your first one!";
const POST_NOT_FOUND = "Please check the post ID and try again. No post found with ID:";
const FORBIDDEN_USER_UPDATE ="Forbidden, you don't have access to update this post";
const FORBIDDEN_USER_DELETE ="Forbidden, you don't have access to delete this post";
const ERROE_UNABLE_TO_DELETE = "unable to delete the post with id";

const POST_NOT_FOUND_CODE = 404;
const FORBIDDEN_STATUS_CODE = 403;

const PORT = 3100;
const IMAGE_URL = `http://localhost:${PORT}/`



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

    static getById(postId){
        const post = postList.find((post) => post.id == postId);
        if(!post) throw new ApplicationError(`${POST_NOT_FOUND} ${postId}`, POST_NOT_FOUND_CODE);
        return post;
    }

    static getByUserId(userId){
        const posts = postList.filter((post) => post.userid == userId);
        if(posts.length == 0) throw new ApplicationError(`${NO_POST_CREATED_BY_USER}`, POST_NOT_FOUND_CODE);
        return posts;
    }

    static add(userId, caption, filePath){
        let newId = (postList.length > 0) ? postList[postList.length-1].id + 1 : 1;

        const imageUrl = IMAGE_URL + filePath.replace(/^public[\\/]/, "").replace(/\\/g, "/");
        const newPost = new PostsModel(newId, userId, caption, imageUrl);
        postList.push(newPost);
        return newPost;
    }

    static update(postId, userId, caption, imageFile){
        const postIndex = postList.findIndex((post) => post.id == postId);
        if(postIndex == -1) throw new ApplicationError(`${POST_NOT_FOUND} ${postId}`, POST_NOT_FOUND_CODE);

        const post = postList[postIndex];

        if(post.userid != userId) throw new ApplicationError(FORBIDDEN_USER_UPDATE, FORBIDDEN_STATUS_CODE);
        
        if(caption) post.caption = caption;
        if(imageFile) post.imageurl = IMAGE_URL + imageFile.path.replace(/^public[\\/]/, "").replace(/\\/g, "/");

        return post;
    }

    static delete(postId, userId){
        const postIndex = postList.findIndex((post) => post.id == postId);
        if(postIndex == -1) throw new ApplicationError(`${POST_NOT_FOUND} ${postId}`, POST_NOT_FOUND_CODE);

        if(postList[postIndex].userid != userId) throw new ApplicationError(FORBIDDEN_USER_DELETE, FORBIDDEN_STATUS_CODE);

        const deletedPost = postList.splice(postIndex, 1);
        if(!deletedPost) throw new Error(` ${ERROE_UNABLE_TO_DELETE} ${postId}`);
        
        return deletedPost[0];

    }

}

const postList = [
    new PostsModel(1, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(2, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(3, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(4, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(5, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(6, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(7, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(8, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(9, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(10, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(11, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(12, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(13, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(14, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(15, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(16, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),
    new PostsModel(17, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(18, 1, "Had a great day at the beach.", "http://example.com/image2.jpg"),

];
