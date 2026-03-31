import crypto from "crypto";
import verifyEmail from "../../common/config/email.js";
import ApiError from "../../common/utils/api-error.js";
import verifyEmailTemplate from "../../common/utils/email.template.js";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";


const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex")

const register = async({name , email , password , role}) =>{
    //do user register 

    console.log(email);
    


    const existing = User.findOne({email})
    // if(existing) throw ApiError.conflict("Email All ready exist")
    console.log(existing)
    
    const {rowToken , hashedToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role ,
        verificationsToken : hashedToken
    })

    console.log(user);
    
    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${user?._id}`;


    // TODO send an email to user with token with : rowToken 
    await verifyEmail({
        sendTo: email,
        subject: "Verify email from binkeyit",
        html: verifyEmailTemplate({
          name: `${name}`,
          url: VerifyEmailUrl,
        }),
      })

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


    // check password 
    const isMatchPass = await user.comparePassword(password)
    if(!isMatchPass) throw ApiError.unauthorize("Invalid email or password")
    


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
    
    if(user.refreshToken !== hashToken(token)) throw ApiError.unauthorize(" invalid refresh token");

    const accessToken = generateAccessToken({id : user._id , role : user?.role});

    const refreshToken = generateRefreshToken({id : user?._id})

    user.refreshToken = hashToken(refreshToken)

    //If you pass { validateBeforeSave: false }, Mongoose forcibly saves the data to the database without any checking or validation.
    await User.save({validateBeforeSave : false})

    const userObject = user.ToObjectId()
    delete userObject.password
    delete userObject.refreshToken

    return {accessToken}

}

const forgotPassword = async({email}) => {

    const user = await User.findOne({email})
    if(!user) throw ApiError.notFound(" User Not found")

    const {rowToken , hashedToken} = generateResetToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.save();

    // TODO send an email to user with token with : rowToken
    

}


const logout = async(userId) => {
    
    await User.findByIdAndUpdate(userId,{refreshToken : null})

}

export { forgotPassword, login, logout, refresh, register };
//#ChaiAuthProMax