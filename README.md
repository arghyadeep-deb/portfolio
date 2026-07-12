# Arghyadeep Deb — Portfolio

Scroll-driven "camera travel" portfolio. Vanilla HTML/CSS/JS + GSAP ScrollTrigger (CDN) — no build step needed.

## Structure

```
index.html      — all content (sections live inside the #world container)
css/style.css   — themes (dark/light via CSS variables), layout, components
js/main.js      — scroll camera, plexus background, nav, theme toggle
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy to GitHub Pages

1. Create a repo (e.g. `portfolio` or `<username>.github.io`)
2. Push these files to the repo root
3. Repo Settings → Pages → Source: `main` branch, `/ (root)`
4. Done — live at `https://<username>.github.io/<repo>/`

## Editing

- **Content**: edit the `<section>` blocks in `index.html`.
- **Section positions**: `#sec-*` rules in `css/style.css` (coordinates inside the 5200×8200 world). Keep the journey vertical by keeping every section horizontally centered around x = 2600.
- **Camera stops**: `KEYFRAMES` in `js/main.js` (`z` = zoom per section). The camera auto-centers on each section element.
- **Scroll feel**: `SCRUB` in `js/main.js` (lower = snappier, higher = floatier); `.scrollspace` height in CSS (more vh = slower journey).
- **Themes**: token blocks at the top of `css/style.css`. Toggle persists via localStorage.

Mobile (≤820px) falls back to a plain vertical document flow — no camera, no canvas.
