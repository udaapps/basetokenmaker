window.BTM = window.BTM || {};

window.BTM.createToken = async function () {
  const btn = document.getElementById("createTokenBtn");
  const result = document.getElementById("deployResult");
  const c = window.BTM_CONFIG;
  try {
    if (!window.BTM.signer) throw new Error("Connect your wallet first.");
    const tokenName = document.getElementById("tokenName").value.trim();
    const tokenSymbol = document.getElementById("tokenSymbol").value.trim().toUpperCase();
    if (!tokenName || tokenName.length < 2) throw new Error("Enter a valid token name.");
    if (!/^[A-Z0-9]{1,12}$/.test(tokenSymbol)) throw new Error("Token symbol must be 1–12 letters/numbers.");

    btn.disabled = true;
    btn.textContent = "Confirm platform fee in wallet…";
    const feeTx = await window.BTM.signer.sendTransaction({
      to: c.ownerWallet,
      value: ethers.utils.parseEther(c.platformFeeEth)
    });
    btn.textContent = "Waiting for platform fee…";
    await feeTx.wait();

    btn.textContent = "Confirm token deployment…";
    const factory = new ethers.ContractFactory(window.BTM_CONTRACT.abi, window.BTM_CONTRACT.bytecode, window.BTM.signer);
    const contract = await factory.deploy(tokenName, tokenSymbol);
    btn.textContent = "Deploying token on Base…";
    await contract.deployTransaction.wait();

    const deployment = {
      name: tokenName,
      symbol: tokenSymbol,
      address: contract.address,
      txHash: contract.deployTransaction.hash,
      createdAt: new Date().toISOString()
    };
    window.BTM.saveDeployment(deployment);
    window.BTM.renderDeployments();

    result.innerHTML = `
      <strong>Token deployed successfully.</strong><br>
      Contract: <code>${contract.address}</code><br>
      <a class="link" href="${c.explorerUrl}/address/${contract.address}" target="_blank" rel="noopener noreferrer">View contract on BaseScan</a>
      · <a class="link" href="${c.explorerUrl}/tx/${contract.deployTransaction.hash}" target="_blank" rel="noopener noreferrer">View deployment transaction</a>`;
    result.classList.remove("hidden");
    btn.textContent = "Token Created";
  } catch (error) {
    console.error(error);
    alert(error?.message || "Transaction failed or was rejected.");
    btn.disabled = false;
    btn.textContent = `Create Token — ${c.platformFeeEth} ETH + gas`;
  }
};
