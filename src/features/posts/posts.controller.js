import PostsModel from "./posts.model.js";

const RETURN_POST_SUCCESS_CODE = 200;

export default class PostsController{

    getAllPosts(req, res){
        const posts = PostsModel.getAll();
        res.status(RETURN_POST_SUCCESS_CODE).json({posts: posts});
    }

    getPostById(req, res){
        const postId = req.params["id"];
        const post = PostsModel.getByPostId(postId);
        res.status(RETURN_POST_SUCCESS_CODE).json({post: post});

    }
    getPostByUser(req, res){
        const userId = req.userId;
        const posts = PostsModel.getByUserId(userId);
        res.status(RETURN_POST_SUCCESS_CODE).json({posts: posts});

    }

    createPost(req, res){

    }

    deletePost(req, res){

    }

    updatePost(req, res){

    }
}