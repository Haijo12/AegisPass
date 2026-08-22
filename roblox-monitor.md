# Forge Gen 2 — v2.1 Bug Fixes & Improvements

## Bugs Found & Fixed

### 1. Hash Navigation Broken — CRITICAL
**Problem:** Clicking "Testimonials" in the nav called `window.scrollTo(0, 0)` instead of scrolling to `#testimonials`. The router intercepted ALL `href="/..."` links and forced a scroll-to-top, destroying hash navigation.

**Fix:** 
- Added `class="nav-hash"` to hash links (separate from `data-route` links)
- Hash links now get their own event listener that calls `element.scrollIntoView({ behavior: 'smooth' })`
- Router only intercepts links WITHOUT hashes
- `handleHash()` now forces `display: ''` on the target section before scrolling

### 2. Counter Decimal Precision Wrong
**Problem:** `data-count="99.97"` used `toFixed(1)` which rounded to `100.0`. The `isFloat = target % 1 !== 0` check only detected floats, not decimal places.

**Fix:** 
- Detect decimal places from the raw `data-count` string: `(decimalStr.split('.')[1] || '').length`
- `99.97` → `toFixed(2)` → `99.97%`
- `4.9` → `toFixed(1)` → `4.9/5`
- `12000` → `Math.floor` + `toLocaleString()` → `12,000+`
- Added `data-suffix` attribute for `%`, `min`, `+`, `/5` suffixes

### 3. Counters Animate on Load, Not on Scroll
**Problem:** `animateCounters()` ran immediately on `DOMContentLoaded`. If user landed at `/#testimonials`, hero counters animated off-screen and testimonial stats never animated.

**Fix:** 
- Replaced immediate call with `IntersectionObserver` (threshold: 0.5)
- Counters only animate when 50% visible in viewport
- Each counter tracked with `WeakSet` to prevent double-animation

### 4. Game Card Image 404
**Problem:** `https://tr.rbxcdn.com/180DAY-...` was a fake/placeholder URL. The card image failed to load.

**Fix:** 
- Replaced `<img>` with a CSS gradient `<div>` containing Lucide icon + game name
- No external image dependency — renders instantly and reliably
- Still has hover scale effect on the placeholder

### 5. Hero Flash of Invisible Content (FOUC)
**Problem:** Hero elements had `class="reveal"` which set `opacity: 0` until IntersectionObserver fired. Users saw blank hero for a split second.

**Fix:** 
- Removed `.reveal` class from all above-fold hero elements
- Hero content renders immediately on paint
- `.reveal` kept only for below-fold sections

### 6. Modal Focus Not Trapped
**Problem:** Pressing Tab inside the modal moved focus to background elements. No focus management on open/close.

**Fix:** 
- Save `document.activeElement` before opening modal
- Restore focus to saved element on modal close
- Tab key now cycles within modal focusable elements (first ↔ last)
- Shift+Tab also trapped correctly

### 7. Mobile Menu: No Outside-Click Close
**Problem:** Clicking the dark area outside the mobile menu did nothing. Users had to click the hamburger again.

**Fix:** 
- Added `.menu-overlay` div behind the menu
- Clicking overlay closes menu
- Overlay fades in/out with CSS transition

### 8. Theme Toggle Re-Creates Lucide Icons
**Problem:** `lucide.createIcons()` was called on every theme toggle, potentially duplicating SVGs or causing glitches.

**Fix:** 
- Removed `lucide.createIcons()` from theme toggle handler
- Icon swap is now pure CSS (`.theme-dark .theme-icon-light` etc.)
- Theme toggle only toggles the body class + persists to localStorage

## Additional Improvements

- **Hero stat labels cleaned up:** `data-suffix` handles `%`, `min`, `+`, `/5` — no more hardcoded label text like `% Uptime` + `0` counter
- **Passive scroll listener:** `{ passive: true }` on scroll event for better performance
- **Copy fallback improved:** Hidden textarea uses `position: fixed; opacity: 0` instead of default positioning
- **Permissions-Policy header:** Added `camera=(), microphone=(), geolocation=()` to vercel.json
- **Game card uses semantic placeholder:** Gradient + icon instead of broken external image
- **Nav link separation:** `data-route` links for SPA routing, `nav-hash` class for in-page anchors — no overlap
