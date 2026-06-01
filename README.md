# NOVA BANQ Business — Veris B.V.

An interactive concept prototype for agent-initiated business banking onboarding. Built as a self-contained React app (no build step) using inline JSX transpiled in the browser.

> **2031 Vision Concept** — fictional brand, internal vision demo.

## Run it

This is a static site. Because the JSX files are loaded over HTTP, open it through a local web server rather than double-clicking `index.html` (browsers block local file loads).

**Quickest option — any of these from the project folder:**

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

**GitHub Pages:** push this repo, then enable Pages (Settings → Pages → Deploy from branch → `main` / root). The app serves directly from `index.html`.

## How it's structured

```
index.html        Page shell — fonts, Tailwind, React + Babel, mounts src/
src/
  shared.jsx      Shared UI primitives (phone frame, cards, icons)
  screen1.jsx     Screen 1 — Claude handover / agent-to-agent entry
  screens-a.jsx   Screens 2–5
  screens-b.jsx   Screens 6–8
  screens-c.jsx   Screens 9–11
  app.jsx         Root app — state machine, navigation, page chrome
```

The scripts load in order; `app.jsx` mounts last. Components are shared across files via the global scope (see top of each file).

## Dependencies

All loaded from CDN at runtime — there is no `npm install`:

- React 18.3.1 + ReactDOM
- Babel Standalone 7 (in-browser JSX transpile)
- Tailwind CSS (browser build)
- Google Fonts — Inter + Instrument Serif

Because dependencies come from CDN, an internet connection is required. For an offline single-file version, export a standalone bundle instead.

## License

Concept prototype for demonstration purposes.
