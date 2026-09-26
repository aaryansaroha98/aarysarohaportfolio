# Customization Guide

Plain HTML/CSS/JS — no build step, no frameworks. Open `index.html` or serve the folder
(`python3 -m http.server`) to preview.

```
index.html        all content (sections: hero, manifesto, quantify, founder, watchlist, heatmap, ledger, contact)
css/styles.css    design tokens live in :root (colors, fonts, gutter)
js/main.js        boot sequence, market canvas, cursor, pipeline, heatmap, command palette
assets/           optimised .webp images used by the page
public/           résumé PDF + original source images
```

## Common edits
- **Projects** — each project is an `<a class="wl__row">` in the `#work` section. `data-img` sets the hover preview.
- **Skills heatmap** — edit the `skills` array in `js/main.js`: `[name, subtitle, colSpan, rowSpan, momentum]`.
- **Timeline** — `<li>` entries inside `<ol class="lg">` in the `#ledger` section.
- **Ticker tape** — the `tickers` array in `js/main.js`.
- **Pipeline copy** — the `steps` array in `js/main.js`.
- **Command palette** — the `commands` array in `js/main.js`.
- **Accent color** — `--amber` in `css/styles.css`.

## Keyboard
`/` or `⌘K` opens the command palette · `1`–`7` jump between sections.

The boot animation plays once per browser session (stored in `sessionStorage`).
