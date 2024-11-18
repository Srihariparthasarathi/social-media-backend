import BookMarksModel from "./bookmarks.model.js";

const SUCCESS_CODE = 200;

export default class BookMarksController{
    
    checkBookMark(req, res){
        const userId = req.userId;
        const postId = req.params["id"];
        const bookMark = BookMarksModel.ckeckStatus( userId, Number(postId));
        return res.status(SUCCESS_CODE).json({ bookMark : bookMark });
    }

    toggleBookMark(req, res){
        const postId = req.params['id'];
        const userId = req.userId;
        const bookMark = BookMarksModel.toggle(userId, Number(postId));
        return res.status(SUCCESS_CODE).send({ bookMark: bookMark });
    }

}