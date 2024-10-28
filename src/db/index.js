import mongoose  from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`\nMongoDB connected  -- ${connectionInstance.connection.host}`);
        console.log("MongoDB running on port : ",process.env.PORT)
        console.log("This is testing");
    } catch (error) {
        console.log("Error", error);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    await mongoose.disconnect();
};

export {connectDB, disconnectDB}