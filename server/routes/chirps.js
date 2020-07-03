const express = require("express"),
    chirpStore = require("../chirpstore"),
    router = express.Router();

router.get("/", (req, res) => {
    res.send(chirpStore.GetChirps())
});

router.get("/:id", (req, res) => {
    res.send(chirpStore.GetChirp(req.params.id));
});

router.post("/", (req, res) => {
    let chirpObj = {
        username: req.body.username,
        message: req.body.message
    };
    chirpStore.CreateChirp(chirpObj);

    res.sendStatus(200);
});

router.put("/:id", (req, res) => {
    let chirpObj = {
        username: req.body.username,
        message: req.body.message
    };
    chirpStore.UpdateChirp(req.params.id, chirpObj);

    res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
    chirpStore.DeleteChirp(req.params.id);

    res.send(`chirp ${req.params.id} was deleted`);
});

module.exports = router;