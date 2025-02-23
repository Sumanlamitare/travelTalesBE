import mongoose from "mongoose";

//create the schema for the logs modal
//log id - auto generated
// Location visited  string
//Country located in (incase i want to integreate countries api to display countries visited by user and yet to visit) string
//date (optional) for now
//rating - number
//isFavorite - boolean (optional, false by default)
//additional comments - user can describe their overall experiences, things they liked and did not like, things other users can be aware of if they want to visit (user login feature in the future and other users are able to see if different logs from different user. Not implemented in this application)
//date created - auto generated

const LogSchema = new mongoose.Schema(
  {
    log_id: Number,
    location: { type: String, required: true },
    country: { type: String, required: true },
    date_visited: { type: String, default: "N/A" },
    rating: { type: Number, required: true },
    isFavorite: { type: Boolean, default: false },
    additional_comments: {
      type: String,
      default: "Additional details not provided",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
LogSchema.index({ log_id: 1 }, { unique: true });

const Logs = mongoose.model("Logs", LogSchema);

export default Logs;
