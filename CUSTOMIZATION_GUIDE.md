# Customization Guide

Plain HTML/CSS/JS — no build step, no frameworks. Open `index.html` or serve the folder
(`python3 -m http.server`) to preview.

```
index.html        all content: hero, statement, about, Quantify (demo video), beliefs, writing, work, journey, contact
css/styles.css    design tokens live in :root (colors, fonts, spacing)
js/main.js        intro, text reveals, cursor, scroll effects
assets/           the demo video poster
media/            extra files (not named `public/`: Vercel would serve that folder as the site root)
```

## Common edits
- **Bio** — the `.about__copy` paragraphs in `index.html`.
- **Beliefs** — `<li>` entries inside `<ol class="bl">`.
- **Books & paper** — the `<a class="book">` entries in `#writing`. Swap the Amazon search links for direct store links.
- **Work** — the `.rowlink` rows in `#work`.
- **Demo video** — streamed from quantifyterminal.com; the `<video id="demo">` source in `#quantify`.
- **Journey** — `<li>` entries inside `<ol class="tl">`; add `tl__now` to highlight the current one.
- **Accent color** — `--accent` in `css/styles.css`.

The intro animation plays once per browser session (stored in `sessionStorage`).
