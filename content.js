(() => {
  const TAB_SELECTOR     = '.docs-sheet-tab';
  const CHIP_SELECTOR    = '.docs-sheet-tab-color';
  const TABLIST_SELECTOR = '.docs-sheet-container-bar';

  function readColour(chip) {
    // 1) Inline style (fast, works even if element not rendered)
    const inline = chip.style.background || chip.style.backgroundColor;
    if (inline && !inline.includes('transparent')) return inline;

    const comp = getComputedStyle(chip).backgroundColor;
    if (comp && comp !== 'rgba(0, 0, 0, 0)' && comp !== 'transparent') return comp;

    return null;
  }

  function paintTab(tab) {
    const chip  = tab.querySelector(CHIP_SELECTOR);
    if (!chip) return;

    const colour = readColour(chip) || 'transparent';
    tab.style.setProperty('--fullTabColor', colour);

    chip.style.visibility = 'hidden';
  }

  function paintAll() {
    document.querySelectorAll(TAB_SELECTOR).forEach(paintTab);
  }

  // Initial run
  paintAll();

  // Observe for tab additions / colour changes
  const parent = document.querySelector(TABLIST_SELECTOR) || document.body;
  new MutationObserver(paintAll).observe(parent, {
    childList: true, subtree: true, attributes: true
  });

  // Quick repaint after user opens colour‑picker menu
  parent.addEventListener('click', () => setTimeout(paintAll, 50), true);
})();