# ThinkHome Ghost Theme

A terminal-inspired, flat design Ghost theme that embodies sharp geometry, minimalist aesthetics, and code-like functionality. Built for Ghost 6.0+ with modern web standards and accessibility in mind.

## Features

### Design Philosophy
- **Terminal-inspired aesthetics**: Monospace typography, flat colors, sharp edges
- **Minimalist approach**: Clean layouts with focus on content
- **Code-like UI**: Terminal prompts, command-style navigation, syntax highlighting
- **Flat design**: No gradients, shadows, or rounded corners - pure geometric shapes

### Technical Features
- ✅ **Ghost 6.0+ compatibility** - Full support for latest Ghost features
- ✅ **Social web integration** - Open Graph, Twitter Cards, structured data
- ✅ **Responsive design** - Mobile-first approach with fluid layouts
- ✅ **Dark/light theme toggle** - System preference detection with manual override
- ✅ **Keyboard navigation** - Terminal-inspired shortcuts and accessibility
- ✅ **Search functionality** - Built-in Ghost search with terminal-style results
- ✅ **Member support** - Complete authentication and subscription management
- ✅ **Terminal animations** - Cursor effects and command-line aesthetics
- ✅ **Performance optimized** - Lighthouse 95+ scores across all metrics
- ✅ **SEO optimized** - Structured data, meta tags, and sitemap integration
- ✅ **Accessibility** - WCAG AA compliant with screen reader support
- ✅ **Code highlighting** - Syntax highlighting for technical content

## Installation

### Method 1: Direct Upload
1. Download the theme files
2. Zip the entire theme folder
3. Go to Ghost Admin → Design → Upload theme
4. Select the zip file and activate

### Method 2: Git Clone
```bash
cd /path/to/ghost/content/themes/
git clone https://github.com/SamuelPalubaCZ/thinkhome-theme.git thinkhome-theme
cd thinkhome-theme
npm install
npm run build
```

### Method 3: GitHub Release
1. Download the latest release from [GitHub Releases](https://github.com/SamuelPalubaCZ/thinkhome-theme/releases)
2. Extract and upload to Ghost Admin → Design → Upload theme

## Configuration

### Theme Settings
Access these settings in Ghost Admin → Design → Customize:

- **Accent Color**: Primary accent color for links and highlights
- **Font Size**: Base font size (small, medium, large)
- **Show Cursor**: Display terminal cursor animations
- **Color Scheme**: Dark or light mode preference

### Navigation Setup
1. Go to Ghost Admin → Design → Navigation
2. Add your menu items
3. The theme supports both primary and secondary navigation

### Social Links
Configure social media links in Ghost Admin → Settings → General:
- Facebook URL
- Twitter username
- RSS feed (automatically generated)

## Keyboard Shortcuts

The theme includes terminal-inspired keyboard navigation:

- **`/`** - Open search overlay
- **`Esc`** - Close search/modals
- **`Enter`** - Submit search or navigate
- **`Tab`** - Navigate through interactive elements
- **`Space`** - Scroll down (when not in input fields)

## Theme Structure

### Core Templates
- **`default.hbs`** - Base layout with header, footer, and search overlay
- **`index.hbs`** - Homepage with post listings and pagination
- **`post.hbs`** - Individual post template with related posts
- **`page.hbs`** - Static page template
- **`tag.hbs`** - Tag archive with post filtering
- **`author.hbs`** - Author profile and post listings
- **`error.hbs`** - 404 and error pages with terminal aesthetics

### Member Templates
- **`members/signin.hbs`** - Member sign-in form
- **`members/signup.hbs`** - Member registration form
- **`members/account.hbs`** - Account management interface

### Partials
- **`partials/header.hbs`** - Site navigation and search toggle
- **`partials/footer.hbs`** - Footer with social links and RSS
- **`partials/card.hbs`** - Reusable post card component
- **`partials/icons/`** - SVG icon components

## Customization

### CSS Variables
The theme uses CSS custom properties for easy customization:

```css
:root {
  /* Colors */
  --bg-primary: #000000;
  --fg-primary: #ffffff;
  --accent: #00ff00;
  
  /* Typography */
  --font-mono: 'IBM Plex Mono', 'SF Mono', Monaco, monospace;
  --font-size-base: 16px;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
}
```

### Custom Code Injection
Add custom styles or scripts in Ghost Admin → Design → Code Injection:

**Header:**
```html
<style>
  /* Your custom CSS */
</style>
```

**Footer:**
```html
<script>
  // Your custom JavaScript
</script>
```

&nbsp;

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: < 50KB (CSS + JS combined)
- **Image Optimization**: WebP support with fallbacks

## Member Features

The theme includes full Ghost membership support:

- **Sign-in/Sign-up pages**: Custom styled member authentication
- **Account management**: Member profile and subscription management
- **Content gating**: Support for member-only content
- **Newsletter integration**: Built-in newsletter subscription forms

## Development Features

🔁&nbsp;**Live reload**: See changes instantly during development

🔎&nbsp;**VS Code optimized**: Enhanced development experience

🗃️&nbsp;**Modern JavaScript**: ESM modules and modern syntax

🗜️&nbsp;**Asset optimization**: Automatic minification and transpilation

👟&nbsp;**Fast builds**: Powered by [Rollup](https://rollupjs.org)

🦋&nbsp;**PostCSS**: Modern CSS with [PostCSS](https://postcss.org/)

🚢&nbsp;**Auto deployment**: GitHub Actions workflow included

✅&nbsp;**Theme validation**: GScan integration for Ghost compatibility

&nbsp;

## Troubleshooting

### Common Issues

**Theme not activating:**
- Ensure all required files are present (`package.json`, `default.hbs`, `index.hbs`, `post.hbs`)
- Check Ghost version compatibility (requires Ghost 6.0+)
- Verify Node.js version (requires Node 22+)

**Search not working:**
- Ensure Ghost search is enabled in Labs settings
- Check that JavaScript is not blocked by browser/extensions
- Verify the search overlay HTML is present in `default.hbs`

**Styles not loading:**
- Run `npm run build` to compile CSS assets
- Check that `assets/built/` directory exists and contains compiled files
- Verify Ghost can access the `assets` directory

**Performance issues:**
- Enable Ghost's built-in image optimization
- Use WebP images where possible
- Check for JavaScript errors in browser console

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/SamuelPalubaCZ/thinkhome-theme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SamuelPalubaCZ/thinkhome-theme/discussions)
- **Ghost Documentation**: [Official Ghost Themes Docs](https://ghost.org/docs/themes/)

&nbsp;

## Development guide

The Starter theme provides a first-class development experience out of the box. 

&nbsp;

### Setup

To see realtime changes during development, symlink the ThinkHome theme folder to the `content/themes` folder in your local Ghost install. 

```bash
ln -s /path/to/thinkhome-theme /ghost/content/themes/thinkhome-theme
```

Restart Ghost and select the ThinkHome theme from **Settings**.

From the theme's root directory, install the dependencies:

```bash
npm install
```

If Node isn't installed, follow the [official Node installation guide](https://nodejs.org/).

&nbsp;

### Start development mode

From the ThinkHome theme folder, start development mode:

```bash
npm run dev
```

Changes you make to your styles, scripts, and Handlebars files will show up automatically in the browser. CSS and Javascript will be compiled and output to the `built` folder.

Press `ctrl + c` in the terminal to exit development mode.

&nbsp;

### Build, zip, and test your theme

Compile your CSS and JavaScript assets for production with the following command:

```bash
npm run build
```

Create a zip archive:

```bash
npm run zip
```

Use `gscan` to test your theme for compatibility with Ghost:

```bash
npm run test
```

### Deployment

The theme includes automatic deployment via GitHub Actions:

1. **Set up secrets** in your GitHub repository:
   - `GHOST_ADMIN_API_URL` - Your Ghost admin URL
   - `GHOST_ADMIN_API_KEY` - Your Ghost admin API key

2. **Push to main branch** - The workflow will automatically:
   - Build the theme assets
   - Run GScan validation
   - Deploy to your Ghost site

3. **Manual deployment**:
   ```bash
   npm run zip
   ```
   Upload the generated zip file to Ghost Admin → Design → Upload theme

&nbsp;



## Copyright & License

Copyright (c) 2025 Samuel Paluba - Released under the [MIT license](LICENSE).
