document.addEventListener("DOMContentLoaded", () => {
  const profitSection = document.getElementById("profit-loss");

  // Inject the UI for Profit & Loss
  profitSection.innerHTML = `
    <h2>Profit & Loss Calculator</h2>

    <label for="lotSizeInput">Lot Size:</label>
    <input type="number" id="lotSizeInput" placeholder="Enter lot size">

    <label for="pipsProfit">Pips/Points:</label>
    <input type="number" id="pipsProfit" placeholder="Enter pips/points">

    <label for="instrument3">Select Instrument:</label>
    <select id="instrument3">
      <option value="currency">Currency</option>
      <option value="gold">Gold (XAU/USD)</option>
      <option value="synthetic">Synthetic Indices</option>
    </select>

    <!-- Currency Sub-Box -->
    <div class="sub-box" id="currencyBox3" style="display: block;">
      <label for="currencyType3">Currency Type:</label>
      <select id="currencyType3">
        <option value="non-jpy">Non-JPY</option>
        <option value="jpy">JPY</option>
      </select>
    </div>

    <!-- Synthetic Sub-Box -->
    <div class="sub-box" id="syntheticBox3" style="display: none;">
      <label for="syntheticList3">Synthetic Instrument:</label>
      <select id="syntheticList3">
        <option value="v75">Volatility 75</option>
        <option value="v100">Volatility 100</option>
        <option value="v50">Volatility 50</option>
        <option value="v25">Volatility 25</option>
        <option value="v10">Volatility 10</option>
        <option value="boom1000">Boom 1000</option>
        <option value="boom500">Boom 500</option>
        <option value="crash1000">Crash 1000</option>
        <option value="crash500">Crash 500</option>
        <option value="step">Step Index</option>
      </select>
    </div>

    <button class="calculate-btn" id="calculatePL">Calculate</button>
    <p class="result" id="profitLossResult">Profit/Loss: --</p>
    <button class="copy-btn" onclick="copyResult('profitLossResult')">Copy Result</button>
  `;

  const instrument3 = document.getElementById("instrument3");
  const currencyBox3 = document.getElementById("currencyBox3");
  const syntheticBox3 = document.getElementById("syntheticBox3");

  // Show/hide sub-boxes on change
  instrument3.addEventListener("change", () => {
    const val = instrument3.value;
    if (val === "currency") {
      currencyBox3.style.display = "block";
      syntheticBox3.style.display = "none";
    } else if (val === "synthetic") {
      currencyBox3.style.display = "none";
      syntheticBox3.style.display = "block";
    } else {
      // gold
      currencyBox3.style.display = "none";
      syntheticBox3.style.display = "none";
    }
  });

  // Synthetic multipliers for P/L
  const syntheticPL = {
    v75: 1, v100: 1, v50: 1, v25: 1, v10: 1,
    boom1000: 1, boom500: 1, crash1000: 1, crash500: 1, step: 0.1
  };

  document.getElementById("calculatePL").addEventListener("click", () => {
    const lotSize = parseFloat(document.getElementById("lotSizeInput").value) || 0;
    const pips = parseFloat(document.getElementById("pipsProfit").value) || 0;
    const val = instrument3.value;
    const currencyType3 = document.getElementById("currencyType3")?.value || "non-jpy";
    const syntheticVal3 = document.getElementById("syntheticList3")?.value || null;

    if (lotSize <= 0 || pips <= 0) {
      document.getElementById("profitLossResult").textContent = "Profit/Loss: Invalid input";
      return;
    }

    let pl = 0;
    if (val === "currency") {
      if (currencyType3 === "jpy") {
        pl = pips * lotSize * 100;
      } else {
        pl = pips * lotSize * 10;
      }
    } else if (val === "gold") {
      pl = pips * lotSize * 10;
    } else {
      // Synthetic
      const multiplier = syntheticPL[syntheticVal3] || 1;
      pl = pips * lotSize * multiplier;
    }

    document.getElementById("profitLossResult").textContent = "Profit/Loss: $" + pl.toFixed(2);
  });
});