require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Wallet Schema
const walletSchema = new mongoose.Schema({
    userId: String, // Telegram User ID (or another identifier)
    walletKey: String,
    seedPhrase: String
});
const Wallet = mongoose.model('Wallet', walletSchema);

// User Settings Schema (Optional for Dark Mode)
const userSettingsSchema = new mongoose.Schema({
    userId: String,
    darkMode: Boolean
});
const UserSettings = mongoose.model('UserSettings', userSettingsSchema);

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
    userId: String,
    tokens: { type: Array, default: [] } // Array of tokens
});
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Trade History Schema
const tradeHistorySchema = new mongoose.Schema({
    userId: String,
    trades: { type: Array, default: [] } // Array of trade records
});
const TradeHistory = mongoose.model('TradeHistory', tradeHistorySchema);

// 🟢 Save Wallet
app.post('/save-wallet', async (req, res) => {
    const { userId, walletKey, seedPhrase } = req.body;

    if (!walletKey && !seedPhrase) {
        return res.status(400).json({ message: "Wallet key or seed phrase required." });
    }

    try {
        const wallet = new Wallet({ userId, walletKey, seedPhrase });
        await wallet.save();
        res.json({ message: "Wallet saved successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Database error." });
    }
});

// 🔴 Disconnect Wallet
app.post('/disconnect-wallet', async (req, res) => {
    const { userId } = req.body;
    try {
        await Wallet.deleteOne({ userId });
        res.json({ message: "Wallet disconnected." });
    } catch (err) {
        res.status(500).json({ message: "Database error." });
    }
});

// 💰 Get User Balance (For now, return 0.000 SOL)
app.get('/balance/:userId', async (req, res) => {
    res.json({ balance: "0.000 SOL" });
});

// 📂 Get Portfolio
app.get('/portfolio/:userId', async (req, res) => {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId }) || { tokens: [] };
    res.json({ portfolio });
});

// 📜 Get Trade History
app.get('/trade-history/:userId', async (req, res) => {
    const tradeHistory = await TradeHistory.findOne({ userId: req.params.userId }) || { trades: [] };
    res.json({ tradeHistory });
});

// 🌙 Toggle Dark Mode
app.post('/toggle-dark-mode', async (req, res) => {
    const { userId, darkMode } = req.body;
    try {
        let userSetting = await UserSettings.findOne({ userId });
        if (userSetting) {
            userSetting.darkMode = darkMode;
            await userSetting.save();
        } else {
            await new UserSettings({ userId, darkMode }).save();
        }
        res.json({ message: "Theme updated." });
    } catch (err) {
        res.status(500).json({ message: "Database error." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));