import CommentsModel from "./comments.model.js";
import { commentsPaginationUtils } from "../../utils/paginition.utils.js";

const SUCCESS_CODE = 200;
const CREATE_SUCCESS_CODE = 201;
const NO_CONTENT_CODE = 204;

export default class CommentsController{

    getAllComments(req, res){
        const userId = req.params["id"];
        const comments = CommentsModel.getAllByPostId(userId);
        
        const data = commentsPaginationUtils(req, comments)
        return res.status(SUCCESS_CODE).json({data: data});
    }

    createComment(req, res){
        const postId = req.params["id"];
        const userId = req.userId;
        const {content} = req.body;
        const newComment = CommentsModel.create(userId, Number(postId), content);

        return res.status(CREATE_SUCCESS_CODE).json({comment : newComment});

    }
    
    updateComment(req, res){
        const commentId = req.params["id"];
        const userId = req.userId;
        const {content} = req.body;
        const updatedComment = CommentsModel.update(userId, Number(commentId), content);
        return res.status(SUCCESS_CODE).json({comment : updatedComment});
    }

    deleteComment(req, res){
        const commentId = req.params["id"];
        const userId = req.userId;
        CommentsModel.delete(userId, Number(commentId));
        return res.sendStatus(NO_CONTENT_CODE);
    }
}