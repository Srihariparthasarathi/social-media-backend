
export default class LikesModel{
    constructor(id, postId, userId){
        this.id = id;
        this.postId = postId;
        this.userId = userId;
    }

    static getByPostId(postId){

    }

    static toggle(userId, postId){
        
    }
}