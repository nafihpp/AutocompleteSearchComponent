const express = require("express");
const app = express();
const moviesList = require("./Movies.json");
const PORT = 5000;

app.use(express.json());

app.get("/api/movies", (req, res) => {
    res.status(200).json(moviesList);
});

app.listen(PORT, () => {
    console.log(`listening to server ${PORT}`);
});
