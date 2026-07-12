# Arghyadeep Deb — Portfolio

**Live:** https://arghyadeep-deb.github.io

Scroll-driven "camera travel" portfolio showcasing AI/ML expertise, projects, and experience. Built with vanilla HTML/CSS/JS + GSAP ScrollTrigger (no build step needed).

## Features

- **Dark sci-fi HUD theme** (single-theme, tuned for the V.E.C.T.O.R. aesthetic)
- **Scroll-driven camera** that zooms and pans across a 5200×8200 "world"
- **Plexus network background** (animated particle system with connection lines)
- **Responsive design** (mobile-first fallback to plain vertical layout)
- **No dependencies** beyond GSAP (loaded via CDN)
- **SEO-ready** (Open Graph, Twitter Cards, JSON-LD schema)
- **Accessible** (ARIA labels, screen reader hidden decorative elements)

## Project Links

- **AI Financial Advisor** — Multi-agent financial advisory with Graph-RAG
  - [GitHub](https://github.com/arghyadeep-deb/AI-Financial-Advisor)
  - Tech: LangGraph, Graph-RAG, FastAPI, Streamlit

- **Credit Scoring System** — Hybrid ML/DL credit risk prediction
  - [GitHub](https://github.com/arghyadeep-deb/Credit-Scoring-System)
  - Tech: XGBoost, PyTorch, SHAP, FastAPI

- **Grove** — Agentic thinking & memory tool (internship, under NDA)

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
js/main.js          — scroll camera, plexus animation, nav
resume.pdf          — downloadable resume
README.md           — this file
```

## Customization

### Edit content
- Sections live inside `<section id="sec-*" class="sec">` in `index.html`
- Update text, links, project details directly

### Change section positions
- Each section has CSS rules: `#sec-hero`, `#sec-vector`, etc. in `css/style.css`
- Positions are absolute coordinates in a 5200×8200 world
- Keep sections horizontally centered at x=2600 to maintain vertical journey line

### Adjust camera zoom/speed
- **Camera zoom per section**: `KEYFRAMES` array in `js/main.js` (z value)
- **Scroll speed**: `SCRUB` constant (lower = snappier, higher = floatier)
- **Journey height**: `.scrollspace { height: 780vh }` in CSS (more = slower scroll)

### Modify theme colors
- All tokens live in `:root` at the top of `css/style.css`
- Everything derives from CSS variables (e.g., `--accent`, `--bg`, `--text`)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS Safari 14+, Chrome Android

Desktop (≥820px) uses the scroll-camera experience. Mobile (≤820px) falls back to a plain vertical document flow.
