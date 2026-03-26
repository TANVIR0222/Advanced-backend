import mongoose from 'mongoose';


const connectDB = async() =>{
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');
    //TODO log conn and view all info 
    console.log(`MongoBD is Connect ${conn.connection.host}`);
}

export default connectDB
