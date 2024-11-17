import ApplicationError from "../../middlewares/applicationError.middleware.js";

const NO_COMMENTS_FOUND_FOR_USER = "Comments not fount for this postId:"
const NOT_FOUND_CODE = 404;


export default class CommentsModel{

    constructor(id, userId, postId, content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getAllByPostId(postId){
        const comments = commentList.filter((comment) => comment.postId == postId);
        if(comments.length == 0) throw new ApplicationError(`${NO_COMMENTS_FOUND_FOR_USER} ${postId}`, NOT_FOUND_CODE);
        return comments;
    }

    static create(userId, postId, comment){
        let newId = (commentList.length > 0) ? commentList[commentList.length-1].id + 1 : 1;
        const newComment = new CommentsModel(newId, userId, postId, comment);
        commentList.push(newComment);
        return newComment;
    }

}

const commentList = [
    new CommentsModel(1, 1, 1, "wonderful post"),
    new CommentsModel(2, 1, 2, "wonderful post i love it")
]