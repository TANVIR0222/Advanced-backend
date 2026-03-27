import ApiError from "../../common/utils/api-error";
import { generateResetToken } from "../../common/utils/jwt.utils";
import User from "./auth.model";

const register = async({name , email , password , role}) =>{
    //do user register 


    const existing = User.findOne({email})
    if(existing) throw ApiError.conflict("Email All ready exist")
    
    const {rowToken , hashedToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role ,
        verificationsToken : hashedToken
    })

    // TODO send an email to user with token with : rowToken 

    // delete any value 
    // const modifyUserObject = user.toObject()
    // delete modifyUserObject._id
    // delete modifyUserObject.role
    //return modifyUserObject

}

export { register };
