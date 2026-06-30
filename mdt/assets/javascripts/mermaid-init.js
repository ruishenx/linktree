(function () {
  function convertMermaidBlocks() {
    const blocks = document.querySelectorAll('pre code.language-mermaid, pre code.mermaid');
    blocks.forEach(function (code) {
      const pre = code.parentElement;
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = code.textContent;
      pre.replaceWith(div);
    });
  }
  function initMermaid() {
    convertMermaidBlocks();
    if (window.mermaid) window.mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMermaid);
  else initMermaid();
})();
