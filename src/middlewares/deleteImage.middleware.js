import PostsModel from "../features/posts/posts.model.js";
import fs from "fs";
import path from "path";

export default function deletePreviousImage(req, res, next){
    if(req.file){
        const postId = req.params["id"];
        const userId = req.userId;

        const post = PostsModel.getByPostId(postId);
        if(post.userid !== userId || !post) next();
        
        const imageName = post.imageurl.split("/").pop();
        fs.unlink(path.resolve("public", "media", imageName), (err)=>{ fileDeleteErrorHandler(err, next)});
    }

    next()

}


const deleteImageAfterPostDelete = (post, next)=>{
    const imageName = post.imageurl.split("/").pop();
    fs.unlink(path.resolve("public", "media", imageName), (err)=>{ fileDeleteErrorHandler(err, next)});
}


const fileDeleteErrorHandler = (err, next)=>{
    if(err && err.code == 'ENOENT') {
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        return next(new Error("Error occurred while trying to remove file"))
    }
}


export {
    deleteImageAfterPostDelete
}