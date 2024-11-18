import ApplicationError from "../../middlewares/applicationError.middleware.js";

const NO_LIKES_FOUND = "There are no likes for the post with ID:";
const NOT_FOUND = 404;

export default class LikesModel{
    constructor(id, postId, userId){
        this.id = id;
        this.postId = postId;
        this.userId = userId;
    }

    static getByPostId(postId){
        const likes = likesList.filter((like) => like.postId == postId);
        if(likes.length == 0) throw new ApplicationError(`${NO_LIKES_FOUND} ${postId}`,NOT_FOUND);
        return likes;
    }

    static toggle(userId, postId){

    }
}

const likesList = [
    new LikesModel(1, 1, 1)
]