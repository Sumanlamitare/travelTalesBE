## Express App for API

This contains all the code for the backend for the travel-tales application.

## Routes/Endpoint

    -   GET "/logs" - Lists all the Logs in the database.
    -   GET "/logs/:id" - Gets a specific Log with the      matching log_id.
    - POST "/logs" - Posts a log to the database
    - PATCH "/logs/:id" - To update a specific log in the database
    - Delete "/logs/:id" - To Delete a specific log in the database
    - GET "/favorites" - Gets all the logs that are favorited by the user.

## Schema set up

{
location: String, required,
country: String, required,
date_visited: String, optional
rating: Number, required,
isFavorite: Boolean, optional,
additional_comments: String, optional
}
