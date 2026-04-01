import ApiResponse from '../../common/utils/api-response.js';
import * as AuthServices from './auth.service.js';
const register = async (req ,res ) => {
    const user = await AuthServices.register(req.body)
    ApiResponse.create(res , 201 , "User register Success full" , user)
}
const login = async (req ,res ) => {
    const {user ,  accessToken , refreshToken} = await AuthServices.login(req.body)

    res.cookie("refreshToken", refreshToken ,{
        httpOnly : true,
        secure: true ,
        maxAge : 7 * 24 * 60 * 60 * 1000
    })
    

    ApiResponse.ok(res , "Login successFull" , {user , refreshToken})
}

const logout = async (req , res) => {
    await AuthServices.logout(req.user.id)
    res.clearCookie("refreshToken");
    ApiResponse.ok(res , "logout success ")
}

export { login, logout, register };

