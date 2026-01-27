# Fixed

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
    <tr data-k1="Equities" data-k2="Technology" data-k3="1" data-k4="ETF">
      <td>QQQ</td>
      <td>Equities</td>
      <td>Technology</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Technology" data-k3="2" data-k4="ETF">
      <td>QLD</td>
      <td>Equities</td>
      <td>Technology</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Industrials" data-k3="1" data-k4="ETF">
      <td>DIA</td>
      <td>Equities</td>
      <td>Industrials</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Industrials" data-k3="2" data-k4="ETF">
      <td>DDM</td>
      <td>Equities</td>
      <td>Industrials</td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Commodities" data-k2="" data-k3="1" data-k4="ETF">
      <td>GLD</td>
      <td>Commodities</td>
      <td></td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Commodities" data-k2="" data-k3="2" data-k4="ETF">
      <td>UGL</td>
      <td>Commodities</td>
      <td></td>
      <td>2</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Commodities" data-k2="" data-k3="3" data-k4="ETN">
      <td>SHNY</td>
      <td>Commodities</td>
      <td></td>
      <td>3</td>
      <td>ETN</td>
    </tr>
    <tr data-k1="Bonds" data-k2="" data-k3="1" data-k4="ETF">
      <td>TLT</td>
      <td>Bonds</td>
      <td></td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Bonds" data-k2="" data-k3="3" data-k4="ETF">
      <td>TMF</td>
      <td>Bonds</td>
      <td></td>
      <td>3</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Bonds" data-k2="" data-k3="1" data-k4="ETF">
      <td>BIL</td>
      <td>Bonds</td>
      <td></td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Forex" data-k2="" data-k3="1" data-k4="ETF">
      <td>FXF</td>
      <td>Forex</td>
      <td></td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Materials" data-k3="1" data-k4="ETF">
      <td>GDX</td>
      <td>Equities</td>
      <td>Materials</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Mixed" data-k3="1" data-k4="ETF">
      <td>GUNR</td>
      <td>Equities</td>
      <td>Mixed</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Energy" data-k3="1" data-k4="ETF">
      <td>XLE</td>
      <td>Equities</td>
      <td>Energy</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Industrials" data-k3="1" data-k4="ETF">
      <td>ITA</td>
      <td>Equities</td>
      <td>Industrials</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Healthcare" data-k3="1" data-k4="ETF">
      <td>XLV</td>
      <td>Equities</td>
      <td>Healthcare</td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Discretionary" data-k3="1" data-k4="Stock">
      <td>TSLA</td>
      <td>Equities</td>
      <td>Discretionary</td>
      <td>1</td>
      <td>Stock</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="1" data-k4="Stock">
      <td>IBKR</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>1</td>
      <td>Stock</td>
    </tr>
    <tr data-k1="Crypto" data-k2="" data-k3="1" data-k4="ETF">
      <td>IBIT</td>
      <td>Crypto</td>
      <td></td>
      <td>1</td>
      <td>ETF</td>
    </tr>
    <tr data-k1="Equities" data-k2="Financials" data-k3="1" data-k4="Stock">
      <td>COIN</td>
      <td>Equities</td>
      <td>Financials</td>
      <td>1</td>
      <td>Stock</td>
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

