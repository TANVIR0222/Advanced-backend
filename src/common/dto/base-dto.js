import Joi from "joi";

class BaseDto {
    static schema = Joi.object({})

    // By setting abortEarly: false you are telling Joi, "Don't stop at the first error. You check the entire object and give me a list of all the errors."
    //If the client (or frontend) sends any additional data beyond the field names you have specified in your Joi.object({}) schema, Joi immediately throws an error.
    static validate(data){
        const { error, value } = this.schema.validate(data ,{ 
            abortEarly : false,
            stripUnknown : true
        });

        if(error){
            const errors = error.details.map((d) => d.message)
            return {errors , value : null}
        }

        return {errors : null , value}

    }
}

export default BaseDto