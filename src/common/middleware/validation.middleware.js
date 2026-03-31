import ApiError from "../utils/api-error.js";

const validate = (DtoClass) => {
    return (req , res , next) => {
        const {errors , value } = DtoClass.validate(req.body);
        if (errors) {
            throw new ApiError.badRequest(errors)
        }
        // filer data send 
        req.body = value;
        next();
    }
}

export default validate;