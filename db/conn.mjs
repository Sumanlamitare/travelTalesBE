import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// console.log("Attempting to connect");

//store uri
const URI = process.env.MONGO_URI;
// console.log(URI);

async function db() {
  try {
    await mongoose.connect(URI, {
      //   useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB " + mongoose.connection.name);
});

export default db;
