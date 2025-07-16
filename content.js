(() => {
  const TAB_SELECTOR = '.docs-sheet-tab';          // The one individual sheet tab button
  const CHIP_SELECTOR = '.docs-sheet-tab-color';    // The tiny 3‑px colour chip inside a tab
  const TABLIST_SELECTOR = '.docs-sheet-container-bar';// The horizontal bar that holds all tabs

  function readColour(chip) {
    const inline = chip.style.background || chip.style.backgroundColor;
    if (inline && !inline.includes('transparent')) return inline;

    const comp = getComputedStyle(chip).backgroundColor;
    if (comp && comp !== 'rgba(0, 0, 0, 0)' && comp !== 'transparent') return comp;

    return null;
  }

  // Get the color of the chip, paints the tab with its color, then hides the chip
  function paintTab(tab) {
    const chip = tab.querySelector(CHIP_SELECTOR);
    if (!chip) return; // If there is no chip, do nothing

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