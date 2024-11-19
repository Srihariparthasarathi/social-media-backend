import PostsModel from "../features/posts/posts.model.js";
import DeaftModel from "../features/drafts/drafts.model.js"
import fs from "fs";
import path from "path";

const POST_FEATURE_TYPE = "posts";
const DRAFT_FEATURE_TYPE = "drafts";

export default function deletePreviousImage(featureType){
    return function(req, res, next){

        if(!req.file) return next();

        const entityId = req.params['id'];
        const userId = req.userId;

        try{
            let entity = (featureType == POST_FEATURE_TYPE) ? PostsModel.getById(entityId) : DeaftModel.getById(entityId, userId);
            const imageName = entity.imageurl.split("/").pop();
            fs.unlink(path.resolve("public", "media", imageName), (err)=>{ fileDeleteErrorHandler(err, next)});
        }catch(err){
            fs.unlink(path.resolve(req.file.path), (err)=>{ fileDeleteErrorHandler(err, next)});
            next(err);
        }

        next();

    }
}



const deleteImageAfterPostOrDraftDelete = (entity, next)=>{
    const imageName = entity.imageurl.split("/").pop();
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
    deleteImageAfterPostOrDraftDelete
}