import DraftsModel from "./drafts.model.js";
import {deleteImageAfterPostOrDraftDelete} from "../../middlewares/deleteImage.middleware.js"

const SUCCESS_CODE = 200;
const CREATED_SUCCESS_CODE = 201;
const NO_CONTENT_CODE = 204;

export default class DraftsController{

    getAllDraftsByUserId(req, res){
        const userId = req.userId;
        const drafts = DraftsModel.getByUserId(userId);
        res.status(SUCCESS_CODE).json({draftItems: drafts})
    }

    getDraftItemById(req, res, next){
        const userId = req.userId;
        const draftId = req.params["id"];
        try{
            const draftItem = DraftsModel.getById(draftId, userId);
            res.status(SUCCESS_CODE).json({draftItem : draftItem});
        }catch(err){
            next(err);
        }
        
    }

    createDraftItem(req, res){
        const userId = req.userId;
        const {caption} = req.body;
        const filePath = req.file.path;
        const draftItem = DraftsModel.add(userId, caption, filePath);
        res.status(CREATED_SUCCESS_CODE).json({draftItem : draftItem});

    }

    updateDraftItem(req, res){
        const userId = req.userId;
        const {caption} = req.body;
        const postId = req.params["id"];
        const imageFile = req.file;
        const draftItem = DraftsModel.update(postId, userId, caption, imageFile);
        res.status(SUCCESS_CODE).json({draftItem : draftItem});

    }

    deleteDraftItem(req, res, next){
        const userId = req.userId;
        const draftId = req.params["id"];
        try{
            const draft =  DraftsModel.delete(draftId, userId);
       
            deleteImageAfterPostOrDraftDelete(draft, next);
            return res.sendStatus(NO_CONTENT_CODE)
        }catch(err){
            next(err);
        }

    }

    archiveDraftToPost(req, res){

    }
}