// The site's leaf drawing (the `leaf` in guidance-pages.mjs, which tests keep unchanged), taken apart so it can
// move: the stem is drawn from the bottom up, and each leaf opens from the point where it meets the stem.
// The shapes are the drawing's own paths, untouched. This only adds the order (bottom leaf first), the point each
// leaf turns around, and which way it folds against the stem. leaf.css and src/leaf.js animate it.
export function leafArt(leafSvg, className = 'lf-art') {
  const stem = leafSvg.match(/<path d="([^"]+)" stroke="currentColor" stroke-width="10"\/>/)[1];
  const group = leafSvg.match(/<g fill="currentColor">([\s\S]*?)<\/g>/)[1];
  const leaves = [...group.matchAll(/<path d="([^"]+)"\/>/g)].map(([, d]) => {
    const numbers = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const [bx, by] = numbers;
    const xs = numbers.filter((_, i) => i % 2 === 0);
    const tipSide = (Math.min(...xs) + Math.max(...xs)) / 2 < bx ? 'left' : 'right';
    return { d, bx, by, tipSide };
  }).sort((a, b) => b.by - a.by);
  const paths = leaves.map((leaf, i) =>
    `<path class="lf-leaf" style="--i:${i};--fold:${leaf.tipSide === 'left' ? '' : '-'}1;transform-origin:${leaf.bx}px ${leaf.by}px" d="${leaf.d}"/>`).join('');
  return `<svg class="${className}" viewBox="0 0 420 610" fill="none" aria-hidden="true" focusable="false"><path class="lf-stem" d="${stem}" stroke="currentColor" stroke-width="10" pathLength="1"/><g fill="currentColor">${paths}</g></svg>`;
}

// The curtain between two pages: the forest panel with the leaf, painted from the first frame of the next page.
export const leafCurtain = leafSvg => `<div class="lf-curtain" aria-hidden="true">${leafArt(leafSvg)}</div>`;

// Set before anything paints: if the visitor arrived by a click on this site, the page opens behind the curtain.
export const leafArriveScript = `<script>try{var t=+sessionStorage.getItem('lf-nav');sessionStorage.removeItem('lf-nav');if(t&&Date.now()-t<5000&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('lf-arrive')}catch(e){}</script>`;
