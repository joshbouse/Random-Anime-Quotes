import express from 'express';
import axios from 'axios';
const API_URL = "https://api.animechan.io/v1"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "/quotes/random");
        const result = response.data;
        // console.log(result);
        const quote = result.data.content;
        const character = result.data.character.name;
        const anime = result.data.anime.name;
        res.render("index.ejs", { quote: quote, character: character, anime: anime });
    }
    catch (error) {
        res.render("index.ejs", { error: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});