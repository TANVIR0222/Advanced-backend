import ApiResponse from '../../common/utils/api-response'
import * as AuthServices from './auth.service'

const register = async (req ,res ) => {
    const user = await AuthServices.register(req.body)
    ApiResponse.create(res , "User register Success full" , user)
}

export { register }
