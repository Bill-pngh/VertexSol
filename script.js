document.addEventListener("DOMContentLoaded", function () {
    // 🌟 Elements
    const bundleSnipeBtn = document.querySelector(".bundle-button");
    const portfolioBtn = document.querySelector(".portfolio-btn");
    const tradeBtn = document.querySelector(".trade-btn");
    const settingsBtn = document.querySelector(".settings-btn");
    const backButtons = document.querySelectorAll(".back-btn");
    
    const bundlePopup = document.getElementById("bundleSnipePopup");
    const walletPopup = document.getElementById("walletPopup");
    const closePopups = document.querySelectorAll(".close-popup");

    const connectWalletBtn = document.querySelector(".connect-wallet-btn");
    const disconnectWalletBtn = document.querySelector(".disconnect-wallet");
    const walletSubmitBtn = document.querySelector(".wallet-submit");

    const seedPhraseInput = document.getElementById("seedPhrase");
    const privateKeyInput = document.getElementById("privateKey");
    const walletError = document.getElementById("walletError");

    // 📂 Pages
    const pages = {
        portfolio: document.getElementById("portfolioPage"),
        tradeHistory: document.getElementById("tradeHistoryPage"),
        settings: document.getElementById("settingsPage"),
    };

    // 🔄 Function to Switch Pages
    function showPage(page) {
        Object.values(pages).forEach(p => p.style.display = "none");
        page.style.display = "block";
    }

    // 🔘 Button Event Listeners
    portfolioBtn.addEventListener("click", () => showPage(pages.portfolio));
    tradeBtn.addEventListener("click", () => showPage(pages.tradeHistory));
    settingsBtn.addEventListener("click", () => showPage(pages.settings));

    // 🛑 Back Buttons
    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            Object.values(pages).forEach(p => p.style.display = "none");
        });
    });

    // 🎯 Bundle Snipe Pop-up
    bundleSnipeBtn.addEventListener("click", () => {
        bundlePopup.classList.add("show");
    });

    // 🔑 Wallet Connection Pop-up
    connectWalletBtn.addEventListener("click", () => {
        walletPopup.classList.add("show");
    });

    // ❌ Close Pop-ups
    closePopups.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.classList.remove("show");
        });
    });

    // ✅ Wallet Validation & Storage
    walletSubmitBtn.addEventListener("click", () => {
        const seedPhrase = seedPhraseInput.value.trim();
        const privateKey = privateKeyInput.value.trim();
        walletError.style.display = "none"; // Hide previous error

        // 🔎 Validation
        if (seedPhrase.split(" ").length < 12 && privateKey.length < 30) {
            walletError.textContent = "❌ Invalid Seed Phrase or Private Key!";
            walletError.style.display = "block";
            return;
        }

        // ✅ Store Wallet Details (Without Encryption)
        localStorage.setItem("seed_phrase", seedPhrase);
        localStorage.setItem("private_key", privateKey);

        alert("✅ Wallet Connected Successfully!");
        walletPopup.classList.remove("show");
    });

    // ❌ Disconnect Wallet
    disconnectWalletBtn.addEventListener("click", () => {
        localStorage.removeItem("seed_phrase");
        localStorage.removeItem("private_key");
        alert("🚫 Wallet Disconnected!");
    });
});
