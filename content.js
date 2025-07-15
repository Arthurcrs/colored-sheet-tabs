(() => {
  const TAB_SELECTOR        = '.docs-sheet-tab';
  const INNER_SELECTOR      = '.docs-sheet-tab-inner-box';
  const COLOR_CHIP_SELECTOR = '.docs-sheet-tab-color';
  const TABLIST_SELECTOR    = '.docs-sheet-container-bar';  // stable parent of tabs

  function getTabColor(tab) {
    const chip = tab.querySelector(COLOR_CHIP_SELECTOR);
    if (!chip) return null;
    const bg = getComputedStyle(chip).backgroundColor;
    // Some tabs have transparent (means "no custom color" -> fall back)
    if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') return null;
    return bg;
  }

  function paintTab(tab) {
    const inner = tab.querySelector(INNER_SELECTOR);
    if (!inner) return;
    const c = getTabColor(tab);
    // If user removed color, revert to default background
    inner.style.setProperty('--fullTabColor', c ? c : 'transparent');
  }

  function paintAll() {
    document.querySelectorAll(TAB_SELECTOR).forEach(paintTab);
  }

  // Initial run (if elements present)
  paintAll();

  // Observe: tabs can be added/renamed/color-changed dynamically
  const parent = document.querySelector(TABLIST_SELECTOR) || document.body;
  const mo = new MutationObserver(paintAll);
  mo.observe(parent, { childList: true, subtree: true, attributes: true });

  // Also listen for clicks (color changes come via menu; attributes may not fire immediately)
  parent.addEventListener('click', () => setTimeout(paintAll, 50), true);
})();