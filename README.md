# Venna Shopify Theme

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Shopify 2.0](https://img.shields.io/badge/Shopify-2.0-96bf48.svg)](https://shopify.dev/themes)

A modern, feature-rich Shopify 2.0 theme built with a focus on performance, customization, and developer experience. This theme demonstrates advanced Liquid templating, modular section architecture, and professional-grade e-commerce functionality.

---

## 🎯 Why This Repository Matters for Shopify Full-Stack Development

This project showcases hands-on expertise in **Shopify theme development**, a core responsibility for Shopify Full-Stack Developers. It demonstrates:

- **Proficiency in Shopify 2.0 architecture**: Deep understanding of sections, blocks, JSON templates, and schema-driven customization
- **Advanced Liquid templating**: Complex logic, filters, and dynamic content rendering
- **Theme performance optimization**: Lazy loading, efficient asset management, and modern JavaScript patterns
- **Scalable development practices**: Modular components, maintainable code structure, and CLI-based workflows

This repository reflects the technical skills needed to build, customize, and maintain production-ready Shopify storefronts at scale.

---

## ✨ Key Features

### Core Functionality
- **90+ Customizable Sections**: Extensive library including hero sliders, product showcases, testimonials, galleries, and more
- **Advanced Product Features**:
  - Product bundles (compact and floating layouts)
  - Recently viewed products
  - Quick order lists
  - Volume pricing
  - Gift wrapping and validation
  - Pickup availability
- **Enhanced Shopping Experience**:
  - Age verification modal with cookie persistence
  - Newsletter popup with customizable delays
  - Mobile dock navigation
  - Search drawer with instant results
  - Cart drawer with real-time updates
  - Cookie banner for GDPR compliance

### Content & Marketing
- **Flexible Content Blocks**: Rich text, image galleries, video sections, countdown timers, FAQs
- **Blog & Articles**: Advanced blog layouts with tag filtering and collage views
- **Interactive Elements**: Image comparison sliders, lookbooks, scrolling banners, timeline sections
- **Portfolio & Showcases**: On-scroll animations, reveal effects, shop-the-look functionality

### Customer Experience
- **Complete Account Management**: Login, registration, password reset, address management, order history
- **Localization Ready**: 25+ language translations (JSON locale files)
- **Market-Specific Features**: Context-aware templates for different geographical regions (Europe, South America)
- **Accessibility First**: Keyboard navigation, ARIA labels, semantic HTML structure

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Liquid** | Shopify's templating language for dynamic content rendering |
| **JSON** | Schema definitions, settings, and template structures |
| **JavaScript (ES6+)** | Custom web components, interactive features, and cart logic |
| **CSS3** | Styling with CSS variables, Tailwind-inspired utilities, and responsive design |
| **Shopify CLI** | Local development, theme deployment, and hot-reloading |
| **Web Components** | Custom elements for modular, reusable functionality |

**Key JavaScript Patterns**:
- Custom element extensions (`HTMLElement`, `DrawerElement`, `ModalElement`)
- Class-based components for cart, search, modals, and navigation
- Lazy loading for images and background elements
- Event delegation for performance

---

## 📁 Directory Overview

```
venna-shopify-theme/
│
├── assets/              # Static assets (CSS, JS, fonts, images)
│   ├── theme.css       # Main stylesheet
│   ├── theme.js        # Core JavaScript functionality
│   ├── cart.js         # Cart drawer and logic
│   ├── search.js       # Search functionality
│   ├── newsletter-popup.js
│   ├── age-verifier.js
│   └── ...             # Feature-specific scripts and styles
│
├── config/             # Theme configuration
│   ├── settings_schema.json    # Theme customizer settings
│   ├── settings_data.json      # Current theme settings
│   └── markets.json            # Market-specific configurations
│
├── layout/             # HTML structure templates
│   ├── theme.liquid            # Main layout wrapper
│   └── password.liquid         # Password-protected store layout
│
├── locales/            # Translation files (25+ languages)
│   ├── en.default.json         # English translations
│   ├── en.default.schema.json  # English schema translations
│   └── ...                     # Other languages (es, fr, de, ja, etc.)
│
├── sections/           # Modular, reusable theme sections
│   ├── header.liquid           # Site header
│   ├── footer.liquid           # Site footer
│   ├── main-product.liquid     # Product page template
│   ├── featured-collection.liquid
│   ├── slideshow-hero.liquid
│   ├── video-with-text.liquid
│   └── ...                     # 90+ sections
│
├── snippets/           # Reusable Liquid components
│   ├── alert.liquid
│   └── ...                     # Helper snippets
│
└── templates/          # Page templates (JSON-based)
    ├── index.json              # Homepage template
    ├── product.json            # Product page template
    ├── collection.json         # Collection page template
    ├── page.json               # Standard page template
    ├── customers/              # Customer account templates
    └── ...                     # Context-specific templates
```

---

## 🚀 Getting Started

### Prerequisites

- **Shopify Partner Account** or access to a Shopify store
- **Shopify CLI** installed ([Installation Guide](https://shopify.dev/themes/tools/cli/install))
- **Node.js** (v16+ recommended)
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/abrahao-dev/venna-shopify-theme.git
   cd venna-shopify-theme
   ```

2. **Authenticate with Shopify CLI**
   ```bash
   shopify auth login
   ```

3. **Start local development server**
   ```bash
   shopify theme dev
   ```
   This will:
   - Upload the theme to a development store
   - Start a local server with hot-reloading
   - Provide a preview URL (typically `http://127.0.0.1:9292`)

4. **Open the preview URL** in your browser to see the theme in action

### Alternative: Pull an Existing Theme

If you want to work with a live theme from your store:

```bash
shopify theme pull --store=your-store.myshopify.com
```

---

## ⚙️ Configuration

### Theme Settings

Edit global theme settings via the Shopify admin:

1. Navigate to **Online Store > Themes**
2. Click **Customize** on the active theme
3. Access **Theme Settings** in the left sidebar

Key settings include:
- **Logo & Branding**: Upload logos, set favicon
- **Colors**: Customize color schemes (text, background, buttons, highlights)
- **Typography**: Configure font families and sizes
- **Layout**: Set page width, section padding, and spacing
- **Product Settings**: Image ratios, badges, quick view options

Settings are defined in `config/settings_schema.json` and stored in `config/settings_data.json`.

### Sections

Sections are the building blocks of pages. Each section in the `sections/` directory includes:
- **Liquid markup**: HTML structure with dynamic content
- **Schema definition**: JSON schema for customization options (settings, blocks, presets)
- **Localized strings**: Translation keys for multi-language support

**Example: Adding a section to a page**
1. Navigate to the page in the theme customizer
2. Click **Add section**
3. Choose from 90+ available sections
4. Configure section-specific settings

### Locales

The theme supports 25+ languages via JSON locale files in `locales/`. To add a new translation:

1. Duplicate `en.default.json` and `en.default.schema.json`
2. Rename with appropriate locale code (e.g., `pt-BR.json`)
3. Translate all string values
4. Update the `locales` object in `config/settings_data.json`

---

## 🎨 Customization Guide

### Creating a New Section

1. **Create a new `.liquid` file** in the `sections/` directory:
   ```liquid
   <!-- sections/custom-hero.liquid -->
   <div class="custom-hero">
     <h1>{{ section.settings.heading }}</h1>
     <p>{{ section.settings.description }}</p>
   </div>

   {% schema %}
   {
     "name": "Custom Hero",
     "settings": [
       {
         "type": "text",
         "id": "heading",
         "label": "Heading",
         "default": "Welcome"
       },
       {
         "type": "textarea",
         "id": "description",
         "label": "Description"
       }
     ],
     "presets": [
       {
         "name": "Custom Hero"
       }
     ]
   }
   {% endschema %}
   ```

2. **Use the section** in a JSON template or add via the customizer

### Modifying Existing Sections

Sections use the Shopify 2.0 schema format. Key schema properties:
- **`settings`**: Define customization inputs (text, color, image pickers, etc.)
- **`blocks`**: Repeatable content elements within a section
- **`presets`**: Default configurations for quick setup

**Example: Adding a new setting**
```json
{
  "type": "color",
  "id": "custom_background",
  "label": "Background Color",
  "default": "#ffffff"
}
```

### Custom JavaScript

The theme uses custom web components for interactive features. Example structure:

```javascript
// assets/custom-component.js
class CustomComponent extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    // Component logic
  }
}

customElements.define('custom-component', CustomComponent);
```

Include in `layout/theme.liquid`:
```liquid
<script src="{{ 'custom-component.js' | asset_url }}" defer="defer"></script>
```

---

## ⚡ Performance & Quality

### Performance Optimizations

- **Lazy Loading**: Images and background elements load on demand
  - Custom `<lazy-image>` and `<lazy-background>` components
  - Native `loading="lazy"` attribute support
- **Asset Optimization**:
  - Preloaded critical CSS (`theme.css`)
  - Deferred JavaScript loading
  - Font preconnect for faster typography rendering
- **Efficient Rendering**: Conditional asset loading (e.g., RTL styles only when needed)
- **Modern JavaScript**: ES6+ syntax with custom elements for better browser performance

### Code Quality

- **Modular Architecture**: Separation of concerns (sections, snippets, templates)
- **Schema-Driven Development**: All customizations defined via JSON schemas
- **Reusable Components**: DRY principle with snippets and blocks
- **Clean Liquid**: Efficient use of filters, loops, and conditional logic

---

## ♿ Accessibility & SEO

### Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<footer>` elements
- **ARIA Labels**: `aria-label`, `aria-expanded`, `aria-controls` for interactive elements
- **Keyboard Navigation**: Focus states and keyboard-accessible modals/drawers
- **Screen Reader Support**: `sr-only` classes and descriptive text for assistive technologies
- **Color Contrast**: Customizable color schemes with high-contrast defaults

### SEO Best Practices

- **Meta Tags**: Dynamic title, description, and social meta tags
- **Canonical URLs**: Proper canonical link handling
- **Structured Data**: Schema-ready templates for products and articles
- **Performance**: Fast load times improve search rankings
- **Mobile-Friendly**: Responsive design for mobile-first indexing

---

## ✅ Testing & Review Checklist

Before deploying, ensure:

- [ ] **Theme Check**: Run `shopify theme check` for Liquid linting
- [ ] **Browser Testing**: Test on Chrome, Firefox, Safari, Edge
- [ ] **Device Testing**: Verify responsive design on mobile, tablet, desktop
- [ ] **Accessibility Audit**: Run Lighthouse or axe DevTools
- [ ] **Performance Check**: Lighthouse performance score (aim for 90+)
- [ ] **Cross-Browser Compatibility**: Test JavaScript features across browsers
- [ ] **Localization**: Verify translations render correctly
- [ ] **Cart & Checkout**: Test cart functionality, product variants, checkout flow
- [ ] **Forms**: Validate customer forms (login, registration, contact, newsletter)
- [ ] **Links & Navigation**: Check all internal/external links

### Running Theme Check

```bash
shopify theme check
```

This validates:
- Liquid syntax errors
- Performance issues
- Accessibility violations
- Shopify best practices

---

## 🚢 Deployment

### Deploy to Live Store

1. **Push theme to Shopify**
   ```bash
   shopify theme push --store=your-store.myshopify.com
   ```

2. **Publish the theme**
   - Go to **Online Store > Themes** in Shopify admin
   - Click **Actions > Publish** on the uploaded theme

### Deploy to a Specific Environment

```bash
# Development environment
shopify theme push --development

# Production environment
shopify theme push --live
```

### Continuous Deployment (Optional)

For automated deployments, consider:
- **GitHub Actions**: Set up workflows for automatic theme deployment on push
- **Shopify Theme Kit** (legacy): Alternative CLI tool for CI/CD pipelines

---

## 🗺️ Roadmap

Potential future enhancements:

- [ ] Add TypeScript for improved type safety in JavaScript
- [ ] Implement progressive web app (PWA) features
- [ ] Add automated visual regression testing
- [ ] Create Storybook for section/component documentation
- [ ] Integrate headless commerce capabilities (Hydrogen compatibility)
- [ ] Add performance monitoring and analytics
- [ ] Expand accessibility testing automation

---

## 📸 Screenshots

<!-- Add screenshots of key sections/pages when available -->
*Coming soon: Homepage, product page, cart drawer, and theme customizer examples*

---

## ❓ FAQ

**Q: How do I add a new section?**
A: Create a `.liquid` file in the `sections/` directory with a `{% schema %}` block. The section will automatically appear in the theme customizer.

**Q: Can I use this theme for multiple stores?**
A: Yes, the MIT license allows commercial use. You can deploy this theme to any Shopify store.

**Q: How do I customize colors?**
A: Go to **Theme Settings > Colors** in the Shopify customizer. All color settings use CSS variables for consistency.

**Q: Where are cart and checkout settings?**
A: Cart settings are in `sections/cart-drawer.liquid`. Checkout customization requires Shopify Plus or is handled in Shopify admin settings.

**Q: How do I add a new language?**
A: Duplicate the `en.default.json` file in `locales/`, rename it with the appropriate locale code, and translate all strings.

**Q: What's the difference between sections and snippets?**
A: Sections are standalone, schema-driven components that can be added/removed via the customizer. Snippets are reusable code partials called from sections or templates.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2025 Matheus Abrahão

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share your experience using the theme

---

## 📬 Contact

**Matheus Abrahão**
GitHub: [@abrahao-dev](https://github.com/abrahao-dev)

---

**Built with 💙 for the Shopify ecosystem**