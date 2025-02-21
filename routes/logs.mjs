//get routes to get all the logs (/logs) // only display selected details through the front end

// get by id /details/id to get a detail on specific log, display all the information

// post to add a log //on add page /logs/add

// patch to edit the logs // on edit page /logs/edit

//delete by id /logs/:id  // option to delete will be on the landing/homepage

//toogle favorite // remove from favorite available in the favorite page
import express from "express";
import Logs from "../modals/LogSchema.mjs";
// import mongoose from "mongoose";
import { check, validationResult } from "express-validator";

//define the router
const router = express.Router();

//route to get all the logs in the database
router.get("/logs", async (req, res) => {
  try {
    let result = await Logs.find().sort({ log_id: 1 });
    res.status(200).json({ logs: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch data due to server error" });
  }
});
