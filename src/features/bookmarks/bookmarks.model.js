

export default class BookMarksModel{

    constructor(id, userId, postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static ckeckStatus(userId, postId){
        let isBookMark = false;
        const bookMark = bookMarksList.find((bookMark) => bookMark.postId == postId && bookMark.userId == userId);
        if(bookMark) isBookMark = true;
        return{ isBookMark: isBookMark, postId: postId };
        
    }

    static toggle(userId, postId){

        const bookMarkIndex = bookMarksList.findIndex((bookMark) => bookMark.postId == postId && bookMark.userId == userId);
    
        let isBookMark = false;
        
        if(bookMarkIndex == -1){
            let newId = (bookMarksList.length > 0) ? bookMarksList[bookMarksList.length-1].id + 1 : 1;
            const newBookMark = new BookMarksModel(newId, userId, postId);
            bookMarksList.push(newBookMark);
            isBookMark = true;
        }else{
            bookMarksList.splice(bookMarkIndex, 1);
        }

        return{ isBookMark: isBookMark, postId: postId };

    }
}

const bookMarksList = [
    new BookMarksModel(1, 1, 1),
    new BookMarksModel(1, 1, 2),
]