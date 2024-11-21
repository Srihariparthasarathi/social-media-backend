import PostsModel from "./posts.model.js";
import {deleteImageAfterPostOrDraftDelete} from "../../middlewares/deleteImage.middleware.js";
import { postpaginationUtils } from "../../utils/paginition.utils.js";
import filterByCaption from "../../utils/captionFilter.utils.js"

const RETURN_POST_SUCCESS_CODE = 200;
const POST_CREATED_SUCCESS_CODE = 201;
const NO_CONTENT_CODE = 204;


export default class PostsController{

    getAllPosts(req, res){
        let posts = PostsModel.getAll();
        const { search } = req.query;

        if(search){
            posts = filterByCaption(req, posts);
        } 

        let  data = postpaginationUtils(req, posts);
        res.status(RETURN_POST_SUCCESS_CODE).json({data: data});

    }

    getPostById(req, res, next){
        const postId = req.params["id"];
        try{
            const post = PostsModel.getById(postId);
            res.status(RETURN_POST_SUCCESS_CODE).json({post: post});
        }catch(err){
            next(err);
        }
       

    }
    getPostByUser(req, res){
        const userId = req.userId;
        const posts = PostsModel.getByUserId(userId);
        
        let  data = postPagenationUtils(req, posts);
        res.status(RETURN_POST_SUCCESS_CODE).json({data: data});

    }

    createPost(req, res){
        const userId = req.userId;
        const {caption} = req.body;
        const filePath = req.file.path;
        const post = PostsModel.add(userId, caption, filePath);
        res.status(POST_CREATED_SUCCESS_CODE).json({ post: post});

    }

    updatePost(req, res){
        const userId = req.userId;
        const {caption} = req.body;
        const postId = req.params["id"];
        const imageFile = req.file;

        const post = PostsModel.update(postId, userId, caption, imageFile);
        res.status(RETURN_POST_SUCCESS_CODE).json({ post: post});
       
    }

     deletePost(req, res, next){
        const userId = req.userId;
        const postId = req.params["id"];
        try{
            const post =  PostsModel.delete(postId, userId);
            deleteImageAfterPostOrDraftDelete(post, next);
            return res.sendStatus(NO_CONTENT_CODE)
        }catch(err){
            next(err);
        }
     }
}