import CommentsModel from "./comments.model.js";

const SUCCESS_CODE = 200;

export default class CommentsController{

    getAllComments(req, res){
        const userId = req.params["id"];
        const comments = CommentsModel.getAllByPostId(userId);
        return res.status(SUCCESS_CODE).json({comments: comments});
    }

    createComment(req, res){

    }
    
    updateComment(req, res){

    }

    deleteComment(req, res){

    }
}