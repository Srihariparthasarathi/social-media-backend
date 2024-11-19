import ApplicationError from "../../middlewares/applicationError.middleware.js";


const NO_DRAFT_ITEM_CREATED = "You haven't created any Draft item yet";
const DRAFT_ITEM_NOT_FOUND = "Please check the Draft ID and try again. No Draft item found with ID:";
const FORBIDDEN_USER = "Forbidden, you don't have access to this Draft item";
const FORBIDDEN_USER_UPDATE ="Forbidden, you don't have access to update this Draft item";
const FORBIDDEN_USER_DELETE ="Forbidden, you don't have access to delete this Draft item";
const ERROE_UNABLE_TO_DELETE = "unable to delete the post with id";

const NOT_FOUND_CODE = 404;
const FORBIDDEN_STATUS_CODE = 403;

const PORT = 3100;
const IMAGE_URL = `http://localhost:${PORT}/`



export default class DraftsModel{
    constructor(id, userId, caption, imageUrl){
        this.id = id;
        this.userid = userId;
        this.caption = caption;
        this.imageurl = imageUrl;
    }

    static getByUserId(userId){
        const drafts = draftsList.filter((draft) => draft.userid == userId);
        if(drafts.length == 0) throw new ApplicationError(`${NO_DRAFT_ITEM_CREATED}`, NOT_FOUND_CODE);
        return drafts;
    }

    static getById(id, userId){
        const draft = draftsList.find((draft) => draft.id == id);
        if(!draft) throw new ApplicationError(`${DRAFT_ITEM_NOT_FOUND} ${id}`, NOT_FOUND_CODE);

        if(draft.userid !== userId) throw new ApplicationError(`${FORBIDDEN_USER}`, FORBIDDEN_STATUS_CODE);

        return draft;
    }

    static add(userId, caption, filePath){
        let newId = (draftsList.length > 0) ? draftsList[draftsList.length-1].id + 1 : 1;

        const imageUrl = IMAGE_URL + filePath.replace(/^public[\\/]/, "").replace(/\\/g, "/");
        const newDraftItem = new DraftsModel(newId, userId, caption, imageUrl);
        draftsList.push(newDraftItem);
        return newDraftItem;
    }

    static update(draftId, userId, caption, imageFile){
        const draftIndex = draftsList.findIndex((draft) => draft.id == draftId);
        if(draftIndex == -1) throw new ApplicationError(`${DRAFT_ITEM_NOT_FOUND} ${draftId}`, NOT_FOUND_CODE);

        const draft = draftsList[draftIndex];

        if(draft.userid !== userId) throw new ApplicationError(FORBIDDEN_USER_UPDATE, FORBIDDEN_STATUS_CODE);
        
        if(caption) draft.caption = caption;
        if(imageFile) draft.imageurl = IMAGE_URL + imageFile.path.replace(/^public[\\/]/, "").replace(/\\/g, "/");

        return draft;
    }

    static delete(draftId, userId){
        const draftIndex = draftsList.findIndex((draft) => draft.id == draftId);
        if(draftIndex == -1) throw new ApplicationError(`${DRAFT_ITEM_NOT_FOUND} ${draftId}`, NOT_FOUND_CODE);

        const draft = draftsList[draftIndex];

        if(draft.userid !== userId) throw new ApplicationError(FORBIDDEN_USER_UPDATE, FORBIDDEN_STATUS_CODE);

        const deletedDraft = draftsList.splice(draftIndex, 1);
        if(!deletedDraft) throw new Error(` ${ERROE_UNABLE_TO_DELETE} ${draftId}`);
        
        return deletedDraft[0];

    }

}

const draftsList = [
    new DraftsModel(1, 1, "this is my first draft item", "http://example.com/image1.jpg"),
    new DraftsModel(2, 1, "this is my second draft item", "http://example.com/image2.jpg"),
]