import bcrypt from "bcryptjs"; // bcryptjs is perfect here!
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
        required: [true, "Name is required"] // Fixed 'required'
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"], // Fixed copy-paste error
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"], // Fixed 'required'
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ["customer", "seller", "admin"],
        default: "customer"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationsToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: String, select: false },
}, { timestamps: true });

userSchema.pre('save', async function() {
    if (!this.isModified("password")) return  // Good practice to call next() here
    this.password = await bcrypt.hash(this.password, 12);
    // next(); // Good practice to call next() when done
});

userSchema.methods.comparePassword = async function(clearTextPassword) {
    return bcrypt.compare(clearTextPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;