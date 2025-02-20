import express from "express";
import dotenv from "dotenv";

const app = express();

//config dotenv
dotenv.config();
const PORT = process.env.PORT;

//express middleware

app.use(express.json());

//landing page route for testing

app.use("/", (req, res) => {
  res.json({ Status: "Running" });
});

// server

app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});
