const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    seedPhrase: String,
    privateKey: String
});

module.exports = mongoose.model("Wallet", WalletSchema);
