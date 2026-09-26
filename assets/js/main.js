window.BTM = window.BTM || {};
window.BTM.getDeployments = function () {
  try { return JSON.parse(localStorage.getItem("btm_deployments") || "[]"); } catch { return []; }
};
window.BTM.saveDeployment = function (d) {
  const items = window.BTM.getDeployments();
  items.unshift(d);
  localStorage.setItem("btm_deployments", JSON.stringify(items.slice(0, 10)));
};
window.BTM.renderDeployments = function () {
  const list = document.getElementById("recentDeploymentsList");
  const items = window.BTM.getDeployments();
  if (!items.length) {
    list.innerHTML = '<p class="text-sm text-slate-500">No deployments recorded in this browser yet.</p>';
    return;
  }
  list.innerHTML = items.map(d => `<div class="deploy-row"><div><strong>${window.BTM.escapeHtml(d.name)}</strong> <span class="text-pink-300 font-mono">$${window.BTM.escapeHtml(d.symbol)}</span><div class="text-xs text-slate-500 mt-1">${new Date(d.createdAt).toLocaleString()}</div></div><a href="${window.BTM_CONFIG.explorerUrl}/address/${encodeURIComponent(d.address)}" target="_blank" rel="noopener noreferrer">BaseScan ↗</a></div>`).join("");
};
window.BTM.escapeHtml = function (s) { const d=document.createElement("div"); d.textContent=String(s ?? ""); return d.innerHTML; };

document.addEventListener("DOMContentLoaded", () => {
  const connect = document.getElementById("connectWallet");
  const status = document.getElementById("walletStatus");
  const generator = document.getElementById("generatorSection");
  connect.addEventListener("click", async () => {
    try {
      connect.disabled = true; connect.textContent = "Connecting…";
      const address = await window.BTM.connectWallet();
      if (!address) return;
      status.textContent = "Connected to Base: " + address;
      generator.classList.remove("hidden");
      connect.textContent = address.slice(0,6) + "…" + address.slice(-4);
    } catch (e) {
      console.error(e); alert(e?.message || "Could not connect wallet.");
      connect.textContent = "Connect Wallet";
    } finally { connect.disabled = false; }
  });
  document.getElementById("createTokenBtn").addEventListener("click", window.BTM.createToken);
  document.getElementById("generateMemeBtn").addEventListener("click", window.BTM.generateMeme);
  document.getElementById("autofillBtn").addEventListener("click", window.BTM.autofillMeme);
  window.BTM.renderDeployments();
});
