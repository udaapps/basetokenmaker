window.BTM = window.BTM || {};

const BTM_MEME_NAMES = [
  "TurboPepe",
  "BaseCat",
  "MoonDoge",
  "CyberFrog",
  "GigaChad Base",
  "SpaceShiba",
  "NeonAI",
  "BasedWojak"
];

const BTM_MEME_TICKERS = [
  "TPEPE",
  "BCAT",
  "MDOGE",
  "CFROG",
  "GIGA",
  "SSHIBA",
  "NEON",
  "WOJAK"
];

const BTM_MEME_LORES = [
  "Born from a late-night Base experiment and powered by internet humor.",
  "A playful mascot concept for the Base community.",
  "A fictional meme token idea built around online culture.",
  "An AI-inspired concept with a simple community-first story."
];

const BTM_MEME_LOGOS = [
  "🐸",
  "🐱",
  "🐶",
  "🤖",
  "💪",
  "🚀",
  "⚡",
  "🧠"
];

/*
 * Generate a random meme-token idea.
 */
window.BTM.generateMeme = function () {
  const randomIndex =
    Math.floor(
      Math.random() * BTM_MEME_NAMES.length
    );

  const loreIndex =
    Math.floor(
      Math.random() * BTM_MEME_LORES.length
    );

  const name =
    BTM_MEME_NAMES[randomIndex];

  const ticker =
    BTM_MEME_TICKERS[randomIndex];

  const lore =
    BTM_MEME_LORES[loreIndex];

  const logo =
    BTM_MEME_LOGOS[randomIndex];

  const nameElement =
    document.getElementById(
      "memeNameResult"
    );

  const tickerElement =
    document.getElementById(
      "memeTickerResult"
    );

  const loreElement =
    document.getElementById(
      "memeLoreResult"
    );

  const logoElement =
    document.getElementById(
      "memeLogoContainer"
    );

  const outputElement =
    document.getElementById(
      "memeOutput"
    );

  if (
    !nameElement ||
    !tickerElement ||
    !loreElement ||
    !logoElement ||
    !outputElement
  ) {
    console.error(
      "Meme generator elements were not found."
    );

    alert(
      "Meme generator could not load correctly."
    );

    return;
  }

  nameElement.textContent = name;

  tickerElement.textContent =
    "$" + ticker;

  loreElement.textContent = lore;

  logoElement.textContent = logo;

  outputElement.classList.remove(
    "hidden"
  );

  /*
   * Bring the generated result into view.
   */
  setTimeout(() => {
    outputElement.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 100);

  /*
   * Create Share on X link.
   */
  const tweetText =
    encodeURIComponent(
      `I generated a token idea on BaseTokenMaker 🚀

Name: ${name} ($${ticker})

https://www.basetokenmaker.online`
    );

  const shareButton =
    document.getElementById(
      "shareTwitterBtn"
    );

  if (shareButton) {
    shareButton.href =
      `https://twitter.com/intent/tweet?text=${tweetText}`;
  }
};

/*
 * Copy the generated meme-token idea
 * into the Token Generator.
 */
window.BTM.autofillMeme = function () {
  const nameElement =
    document.getElementById(
      "memeNameResult"
    );

  const tickerElement =
    document.getElementById(
      "memeTickerResult"
    );

  const tokenNameInput =
    document.getElementById(
      "tokenName"
    );

  const tokenSymbolInput =
    document.getElementById(
      "tokenSymbol"
    );

  const generatorSection =
    document.getElementById(
      "generatorSection"
    );

  const generator =
    document.getElementById(
      "generator"
    );

  if (
    !nameElement ||
    !tickerElement ||
    !tokenNameInput ||
    !tokenSymbolInput ||
    !generatorSection ||
    !generator
  ) {
    console.error(
      "Token generator elements were not found."
    );

    alert(
      "Token Generator could not be loaded correctly."
    );

    return;
  }

  const name =
    nameElement.textContent.trim();

  const ticker =
    tickerElement.textContent
      .replace("$", "")
      .trim()
      .toUpperCase();

  if (!name || !ticker) {
    alert(
      "Please generate a token idea first."
    );

    return;
  }

  /*
   * Show Token Generator even when
   * the wallet has not yet been connected.
   */
  generatorSection.classList.remove(
    "hidden"
  );

  /*
   * Copy generated values.
   */
  tokenNameInput.value = name;

  tokenSymbolInput.value = ticker;

  /*
   * Trigger input events in case
   * validation is added later.
   */
  tokenNameInput.dispatchEvent(
    new Event(
      "input",
      { bubbles: true }
    )
  );

  tokenSymbolInput.dispatchEvent(
    new Event(
      "input",
      { bubbles: true }
    )
  );

  /*
   * Move to Token Generator.
   */
  generator.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  /*
   * Highlight the filled fields briefly.
   */
  tokenNameInput.focus();

  setTimeout(() => {
    alert(
      `Added to Token Generator:\n\n` +
      `Name: ${name}\n` +
      `Symbol: ${ticker}`
    );
  }, 400);
};