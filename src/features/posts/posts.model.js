
export default class PostsModel{
    constructor(id, userid, caption, imageurl){
        this.id = id;
        this.userid = userid;
        this.caption = caption;
        this.imageurl = imageurl;
    }
}

const postList = [
    new PostsModel(1, 1, "My first post on this platform!", "http://example.com/image1.jpg"),
    new PostsModel(2, 1, "Had a great day at the beach.", "http://example.com/image2.jpg")
];
