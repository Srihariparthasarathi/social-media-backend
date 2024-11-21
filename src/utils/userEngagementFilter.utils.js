// OM NANASIVAYA
import CommentsModel from "../features/comments/comments.model.js";
import LikesModel from "../features/likes/likes.model.js"

export default function userEngagementSortPosts(posts){

    posts.forEach(post => {
        post.userEngagement = 0;
        try{
            let totalLikes = LikesModel.getByPostId(post.id).length;
            post.userEngagement = post.userEngagement + (totalLikes * 1.5)
        }catch(err){

        }
        try{
            let totalComments = CommentsModel.getAllByPostId(post.id).length;
            post.userEngagement = post.userEngagement + (totalComments * 1.5)
        }catch(err){

        }
    });

    const sortedPosts = posts.sort((a, b) => b.userEngagement - a.userEngagement);
    sortedPosts.forEach((post)=> delete post['userEngagement']);
    
    return sortedPosts;

}