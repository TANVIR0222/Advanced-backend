import ApiError from "../utils/api-error";

const validate = (DtoClass) => {
    return (req , res , next) => {
        const {error , value } = DtoClass.validate(req.body);
        if (error) {
            throw new ApiError.badRequest(error)
        }

        req.body = value;

        next();
    }
}