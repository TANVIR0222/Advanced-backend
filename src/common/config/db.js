import mongoose from "mongoose";
import { DB_NAME } from "../constants/http.status.codes.js";


export const connectDB = async () => {
    try {
        
        const connectionInstance  = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        console.log(`MongoDB Connected !! DB Host ${connectionInstance.connection.host}`);
        // console.log(connectionInstance)
    } catch (error) {
        console.log('Mongodb connection Fail : ', error);
        process.exit(1)
    }
}
export default connectDB;