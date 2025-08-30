# ThinkHome Ghost Theme Specification

## Design Brief
A terminal-inspired Ghost theme featuring sharp flat geometry, monospace typography, and high-contrast black/white aesthetics. Designed for developers and technical content creators who value clarity and minimalism.

## Palette Variables
```css
:root {
  --bg-primary: #000000;     /* Pure black background */
  --bg-secondary: #111111;   /* Slightly lighter black for cards */
  --fg-primary: #FFFFFF;     /* Pure white text */
  --fg-secondary: #CCCCCC;   /* Light gray for secondary text */
  --fg-muted: #888888;       /* Medium gray for metadata */
  --accent: #00FF00;         /* Terminal green for highlights */
  --border: #333333;         /* Dark gray for borders */
  --error: #FF0000;          /* Red for errors */
}
```

## Typography
- **Primary Font**: `'IBM Plex Mono', 'SF Mono', 'Monaco', 'Inconsolata', monospace`
- **Scale**: Base 16px, headings 1.25rem, 1.5rem, 2rem, 2.5rem
- **Weights**: Regular (400) for body, Medium (500) for headings
- **Line Height**: 1.6 for body text, 1.2 for headings
- **Letter Spacing**: 0.025em for improved monospace readability

## Grid & Layout System
- **Container**: Max-width 1200px, centered with 2rem padding
- **Breakpoints**: Mobile 768px, Tablet 1024px, Desktop 1200px+
- **Grid**: CSS Grid with 12-column system, 2rem gaps
- **Cards**: Sharp rectangular borders, no border-radius, 1px solid borders
- **Spacing Scale**: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

## Required Templates
- `default.hbs` - Base layout with Ghost 6.0 social web meta tags
- `index.hbs` - Post listing with pagination (max 100 posts per Ghost 6.0)
- `post.hbs` - Single post with social web integration
- `page.hbs` - Static pages
- `tag.hbs` - Tag archive pages
- `author.hbs` - Author profile pages
- `error.hbs` - 404 and error pages
- `partials/header.hbs` - Site navigation
- `partials/footer.hbs` - Site footer with social links
- `partials/post-card.hbs` - Reusable post preview component

## Key CSS Components
- **Buttons**: Rectangular, 2px solid border, no background, hover inverts colors
- **Links**: Underlined, terminal green color, no hover animations
- **Code Blocks**: Black background, green text, 1px border, monospace font
- **Header**: Fixed position, black background, white text, sharp bottom border
- **Footer**: Minimal, centered text, social icons as text characters
- **Focus States**: 2px solid accent outline, no border-radius

## UX Patterns & Features
- **Navigation**: Sticky header with text-based menu items
- **Images**: Lazy loading with Ghost's responsive image helpers
- **Accessibility**: WCAG AA contrast ratios, keyboard navigation support
- **Analytics**: Ghost 6.0 native analytics integration hooks
- **Social Web**: ActivityPub meta tags and social interaction buttons
- **Search**: Built-in Ghost search with terminal-style results

## Ghost 6.0 Compatibility Notes
- Remove all `?limit=all` API calls, use pagination with max 100 items <mcreference link="https://brightthemes.com/blog/ghost-v6?utm_source=chatgpt.com" index="4">4</mcreference>
- Ensure Node.js 22 compatibility in package.json engines field <mcreference link="https://brightthemes.com/blog/ghost-v6?utm_source=chatgpt.com" index="4">4</mcreference>
- Include Ghost 6.0 social web meta tags in `{{ghost_head}}` helper <mcreference link="https://ghost.org/changelog/6/?utm_source=chatgpt.com" index="1">1</mcreference>
- Use new analytics helpers for tracking content performance <mcreference link="https://ghost.org/changelog/6/?utm_source=chatgpt.com" index="1">1</mcreference>
- Validate with latest gscan tool before deployment <mcreference link="https://docs.ghost.org/themes?utm_source=chatgpt.com" index="2">2</mcreference>
- Support new payment methods and currency options in member templates

## Optional Enhancements
- **Light Mode Toggle**: CSS custom properties swap for white background/black text
- **Code Syntax Highlighting**: Prism.js integration with terminal color scheme
- **Custom Settings**: Theme options for accent color and font size via Ghost admin
- **Terminal Cursor**: Blinking cursor animation for headings and CTAs
- **ASCII Art**: Optional ASCII logo support in header
- **Keyboard Shortcuts**: Vim-style navigation (j/k for scroll, / for search)

## File Structure
```
thinkhome-theme/
├── package.json          # Ghost 6.0 compatible metadata
├── default.hbs          # Base template with social web support
├── index.hbs            # Post listing with pagination
├── post.hbs             # Single post template
├── page.hbs             # Static page template
├── tag.hbs              # Tag archive template
├── author.hbs           # Author profile template
├── error.hbs            # Error page template
├── partials/
│   ├── header.hbs       # Site navigation
│   ├── footer.hbs       # Site footer
│   └── post-card.hbs    # Post preview component
└── assets/
    ├── css/
    │   ├── main.css     # Core styles
    │   └── components.css # Component styles
    └── js/
        └── main.js      # Theme JavaScript
```

## Implementation Priority
1. Core templates (default, index, post)
2. CSS variables and typography system
3. Component styling (buttons, forms, cards)
4. Ghost 6.0 integration features
5. Accessibility and performance optimizations
6. Optional enhancements and customizations