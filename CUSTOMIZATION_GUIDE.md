# Customization Guide

Plain HTML/CSS/JS — no build step, no frameworks. Open `index.html` or serve the folder
(`python3 -m http.server`) to preview.

```
index.html        all content: hero, statement, about, Quantify, beliefs, work, journey, contact
css/styles.css    design tokens live in :root (colors, fonts, spacing)
js/main.js        intro, text reveals, cursor, scroll effects
assets/           optimised .webp images used by the page
media/            original source images (not named `public/`: Vercel would serve that folder as the site root)
```

## Common edits
- **Bio** — the `.about__copy` paragraphs in `index.html`.
- **Beliefs** — `<li>` entries inside `<ol class="bl">`.
- **Work** — `<a class="card">` entries in `#work`; `card--xl` makes one full width.
- **Journey** — `<li>` entries inside `<ol class="tl">`; add `tl__now` to highlight the current one.
- **Accent color** — `--accent` in `css/styles.css`.

The intro animation plays once per browser session (stored in `sessionStorage`).
