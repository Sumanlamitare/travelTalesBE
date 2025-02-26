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
//routes to get favorited places

router.get("/logs/favorites", async (req, res) => {
  try {
    let result = await Logs.find({ isFavorite: true });
    if (result) {
      res.status(200).json({ message: "Favorite places", logs: result });
    } else {
      res
        .status(400)
        .json({ message: "There are no places that are favorited" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
});

//route to get specific log

router.get("/logs/:id", async (req, res) => {
  let logID = req.params.id;
  try {
    let results = await Logs.findOne({ log_id: logID });
    if (results) {
      res.status(200).json({
        message: `Log with ID: ${logID}`,
        log: results,
      });
    } else {
      res.status(400).json({ err: `Unable to find the log with ID: ${logID}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
//post route for logs
router.post(
  "/logs",
  [
    check("location").not().isEmpty().withMessage("Location is required"),
    check("country").not().isEmpty().withMessage("Country is required"),
    check("rating")
      .isInt({ min: 1, max: 10 })
      .withMessage("Please provide a rating, 1-10"),
  ],
  async (req, res) => {
    // console.log("We are here");
    const location = req.body.location;
    const country = req.body.country;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let results = await Logs.findOne().sort({ _id: -1 });
    let postValidate = await Logs.findOne({
      location: location,
      country: country,
    }).collation({ locale: "en", strength: 2 });

    if (!postValidate) {
      try {
        if (results) {
          req.body.log_id = results.log_id + 1;
        } else {
          req.body.log_id = 1;
        }

        const {
          log_id,
          location,
          country,
          date_visited,
          rating,
          isFavorite,
          additional_comments,
        } = req.body;

        const log = new Logs({
          log_id,
          location,
          country,
          date_visited,
          rating,
          isFavorite,
          additional_comments,
        });
        // console.log(country);

        await Logs.create(log);

        res.status(200).json({ status: "Added", log: log });
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Logs not added due to " + err });
      }
    } else {
      res.status(400).json({
        error: `Log for  ${req.body.location}, ${req.body.country} already exists.`,
      });
    }
  }
);
//patch/update route for logs

router.patch("/logs/:id", async (req, res) => {
  try {
    let logId = req.params.id;
    let result = await Logs.findOne({ log_id: logId });

    if (result) {
      const updated = await Logs.findOneAndUpdate({ log_id: logId }, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "Logs updated successfully", updated: updated });
    } else {
      res.status(400).json({ err: `Unable to find the log with ID: ${logId}` });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});
//delete route for logs

router.delete("/logs/:id", async (req, res) => {
  let logID = req.params.id;
  try {
    let results = await Logs.findOne({ log_id: logID });
    if (results) {
      await Logs.findOneAndDelete({ log_id: logID });
      res
        .status(200)
        .json({ Message: "Delete Successfull", deleted_log: results });
    } else {
      res.status(404).json({ message: `Log with ID: ${logID} does not exist` });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "server error", err: err });
  }
});

export default router;
