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

//landing page route for testing

app.use("/", router);
app.use("/", (req, res) => {
  res.json({ Status: "Running" });
});

// server

app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});
