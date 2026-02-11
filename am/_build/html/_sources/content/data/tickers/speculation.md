# Speculation

```{raw} html
<link rel="stylesheet" href="../_static/kv_table.css">

<div class="kv-controls">
  <label>Class</label>
  <select id="f-k1">
    <option value="">All</option>
    <option value="Equities">Equities</option>
    <option value="Bonds">Bonds</option>
    <option value="Commodities">Commodities</option>
    <option value="Crypto">Crypto</option>
  </select>

  <label>Sector</label>
  <select id="f-k2">
    <option value="">All</option>
    <option value="Technology">Technology</option>
    <option value="Industrials">Industrials</option>
    <option value="Materials">Materials</option>
    <option value="Energy">Energy</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Discretionary">Discretionary</option>
    <option value="EM">EM</option>
    <option value="Financials">Financials</option>
    <option value="Mixed">Mixed</option>
  </select>

  <label>Leverage</label>
  <select id="f-k3">
    <option value="">All</option>
    <option value="1">1</option>
    <option value="-1">-1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="-3">-3</option>
  </select>

  <label>Type</label>
  <select id="f-k4">
    <option value="">All</option>
    <option value="ETF">ETF</option>
    <option value="ETN">ETN</option>
    <option value="Stock">Stock</option>
    <option value="Token">Token</option>
  </select>
</div>

<table id="kv-table" class="kv-table">
  <thead>
    <tr>
      <th>Ticker</th>
      <th>Class</th>
      <th>Sector</th>
      <th>Leverage</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr data-k1="Equities" data-k2="Technology" data-k3="3" data-k4="ETF">
      <td>TQQQ</td>
      <td>Equities</td>
      <td>Technology</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Technology" data-k3="3" data-k4="Token">
      <td>TQQQX</td>
      <td>Equities</td>
      <td>Technology</td>
      <td>3</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Equities" data-k2="Industrials" data-k3="3" data-k4="ETF">
      <td>UDOW</td>
      <td>Equities</td>
      <td>Industrials</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Mixed" data-k3="3" data-k4="ETF">
      <td>TNA</td>
      <td>Equities</td>
      <td>Mixed</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="" data-k3="2" data-k4="ETF">
      <td>UVIX</td>
      <td>Equities</td>
      <td></td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Materials" data-k3="3" data-k4="ETN">
      <td>GDXU</td>
      <td>Equities</td>
      <td>Materials</td>
      <td>3</td>
      <td>ETN</td>
    </tr>
    <tr data-k1="Equities" data-k2="Energy" data-k3="2" data-k4="ETF">
      <td>ERX</td>
      <td>Equities</td>
      <td>Energy</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Industrials" data-k3="3" data-k4="ETF">
      <td>DFEN</td>
      <td>Equities</td>
      <td>Industrials</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Healthcare" data-k3="3" data-k4="ETF">
      <td>CURE</td>
      <td>Equities</td>
      <td>Healthcare</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="2" data-k4="ETF">
      <td>BRKU</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Discretionary" data-k3="3" data-k4="ETF">
      <td>NAIL</td>
      <td>Equities</td>
      <td>Discretionary</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Healthcare" data-k3="3" data-k4="ETF">
      <td>LABU</td>
      <td>Equities</td>
      <td>Healthcare</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="EM" data-k3="3" data-k4="ETF">
      <td>EDC</td>
      <td>Equities</td>
      <td>EM</td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Discretionary" data-k3="2" data-k4="ETF">
      <td>TSLL</td>
      <td>Equities</td>
      <td>Discretionary</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="1" data-k4="Stock">
      <td>HOOD</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>1</td>
      <td>Stock</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="2" data-k4="ETF">
      <td>HODU</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Bonds" data-k2="" data-k3="-3" data-k4="ETF">
      <td>TMV</td>
      <td>Bonds</td>
      <td></td>
      <td>-3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Mixed" data-k3="-1" data-k4="ETF">
      <td>SARK</td>
      <td>Equities</td>
      <td>Mixed</td>
      <td>-1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="EM" data-k3="-3" data-k4="ETF">
      <td>YANG</td>
      <td>Equities</td>
      <td>EM</td>
      <td>-3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="EM" data-k3="-3" data-k4="ETF">
      <td>EDZ</td>
      <td>Equities</td>
      <td>EM</td>
      <td>-3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Mixed" data-k3="-3" data-k4="ETF">
      <td>TZA</td>
      <td>Equities</td>
      <td>Mixed</td>
      <td>-3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Commodities" data-k2="" data-k3="1" data-k4="ETF">
      <td>SIL</td>
      <td>Commodities</td>
      <td></td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Commodities" data-k2="" data-k3="2" data-k4="ETF">
      <td>AGQ</td>
      <td>Commodities</td>
      <td></td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="1" data-k4="Token">
      <td>BTCUSDT</td>
      <td>Crypto</td>
      <td></td>
      <td>1</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="2" data-k4="ETF">
      <td>BITX</td>
      <td>Crypto</td>
      <td></td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="3" data-k4="Token">
      <td>BTC3L</td>
      <td>Crypto</td>
      <td></td>
      <td>3</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="1" data-k4="Token">
      <td>ETHUSDT</td>
      <td>Crypto</td>
      <td></td>
      <td>1</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="3" data-k4="Token">
      <td>ETH3L</td>
      <td>Crypto</td>
      <td></td>
      <td>3</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="1" data-k4="Token">
      <td>SOLUSDT</td>
      <td>Crypto</td>
      <td></td>
      <td>1</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="3" data-k4="Token">
      <td>SOL3L</td>
      <td>Crypto</td>
      <td></td>
      <td>3</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="1" data-k4="Token">
      <td>XMRUSD</td>
      <td>Crypto</td>
      <td></td>
      <td>1</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="1" data-k4="Token">
      <td>COINON / COINX</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>1</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="2" data-k4="ETF">
      <td>CONL</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="-2" data-k4="ETF">
      <td>CONI</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>-2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="1" data-k4="Stock">
      <td>MSTR</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>1</td>
      <td>Stock</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="1" data-k4="Token">
      <td>MSTRON / MSTRX</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>1</td>
      <td>Token</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="2" data-k4="ETF">
      <td>MSTU / MSTX</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="-2" data-k4="ETF">
      <td>SMST</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>-2</td>
      <td>ETF</td>
    </tr>
  </tbody>
</table>

<script src="../_static/kv_filter.js"></script>
<script>
  initKVMultiFilter("kv-table", [
    { selectId: "f-k1", dataKey: "k1" },
    { selectId: "f-k2", dataKey: "k2" },
    { selectId: "f-k3", dataKey: "k3" },
    { selectId: "f-k4", dataKey: "k4" }
  ]);
</script>
```
