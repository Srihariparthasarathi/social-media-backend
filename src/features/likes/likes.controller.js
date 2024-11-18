
import LikesModel from "./likes.model.js";

const RETURN_LIKES_SUCCESS_CODE = 200;


export default class LikesController{

    getLikesByPostId(req, res){
        const postId = req.params['id'];
        const likes = LikesModel.getByPostId(postId);
        return res.status(RETURN_LIKES_SUCCESS_CODE).send({likes: likes});
    }

    toggleLikes(req, res){
        const postId = req.params['id'];
        const userId = req.userId;
        const toggleLikes = LikesModel.toggle(userId, Number(postId));
        return res.status(RETURN_LIKES_SUCCESS_CODE).send({data: toggleLikes});
    }
}