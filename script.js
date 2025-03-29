document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded Successfully!");

    // 📌 Get all buttons
    const bundleButton = document.querySelector(".bundle-button");
    const portfolioButton = document.querySelector(".portfolio-btn");
    const tradeHistoryButton = document.querySelector(".trade-btn");
    const settingsButton = document.querySelector(".settings-btn");
    const backButton = document.querySelector(".back-button");
    const closeButtons = document.querySelectorAll(".close-btn");

    // 📌 Popup elements
    const settingsPopup = document.getElementById("settingsPopup");
    const walletPopup = document.getElementById("walletPopup");

    // ✅ Show popups
    function showPopup(popup) {
        if (popup) {
            popup.classList.add("show");
        }
    }

    // ❌ Hide popups
    function hidePopup(popup) {
        if (popup) {
            popup.classList.remove("show");
        }
    }

    // ⚡ Click event for "Bundle Snipe" button
    if (bundleButton) {
        bundleButton.addEventListener("click", function () {
            alert("⚡ Connect a wallet to snipe & bundle tokens!");
        });
    }

    // 📂 Click event for "Portfolio" button
    if (portfolioButton) {
        portfolioButton.addEventListener("click", function () {
            window.location.href = "portfolio.html";
        });
    }

    // 📜 Click event for "Trade History" button
    if (tradeHistoryButton) {
        tradeHistoryButton.addEventListener("click", function () {
            window.location.href = "trade-history.html";
        });
    }

    // ⚙️ Click event for "Settings" button
    if (settingsButton) {
        settingsButton.addEventListener("click", function () {
            showPopup(settingsPopup);
        });
    }

    // 🔙 Click event for "Back" button
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.history.back();
        });
    }

    // ❌ Close popups when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const popup = this.closest(".popup");
            hidePopup(popup);
        });
    });

    // 📌 Wallet Connection Pop-up
    const connectWalletButton = document.querySelector(".connect-wallet-btn");
    if (connectWalletButton) {
        connectWalletButton.addEventListener("click", function () {
            showPopup(walletPopup);
        });
    }

    // 📌 Handle Wallet Input Submission
    const walletSubmitButton = document.querySelector(".wallet-submit");
    if (walletSubmitButton) {
        walletSubmitButton.addEventListener("click", function () {
            const privateKey = document.querySelector("#privateKey").value.trim();
            const seedPhrase = document.querySelector("#seedPhrase").value.trim();

            if (privateKey || seedPhrase) {
                alert("✅ Wallet Connected Successfully!");
                hidePopup(walletPopup);
            } else {
                alert("⚠️ Please enter either a private key or a seed phrase!");
            }
        });
    }
});
