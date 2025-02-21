document.addEventListener("DOMContentLoaded", () => {
  const lotSizeSection = document.getElementById("lot-size");

  // Inject the UI for Lot Size
  lotSizeSection.innerHTML = `
    <h2>Lot Size Calculator</h2>

    <label for="riskAmount">Risk Amount ($):</label>
    <input type="number" id="riskAmount" placeholder="Enter risk amount">

    <label for="pipsInput">Pip/Point:</label>
    <input type="number" id="pipsInput" placeholder="Enter pip/point value">

    <label for="instrumentSelect">Select Instrument:</label>
    <select id="instrumentSelect">
      <option value="currency">Currency</option>
      <option value="gold">Gold (XAU/USD)</option>
      <option value="synthetic">Synthetic Indices</option>
    </select>

    <!-- Currency Sub-Box -->
    <div class="sub-box" id="currencyBox" style="display: block;">
      <label for="currencyType">Currency Type:</label>
      <select id="currencyType">
        <option value="non-jpy">Non-JPY</option>
        <option value="jpy">JPY</option>
      </select>
    </div>

    <!-- Synthetic Sub-Box -->
    <div class="sub-box" id="syntheticBox" style="display: none;">
      <label for="syntheticList">Synthetic Instrument:</label>
      <select id="syntheticList">
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

    <button class="calculate-btn" id="calculateLot">Calculate Lot Size</button>
    <p class="result" id="lotSizeResult">Lot Size: --</p>
    <button class="copy-btn" onclick="copyResult('lotSizeResult')">Copy Result</button>
  `;

  const instrumentSelect = document.getElementById("instrumentSelect");
  const currencyBox = document.getElementById("currencyBox");
  const syntheticBox = document.getElementById("syntheticBox");

  // Show/hide sub-boxes on change
  instrumentSelect.addEventListener("change", () => {
    const val = instrumentSelect.value;
    if (val === "currency") {
      currencyBox.style.display = "block";
      syntheticBox.style.display = "none";
    } else if (val === "synthetic") {
      currencyBox.style.display = "none";
      syntheticBox.style.display = "block";
    } else {
      // gold
      currencyBox.style.display = "none";
      syntheticBox.style.display = "none";
    }
  });

  // Min lot sizes for synthetic
  const minLotSizes = {
    v75: 0.001, v100: 0.001, v50: 0.005, v25: 0.005, v10: 0.01,
    boom1000: 0.2, boom500: 0.2, crash1000: 0.2, crash500: 0.2, step: 0.1
  };

  document.getElementById("calculateLot").addEventListener("click", () => {
    const riskAmount = parseFloat(document.getElementById("riskAmount").value) || 0;
    const pips = parseFloat(document.getElementById("pipsInput").value) || 0;
    const instrument = instrumentSelect.value;
    const currencyType = document.getElementById("currencyType")?.value || "non-jpy";
    const synthetic = document.getElementById("syntheticList")?.value || null;

    if (riskAmount <= 0 || pips <= 0) {
      document.getElementById("lotSizeResult").textContent = "Lot Size: Invalid input";
      return;
    }

    let lotSize = 0;

    if (instrument === "currency") {
      // JPY or Non-JPY
      if (currencyType === "jpy") {
        // JPY formula
        lotSize = riskAmount / (pips * 100);

        // Check if lot size is below 0.001
        if (lotSize < 0.001) {
          alert("Your lot size is below 0.001 for JPY pairs. Please increase your risk amount.");
        }

      } else {
        // Non-JPY
        lotSize = riskAmount / (pips * 10);
      }
    } else if (instrument === "gold") {
      // Gold
      lotSize = riskAmount / (pips * 10);
    } else {
      // Synthetic
      const minLot = minLotSizes[synthetic] || 0.001;
      lotSize = riskAmount / (pips * minLot);
      if (lotSize < minLot) {
        alert("Your risk amount is too small for this instrument. Please increase the risk amount.");
      }
    }

    document.getElementById("lotSizeResult").textContent = "Lot Size: " + lotSize.toFixed(3);
  });
});