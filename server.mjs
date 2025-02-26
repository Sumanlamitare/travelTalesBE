import express from "express";
import dotenv from "dotenv";
import db from "./db/conn.mjs";
import router from "../travelTalesBE/routes/logs.mjs";
import cors from "cors";

const app = express();

//config dotenv
dotenv.config();
const PORT = process.env.PORT;

//connect to the database
db();

//express middleware

app.use(express.json());
app.use(cors());

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

//landing page route for testing

app.use("/", router);
app.use("/", (req, res) => {
  res.json({ Status: "Running" });
});

// server

app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});
