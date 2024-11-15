import ApplicationError from "../../middlewares/applicationError.middleware.js";
import PostsModel from "./posts.model.js";

const NO_POST_IN_APPLICATION = "There are no posts yet. Be the first to share and make your mark!";

const RETURN_POST_SUCCESS_CODE = 200;
const POSTS_UNAVAILABLE_CODE = 404;


export default class PostsController{

    getAllPosts(req, res){
        const posts = PostsModel.getAll();
        if(posts.length == 0) throw new ApplicationError(NO_POST_IN_APPLICATION, POSTS_UNAVAILABLE_CODE);
        res.status(RETURN_POST_SUCCESS_CODE).json({posts: posts});
    }

    getPostById(req, res){

    }
    getPostByUser(req, res){

    }

    createPost(req, res){

    }

    deletePost(req, res){

    }

    updatePost(req, res){

    }
}