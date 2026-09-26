window.BTM = window.BTM || {};
const BTM_MEME_NAMES = ["TurboPepe","BaseCat","MoonDoge","CyberFrog","GigaChad Base","SpaceShiba","NeonAI","BasedWojak"];
const BTM_MEME_TICKERS = ["TPEPE","BCAT","MDOGE","CFROG","GIGA","SSHIBA","NEON","WOJAK"];
const BTM_MEME_LORES = [
  "Born from a late-night Base experiment and powered by internet humor.",
  "A playful mascot concept for the Base community.",
  "A fictional meme token idea built around online culture.",
  "An AI-inspired concept with a simple community-first story."
];
const BTM_MEME_LOGOS = ["🐸","🐱","🐶","🤖","💪","🚀","⚡","🧠"];

window.BTM.generateMeme = function () {
  const i = Math.floor(Math.random() * BTM_MEME_NAMES.length);
  const lore = BTM_MEME_LORES[Math.floor(Math.random() * BTM_MEME_LORES.length)];
  const name = BTM_MEME_NAMES[i], ticker = BTM_MEME_TICKERS[i], logo = BTM_MEME_LOGOS[i];
  document.getElementById("memeNameResult").textContent = name;
  document.getElementById("memeTickerResult").textContent = "$" + ticker;
  document.getElementById("memeLoreResult").textContent = lore;
  document.getElementById("memeLogoContainer").textContent = logo;
  document.getElementById("memeOutput").classList.remove("hidden");
  const tweet = encodeURIComponent(`I generated a token idea on BaseTokenMaker 🚀

Name: ${name} ($${ticker})

https://www.basetokenmaker.online`);
  document.getElementById("shareTwitterBtn").href = `https://twitter.com/intent/tweet?text=${tweet}`;
};

window.BTM.autofillMeme = function () {
  document.getElementById("tokenName").value = document.getElementById("memeNameResult").textContent;
  document.getElementById("tokenSymbol").value = document.getElementById("memeTickerResult").textContent.replace("$", "");
  document.getElementById("generator").scrollIntoView({ behavior: "smooth" });
};
