import DraftsModel from "./drafts.model.js";

const SUCCESS_CODE = 200;
const CREATED_SUCCESS_CODE = 201;
const NO_CONTENT_CODE = 204;

export default class DraftsController{

    getAllDraftsByUserId(req, res){
        const userId = req.userId;
        const drafts = DraftsModel.getByUserId(userId);
        res.status(SUCCESS_CODE).json({draftItems: drafts})

    }

    getDraftItemById(req, res){

    }

    createDraftItem(req, res){

    }

    updateDraftItem(req, res){

    }

    deleteDraftItem(req, rea){

    }

    archiveDraftToPost(req, res){

    }
}