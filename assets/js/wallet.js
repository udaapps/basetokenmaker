window.BTM = window.BTM || {};
window.BTM.provider = null;
window.BTM.signer = null;

window.BTM.connectWallet = async function () {
  if (!window.ethereum) {
    alert("MetaMask or another compatible wallet is required.");
    return null;
  }
  const c = window.BTM_CONFIG;
  await window.ethereum.request({ method: "eth_requestAccounts" });
  try {
    await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: c.chainIdHex }] });
  } catch (err) {
    if (err.code !== 4902) throw err;
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{ chainId: c.chainIdHex, chainName: c.chainName, nativeCurrency: c.nativeCurrency, rpcUrls: [c.rpcUrl], blockExplorerUrls: [c.explorerUrl] }]
    });
  }
  window.BTM.provider = new ethers.providers.Web3Provider(window.ethereum);
  window.BTM.signer = window.BTM.provider.getSigner();
  return await window.BTM.signer.getAddress();
};
