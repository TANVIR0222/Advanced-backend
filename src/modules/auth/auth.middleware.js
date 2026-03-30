import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils";
import User from "./auth.model";

const authenticate = async(req , res , next) => {

    let token;
    if(req.header.authorization?.startWith("Bearer")){
        token = eq.header.authorization.split(" ")[1];
    }

    if(!token) throw ApiError.unauthorize("No Authenticate")
    
    // token verify 
    const decode =  verifyAccessToken(token)
    const user = await User.findOne(decode.id)

    if(!user) throw ApiError.unauthorize("Not valid user ")
    
    req.user = {
        id : user?._id,
        email : user?.email,
        role : user?.role,
        name : user?.name
    }

    next();

}

const authorize = async(...role) => {
    return (req , res , next) => {

        if(!role.includes(req.user?.role)){
            throw ApiError.forbidden("You do not have permission bag shala")
        }

        next();

    }
}

export { authenticate, authorize };
