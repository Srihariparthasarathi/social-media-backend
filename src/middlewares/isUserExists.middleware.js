// OM NAMASIVAYA

import UserModel from "../features/users/users.model.js";


export default function isUserExistsMiddleware(req, res, next){
    const userId = req.userId;
    const user = UserModel.getById(userId);
    if(user) next();
}

