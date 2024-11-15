import ApplicationError from "../../middlewares/applicationError.middleware.js";

const INVALID_CREDENTIALS_MESSAGE = "Invalid credentials. Please check your email and password and try again.";
const INVALID_USERID_MESSAGE = "Invalid user ID. Please check the user ID and try again.";
const UNAUTHORIZED_STATUS_CODE = 401;
const INVALID_USERID_STATUS_CODE = 400;

export default class UserModel{
    constructor(id, username, email, password){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static getAll(){
        return usersList;
    }

    static getById(userId){
        let user = usersList.find((user)=> user.id == userId);
        if(!user) throw new ApplicationError(INVALID_USERID_MESSAGE, INVALID_USERID_STATUS_CODE);
        return user;
    }

    static checkEmail(email){
        let user = usersList.find((user)=> user.email == email);
        if(!user) return false;
        return true;
    }

    static isValidUser(email, password){
        const user = usersList.find((user)=> user.email == email && user.password == password);
        if(!user) throw new ApplicationError(INVALID_CREDENTIALS_MESSAGE, UNAUTHORIZED_STATUS_CODE);
        return user;
    }

    static addUser(username, email, password){
        let index = (usersList.length > 0) ? usersList[usersList.length-1].id + 1 : 1;
        const newUser = new UserModel(index, username, email, password);
        usersList.push(newUser);
        return newUser;
    }
}


const usersList = [
    new UserModel(1, "user", "user@example.com", "StrongPassword@123"),
]