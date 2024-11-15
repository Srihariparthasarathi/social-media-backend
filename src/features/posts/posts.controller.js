import PostsModel from "./posts.model.js";
import path from "path";

const PORT = 3100;
const IMAGE_URL = `http://localhost:${PORT}/`
// http://localhost:3100/media/1731687456552-bike.jpg

const RETURN_POST_SUCCESS_CODE = 200;
const POST_CREATED_SUCCESS_CODE = 201;

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
        const userId = req.userId;
        const {caption} = req.body;
        const imageUrl = IMAGE_URL + req.file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/");
        const post = PostsModel.addPost(userId, caption, imageUrl);
        res.status(POST_CREATED_SUCCESS_CODE).json({ post: post});

    }

    updatePost(req, res){

    }

    deletePost(req, res){
        const userId = req.userId;

    }
}