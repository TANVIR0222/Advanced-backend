import { HTTP_STATUS } from "../constants/http.status.codes.js";

class ApiResponse {

    // static: This keyword means that you don't need to create a new object of the class (like new ApiResponse()) to use this method. You can use it directly by writing ApiResponse.ok().
    static ok(res , message , status , data = null){
        return res.status(status).json({
            success : true,
            message,
            data
        })
    }
    static create(res , status , message , data = null){
        return res.status(status).json({
            success : true,
            message,
            data
        })
    }

    static noResponse(res , status = HTTP_STATUS.NO_CONTENT , message , data = null){
        return res.status(status).send();
    }


}

export default ApiResponse