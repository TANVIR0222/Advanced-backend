import HTTP_STATUS from "../constants/httpStatusCodes"

class ApiError extends Error {

    constructor(statusCode , message) {
        super(message)
        this.statusCode = statusCode,
        this.isOperational = true,
        Error.captureStackTrace(this , this.constructor)
    }

    //
    static badRequest(message = "Bad Request"){
        return new ApiError(HTTP_STATUS.BAD_REQUEST , message)
    }
    static conflict(message = "Conflict"){
        return new ApiError(HTTP_STATUS.CONFLICT , message)
    }
    static unauthorize(message = "Conflict"){
        return new ApiError(HTTP_STATUS.UNAUTHORIZED , message)
    }
    static forbidden(message = "Forbidden"){
        return new ApiError(HTTP_STATUS.FORBIDDEN , message)
    }

}

export default ApiError