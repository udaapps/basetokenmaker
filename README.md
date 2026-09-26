# BaseTokenMaker Refactor v1

This package separates the original single-file site into maintainable HTML, CSS and JavaScript files.

## Structure
- `index.html` — homepage/UI
- `assets/css/styles.css` — custom styles
- `assets/js/config.js` — Base network, platform fee and owner wallet config
- `assets/js/contract.js` — ERC-20 ABI and bytecode copied from the original file
- `assets/js/wallet.js` — wallet connection/network switching
- `assets/js/token.js` — platform fee + token deployment flow
- `assets/js/meme.js` — meme idea generator
- `assets/js/main.js` — UI wiring and local recent-deployments list
- `security.html`, `faq.html`, `terms.html`, `privacy.html`, `risk-disclaimer.html` — trust/legal starter pages

## Important fixes
1. Fake static “Live Recent Deployments” entries were removed. Only deployments made in the current browser are listed.
2. The old locker payment button was disabled because the original code charged 0.003 ETH but did not actually transfer/escrow tokens into a locking smart contract.
3. Token deployment now shows direct BaseScan contract and transaction links.
4. Fees and wallet security wording are clearer.

## Important remaining issue
The current token flow charges the 0.005 ETH platform fee first and then starts a separate deployment transaction. If deployment fails after the fee confirms, the platform fee is not automatically refunded. A future production version should ideally use an on-chain factory contract that charges the fee and deploys atomically in one transaction.

## Run locally
Because this is a static site, you can serve the folder with any static web server. For example, VS Code Live Server works well.

## Before replacing the live site
Test on a non-production environment first. Do not send real ETH until you have reviewed the fee recipient and deployment behavior.
