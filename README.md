# Arghyadeep Deb — Portfolio

**Live:** https://arghyadeep-deb.github.io/portfolio/

Single-page dark portfolio showcasing AI/ML expertise, projects, and experience — vertical flow with scroll-reveal animations and an interactive drag-to-spin network globe. Vanilla HTML/CSS/JS + GSAP ScrollTrigger (no build step needed).

## Features

- **Dark sci-fi HUD theme** (single-theme, tuned for the V.E.C.T.O.R. aesthetic)
- **Interactive network globe** in the hero (canvas, drag to spin, auto-rotates)
- **Scroll-reveal animations** — tracking-in headings and staggered fade-up content
- **Plexus network background** (animated particle system with connection lines)
- **Responsive design** (mobile-first fallback to plain vertical layout)
- **Only external dependencies:** GSAP (CDN) and Google Fonts
- **Share-ready:** Open Graph and Twitter large-card image (`og-image.png`), canonical URL, JSON-LD schema
- **Accessibility basics:** skip link, visible keyboard focus, reduced-motion support, decorative canvases hidden from screen readers

## Projects shown on the site

- **Grove** — AI layer and FastAPI backend of a thinking-to-knowledge platform (internship, code under NDA)
- **AI Financial Advisor** — multi-agent advisory platform with Graph-RAG
  - [Live](https://ai-financial-advisor-summarizer.streamlit.app) · [GitHub](https://github.com/arghyadeep-deb/AI-Financial-Advisor)
- **Fairness-Aware Credit Scoring** — TabTransformer with a joint fairness/calibration loss (B.Tech major project)
  - [Live demo](https://fairness-aware-credit-scoring.onrender.com/) · [GitHub](https://github.com/arghyadeep-deb/fairness-aware-credit-scoring)
- **Hybrid Movie Recommender** — TF-IDF + SVD item-to-item recommender
  - [GitHub](https://github.com/arghyadeep-deb/Hybrid-Movie-Recommender-System)
- **V.E.C.T.O.R.** — flagship multi-agent system, with per-module status labels
  - [GitHub](https://github.com/arghyadeep-deb/VECTOR)

## Run Locally

Open `index.html` directly in a browser, or serve via HTTP:

```bash
npx serve .
# Then open http://localhost:3000
```

## Deploy to GitHub Pages

### If hosting at `username.github.io/portfolio`:

1. Create a repo named `portfolio`
2. Push all files to `main` branch
3. Go to **Settings → Pages**
4. Select **Source:** `Deploy from a branch`
5. Branch: `main`, Folder: `/ (root)`
6. Save — live in ~2 minutes at `https://username.github.io/portfolio/`

### If hosting at `username.github.io` (personal site):

1. Create a repo named `username.github.io`
2. Push all files to `main` branch
3. Pages auto-enables — live at `https://username.github.io/`

## File Structure

```
index.html          — all content and structure
css/style.css       — theming (CSS variables), layout, components
js/main.js          — scroll reveals, plexus, network globe, nav
resume.pdf          — downloadable resume
README.md           — this file
```

## Customization

### Edit content
- Sections live inside `<section id="sec-*" class="sec">` in `index.html`
- Update text, links, project details directly

### Adjust animations
- **Reveal triggers**: `initReveals()` in `js/main.js` (`start: 'top 75%'`)
- **Globe**: `startGlobe()` in `js/main.js` (point count, rotation speed, drag sensitivity)
- **Section spacing**: `main { gap: 150px }` in `css/style.css`

### Modify theme colors
- All tokens live in `:root` at the top of `css/style.css`
- Everything derives from CSS variables (e.g., `--accent`, `--bg`, `--text`)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS Safari 14+, Chrome Android

Fully responsive; on mobile (≤820px) the plexus background and globe are disabled for performance.
