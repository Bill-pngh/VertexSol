document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded Successfully!");

    // Elements
    const bundleButton = document.querySelector(".bundle-button");
    const portfolioButton = document.querySelector(".portfolio-btn");
    const tradeHistoryButton = document.querySelector(".trade-btn");
    const settingsButton = document.querySelector(".settings-btn");
    const backButtons = document.querySelectorAll(".back-btn");

    // Pages
    const portfolioPage = document.getElementById("portfolioPage");
    const tradeHistoryPage = document.getElementById("tradeHistoryPage");
    const settingsPage = document.getElementById("settingsPage");

    // Popups
    const walletPopup = document.getElementById("walletPopup");
    const connectWalletBtn = document.querySelector(".connect-wallet-btn");
    const closeWalletPopup = document.querySelector(".close-btn");
    const walletSubmit = document.querySelector(".wallet-submit");

    // Show Pages
    function showPage(page) {
        portfolioPage.style.display = "none";
        tradeHistoryPage.style.display = "none";
        settingsPage.style.display = "none";
        page.style.display = "block";
    }

    // Button Click Events
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

    // Back Buttons
    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            portfolioPage.style.display = "none";
            tradeHistoryPage.style.display = "none";
            settingsPage.style.display = "none";
        });
    });

    // Wallet Popup
    connectWalletBtn.addEventListener("click", () => walletPopup.classList.add("show"));
    closeWalletPopup.addEventListener("click", () => walletPopup.classList.remove("show"));

    // Wallet Submit
    walletSubmit.addEventListener("click", () => {
        alert("✅ Wallet Connected!");
        walletPopup.classList.remove("show");
    });
});
