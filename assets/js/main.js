window.BTM = window.BTM || {};

/* -----------------------------
   DEPLOYMENT HISTORY
----------------------------- */

window.BTM.getDeployments = function () {
  try {
    return JSON.parse(
      localStorage.getItem("btm_deployments") || "[]"
    );
  } catch {
    return [];
  }
};

window.BTM.saveDeployment = function (deployment) {
  const items = window.BTM.getDeployments();

  items.unshift(deployment);

  localStorage.setItem(
    "btm_deployments",
    JSON.stringify(items.slice(0, 10))
  );
};

window.BTM.escapeHtml = function (value) {
  const div = document.createElement("div");

  div.textContent = String(value ?? "");

  return div.innerHTML;
};

window.BTM.renderDeployments = function () {
  const list =
    document.getElementById("recentDeploymentsList");

  if (!list) {
    return;
  }

  const items =
    window.BTM.getDeployments();

  if (!items.length) {
    list.innerHTML =
      '<p class="text-sm text-slate-500">' +
      'No deployments recorded in this browser yet.' +
      "</p>";

    return;
  }

  list.innerHTML = items
    .map((deployment) => {
      return `
        <div class="deploy-row">
          <div>
            <strong>
              ${window.BTM.escapeHtml(deployment.name)}
            </strong>

            <span class="text-pink-300 font-mono">
              $${window.BTM.escapeHtml(deployment.symbol)}
            </span>

            <div class="text-xs text-slate-500 mt-1">
              ${new Date(
                deployment.createdAt
              ).toLocaleString()}
            </div>
          </div>

          <a
            href="${window.BTM_CONFIG.explorerUrl}/address/${encodeURIComponent(
              deployment.address
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            BaseScan ↗
          </a>
        </div>
      `;
    })
    .join("");
};


/* -----------------------------
   PAGE EVENTS
----------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "BaseTokenMaker main.js loaded"
    );

    const connectButton =
      document.getElementById(
        "connectWallet"
      );

    const walletStatus =
      document.getElementById(
        "walletStatus"
      );

    const generatorSection =
      document.getElementById(
        "generatorSection"
      );

    const createTokenButton =
      document.getElementById(
        "createTokenBtn"
      );

    const generateMemeButton =
      document.getElementById(
        "generateMemeBtn"
      );

    const autofillButton =
      document.getElementById(
        "autofillBtn"
      );


    /* -----------------------------
       CONNECT WALLET
    ----------------------------- */

    if (connectButton) {

      connectButton.addEventListener(
        "click",
        async () => {

          try {

            connectButton.disabled = true;

            connectButton.textContent =
              "Connecting…";

            const address =
              await window.BTM.connectWallet();

            if (!address) {
              return;
            }

            walletStatus.textContent =
              "Connected to Base: " +
              address;

            generatorSection.classList.remove(
              "hidden"
            );

            connectButton.textContent =
              address.slice(0, 6) +
              "…" +
              address.slice(-4);

          } catch (error) {

            console.error(error);

            alert(
              error?.message ||
              "Could not connect wallet."
            );

            connectButton.textContent =
              "Connect Wallet";

          } finally {

            connectButton.disabled = false;

          }

        }
      );

    }


    /* -----------------------------
       CREATE TOKEN
    ----------------------------- */

    if (createTokenButton) {

      createTokenButton.addEventListener(
        "click",
        () => {

          if (
            typeof window.BTM.createToken !==
            "function"
          ) {

            alert(
              "Token generator is not ready."
            );

            return;
          }

          window.BTM.createToken();

        }
      );

    }


    /* -----------------------------
       GENERATE MEME IDEA
    ----------------------------- */

    if (generateMemeButton) {

      generateMemeButton.addEventListener(
        "click",
        () => {

          if (
            typeof window.BTM.generateMeme !==
            "function"
          ) {

            alert(
              "Idea generator is not ready."
            );

            return;
          }

          window.BTM.generateMeme();

        }
      );

    }


    /* -----------------------------
       AUTOFILL TOKEN GENERATOR
    ----------------------------- */

    if (autofillButton) {

      autofillButton.addEventListener(
        "click",
        () => {

          const memeName =
            document
              .getElementById(
                "memeNameResult"
              )
              ?.textContent
              ?.trim();

          const memeTicker =
            document
              .getElementById(
                "memeTickerResult"
              )
              ?.textContent
              ?.replace("$", "")
              ?.trim()
              ?.toUpperCase();

          const tokenName =
            document.getElementById(
              "tokenName"
            );

          const tokenSymbol =
            document.getElementById(
              "tokenSymbol"
            );

          const generator =
            document.getElementById(
              "generator"
            );


          if (
            !memeName ||
            !memeTicker
          ) {

            autofillButton.textContent =
              "Generate an idea first";

            setTimeout(() => {

              autofillButton.textContent =
                "Autofill Token Generator";

            }, 1800);

            return;
          }


          if (
            !tokenName ||
            !tokenSymbol
          ) {

            autofillButton.textContent =
              "Token fields not found";

            setTimeout(() => {

              autofillButton.textContent =
                "Autofill Token Generator";

            }, 1800);

            return;
          }


          /* Fill Token Generator */

          tokenName.value =
            memeName;

          tokenSymbol.value =
            memeTicker;


          tokenName.dispatchEvent(
            new Event(
              "input",
              {
                bubbles: true
              }
            )
          );

          tokenSymbol.dispatchEvent(
            new Event(
              "input",
              {
                bubbles: true
              }
            )
          );


          /* Clean success feedback */

          autofillButton.textContent =
            "✓ Added to Token Generator";

          autofillButton.disabled = true;


          /* Move user to generator */

          if (generator) {

            generator.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }


          /* Focus first field */

          setTimeout(() => {

            tokenName.focus();

          }, 500);


          /* Restore button */

          setTimeout(() => {

            autofillButton.textContent =
              "Autofill Token Generator";

            autofillButton.disabled = false;

          }, 2200);

        }
      );

    }


    /* -----------------------------
       DEPLOYMENT LIST
    ----------------------------- */

    window.BTM.renderDeployments();

  }
);