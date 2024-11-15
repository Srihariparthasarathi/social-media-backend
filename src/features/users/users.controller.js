import jwt from "jsonwebtoken";
import UserModel from "./users.model.js";
import config  from "../../../config.js";


const USER_CREATED_STATUS_CODE = 201;
const SUCCESSFUL_LOGIN_STATUS_CODE = 200;

export default class UserController{

    signin(req, res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password);

        var token = jwt.sign({ userId : user.id, email : user.email },
             config.jwtSecret,
            {expiresIn: '1h'});

        res.status(SUCCESSFUL_LOGIN_STATUS_CODE).json({token: token});

    }

    signup(req, res){
        const {username, email, password} = req.body;
        const user = UserModel.addUser(username, email, password);
        res.status(USER_CREATED_STATUS_CODE).json({userId: user.id, username: user.username, email: user.email})
    }
}