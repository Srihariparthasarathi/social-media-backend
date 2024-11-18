
import LikesModel from "./likes.model.js";

const RETURN_LIKES_SUCCESS_CODE = 200;
const CREATED_SUCCESS_CODE = 201;
const NO_CONTENT_CODE = 204;

export default class LikesController{

    getLikesByPostId(req, res){
        const postId = req.params['id'];
        const likes = LikesModel.getByPostId(postId);
        return res.status(RETURN_LIKES_SUCCESS_CODE).send({likes: likes});
    }

    toggleLikes(req, res){

    }
}