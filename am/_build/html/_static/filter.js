function initKVMultiFilter(tableId, filters) {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");

  // 绑定所有下拉框的 change 事件
  filters.forEach(f => {
    const select = document.getElementById(f.selectId);
    select.addEventListener("change", applyFilters);
  });

  function applyFilters() {
    rows.forEach(row => {
      let visible = true;

      filters.forEach(f => {
        const selected = document.getElementById(f.selectId).value;

        // 空值 = 不参与过滤
        if (selected !== "") {
          const dataKey = row.dataset[f.dataKey];
          if (dataKey !== selected) {
            visible = false;
          }
        }
      });

      row.style.display = visible ? "" : "none";
    });
  }
}
