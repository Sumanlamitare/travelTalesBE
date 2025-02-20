import mongoose from "mongoose";
import dotenv from "dotenv";

export default db = mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("Connected to the Database", mongoose.connection.name);
