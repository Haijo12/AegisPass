# Changelog

## [Unreleased]

### Added
- Discord webhook integration for website suggestions (`script.js`)
- "Suggest an improvement" link in footer (`index.html`)
- Confirmation prompt before sending suggestions
- Button loading state with spinner animation
- `body.menu-open` and `body.modal-open` scroll lock classes
- `loading="lazy"` to all below-fold images
- `role` and `aria-*` accessibility attributes to nav, modal, and buttons
- `:focus-visible` outline styles
- `--bg-rgb` CSS variables for proper semi-transparent backgrounds
- `img { display: block; max-width: 100%; }` reset

### Changed
- Simplified contact/suggestion form to only require **title** and **suggestion**
- Updated Discord webhook payload to use `title` and `suggestion` fields
- Updated contact hint text to mention suggestions
- Fixed duplicate `.project-link` CSS definition that was stripping button styles
- Fixed mobile nav background to use `rgba(var(--bg-rgb), 0.95)` so `backdrop-filter` works
- Fixed theme toggle and menu toggle alignment with `.header-actions` wrapper
- Reorganized footer layout into `.footer-actions` group for better alignment
- Added font smoothing (`-webkit-font-smoothing`, `-moz-osx-font-smoothing`, `text-rendering`)
- Added `aspect-ratio: 5 / 4; object-fit: cover;` to hero image to prevent layout shift
- Fixed inconsistent `src` attribute indentation on images
- Improved responsive spacing and transitions throughout

### Fixed
- Image rendering issues (inline spacing, layout shift)
- Misaligned header elements (theme toggle, menu button)
- Misaligned footer elements (social links, suggestion link)
- Mobile menu backdrop blur not working
- Scroll not locked when mobile menu or contact modal is open
- Focus styles missing on interactive elements
- Duplicate CSS definitions causing style conflicts
