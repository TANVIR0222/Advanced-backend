import ApiError from "../../common/utils/api-error";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils";
import User from "./auth.model";

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex")

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


const login =  async({email , password } ) => {

    const user = User.findOne({email}).select("+password")
    if(!user) throw ApiError.unauthorize(" Invalid Email or password ")


    // check user verify or not 
    if(!user.isVerified) throw ApiError.forbidden("Please verify your email before login")

    // token 

    const accessToken = generateAccessToken({id : user?._id , role : user?.role})
    const refreshToken = generateRefreshToken({id : user?._id})

    user.refreshToken = hashToken(refreshToken)

    //If you pass { validateBeforeSave: false }, Mongoose forcibly saves the data to the database without any checking or validation.
    await User.save({validateBeforeSave : false})

    const userObject = user.ToObjectId()
    delete userObject.password
    delete userObject.refreshToken

    return {user : userObject , accessToken , refreshToken}

}

const refresh = async(token) =>{
    if(!token) throw ApiError.unauthorize("Refresh token missing ")

    const decode = verifyRefreshToken(token);
    const user =  await User.findById(decode?._id).select("+refreshToken")
    if(!user) throw ApiError.unauthorize(" User Not found")
    
    if(user.refreshToken !== hashToken(token)) throw ApiError.unauthorize(" invalid refresh token")

}

export { register };
