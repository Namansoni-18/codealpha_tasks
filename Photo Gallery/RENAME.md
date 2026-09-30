# Lumen — Image Gallery

A responsive image gallery built with plain HTML, CSS, and JavaScript (no frameworks or libraries).

## Features

- **Responsive grid layout** using CSS Grid, adapting from a multi-column desktop layout to a single-column mobile layout
- **Lightbox viewer** with next/prev navigation, keyboard support (arrow keys, Escape), and click-outside-to-close
- **Category sidebar** to filter photos by album (Nature, City, People, etc.)
- **Live search** that filters photos by title as you type
- **Sort control** (name A–Z, Z–A, or by category)
- **Photo counter** that updates with the current filtered result count, plus an in-lightbox counter (e.g. "3 / 6")
- **Loading skeletons** with a shimmer animation while images load, followed by a staggered fade-in
- **Tilt-on-hover effect** — cards tilt toward the cursor in 3D for a tactile feel
- **Custom accent color theme**, controlled by a single CSS variable

## Files

- `index.html` — page structure and content
- `style.css` — all styling, including responsive rules and animations
- `script.js` — all interactivity (filtering, search, sort, lightbox, tilt effect)

## How to run

Open `index.html` directly in any modern browser. No build step or server required.

## Notes

Sample images are placeholder photos from picsum.photos. Replace the `src` values in `index.html` with your own images to personalize the gallery.