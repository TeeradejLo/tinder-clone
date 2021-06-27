import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

//App Config
const app = express();
const port = process.env.PORT || 8001;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
/* MongoDB.com => name: admin, password: BWnPtMg4a5dFc4B */
const connection_url = "mongodb+srv://admin:BWnPtMg4a5dFc4B@cluster0.uobpe.mongodb.net/tinderdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World!"));

//push information to db
app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

//get information from db
app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

//Listener
app.listen(port, () => console.log(`listening on localhost ${port}`));

