import ApplicationError from "../../middlewares/applicationError.middleware.js";

const NO_COMMENTS_FOUND_FOR_USER = "Comments not fount for this postId:";
const NO_COMMENT_FOUND = "Please check the comment ID and try again. No comment found with ID:";
const FORBIDDEN_USER_UPDATE ="Forbidden, you don't have access to update this comment";
const FORBIDDEN_USER_DELETE ="Forbidden, you don't have access to delete this comment";

const NOT_FOUND_CODE = 404;
const FORBIDDEN_STATUS_CODE = 403;




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

    static update(userId, commentId, content){
        const commentIndex = commentList.findIndex((comment) => comment.id == commentId);
        if(commentIndex == -1) throw new ApplicationError(`${NO_COMMENT_FOUND} ${commentId}`, NOT_FOUND_CODE);

        const comment = commentList[commentIndex];
        
        if(comment.userId !== userId) throw new ApplicationError(`${FORBIDDEN_USER_UPDATE}`, FORBIDDEN_STATUS_CODE);

        commentList[commentIndex].content = content;

        return comment;
    }

}

const commentList = [
    new CommentsModel(1, 1, 1, "wonderful post"),
    new CommentsModel(2, 1, 2, "wonderful post i love it")
]