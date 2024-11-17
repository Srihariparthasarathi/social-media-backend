import CommentsModel from "./comments.model.js";

const SUCCESS_CODE = 200;
const CREATE_SUCCESS_CODE = 201;

export default class CommentsController{

    getAllComments(req, res){
        const userId = req.params["id"];
        const comments = CommentsModel.getAllByPostId(userId);
        return res.status(SUCCESS_CODE).json({comments: comments});
    }

    createComment(req, res){
        const postId = req.params["id"];
        const userId = req.userId;
        const {content} = req.body;
        const newComment = CommentsModel.create(userId, Number(postId), content);

        return res.status(CREATE_SUCCESS_CODE).json({comment : newComment});

    }
    
    updateComment(req, res){

    }

    deleteComment(req, res){

    }
}