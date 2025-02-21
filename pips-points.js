document.addEventListener("DOMContentLoaded", () => {
  const pipsSection = document.getElementById("pips-points");

  // Inject the UI for Pips & Points
  pipsSection.innerHTML = `
    <h2>Pips & Point Calculator</h2>

    <label for="entryPrice">Entry Price:</label>
    <input type="number" id="entryPrice" placeholder="Enter entry price">

    <label for="exitPrice">Exit Price:</label>
    <input type="number" id="exitPrice" placeholder="Enter exit price">

    <label for="instrument2">Select Instrument:</label>
    <select id="instrument2">
      <option value="currency">Currency</option>
      <option value="gold">Gold (XAU/USD)</option>
      <option value="synthetic">Synthetic Indices</option>
    </select>

    <!-- Currency Sub-Box -->
    <div class="sub-box" id="currencyBox2" style="display: block;">
      <label for="currencyType2">Currency Type:</label>
      <select id="currencyType2">
        <option value="non-jpy">Non-JPY</option>
        <option value="jpy">JPY</option>
      </select>
    </div>

    <!-- Synthetic Sub-Box -->
    <div class="sub-box" id="syntheticBox2" style="display: none;">
      <label for="syntheticList2">Synthetic Instrument:</label>
      <select id="syntheticList2">
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

    <button class="calculate-btn" id="calculatePips">Calculate</button>
    <p class="result" id="pipsPointsResult">Pips/Points: --</p>
    <button class="copy-btn" onclick="copyResult('pipsPointsResult')">Copy Result</button>
  `;

  const instrument2 = document.getElementById("instrument2");
  const currencyBox2 = document.getElementById("currencyBox2");
  const syntheticBox2 = document.getElementById("syntheticBox2");

  // Show/hide sub-boxes on change
  instrument2.addEventListener("change", () => {
    const val = instrument2.value;
    if (val === "currency") {
      currencyBox2.style.display = "block";
      syntheticBox2.style.display = "none";
    } else if (val === "synthetic") {
      currencyBox2.style.display = "none";
      syntheticBox2.style.display = "block";
    } else {
      // gold
      currencyBox2.style.display = "none";
      syntheticBox2.style.display = "none";
    }
  });

  document.getElementById("calculatePips").addEventListener("click", () => {
    const entry = parseFloat(document.getElementById("entryPrice").value) || 0;
    const exit = parseFloat(document.getElementById("exitPrice").value) || 0;
    const diff = Math.abs(entry - exit);

    if (diff <= 0) {
      document.getElementById("pipsPointsResult").textContent = "Pips/Points: Invalid input";
      return;
    }

    let result = 0;
    const val = instrument2.value;
    const currencyType2 = document.getElementById("currencyType2")?.value || "non-jpy";
    const syntheticVal2 = document.getElementById("syntheticList2")?.value || null;

    // Synthetic multipliers
    const syntheticMultipliers = {
      v75: 100, v100: 100, v50: 100, v25: 100, v10: 100,
      boom1000: 1, boom500: 1, crash1000: 1, crash500: 1, step: 10
    };

    if (val === "currency") {
      // JPY or Non-JPY
      if (currencyType2 === "jpy") {
        result = diff * 100;      // JPY pairs
      } else {
        result = diff * 10000;    // Non-JPY
      }
    } else if (val === "gold") {
      result = diff * 10;
    } else {
      // Synthetic
      const mult = syntheticMultipliers[syntheticVal2] || 100;
      result = diff * mult;
    }

    document.getElementById("pipsPointsResult").textContent = "Pips/Points: " + result.toFixed(2);
  });
});