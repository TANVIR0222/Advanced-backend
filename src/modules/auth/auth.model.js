import bcrypt from "bcryptjs";
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true ,
        minlength : 3 ,
        maxlength : 50 ,
        require : [true , "Name is require"]
    },
    email : {
        type : String ,
        trim : true ,
        unique: true,
        require : [true , "Name is require"],
        lowercase : true
    },
    password : {
        type : String ,
        require : [true , "Password is require"],
        minlength : 8,
        select : false
    },
    role:{
        type : String ,
        enum: ["customer" , "seller" , "admin"],
        default : "customer"

    },
    isVerified : {
        type : boolean,
        default : false
    },
    verificationsToken : {type : String , select : false},
    refreshToken : {type : String , select : false},
    resetPasswordToken : {type : String , select : false},
    resetPasswordExpires : {type : String , select : false},
},{timestamps : true})


userSchema.pre('save', async function() {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password , 12)
});

userSchema.methods.comparePassword =  async function (clearTextPassword) {
   return  bcrypt.compare(clearTextPassword , this.password)
}


const User = mongoose.model('User' , userSchema)
export default User