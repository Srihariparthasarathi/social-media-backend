import PostsModel from "./posts.model.js";

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
        const filePath = req.file.path;
        const post = PostsModel.addPost(userId, caption, filePath);
        res.status(POST_CREATED_SUCCESS_CODE).json({ post: post});

    }

    updatePost(req, res){
        const userId = req.userId;
        const {caption} = req.body;
        const postId = req.params["id"];
        const imageFile = req.file;
        const post = PostsModel.updatePost(postId, userId, caption, imageFile);
        res.status(RETURN_POST_SUCCESS_CODE).json({ post: post});
    }

    deletePost(req, res){
        const userId = req.userId;

    }
}