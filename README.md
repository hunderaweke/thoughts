# Papyrus Blog Theme

A beautiful, elegant blog built with Hugo and Tailwind CSS featuring the Papyrus theme.

## Features

### 🎨 Design

- **EB Garamond** font for elegant, classical typography
- **Inter** font for modern UI elements and navigation
- Clean, minimalist aesthetic with attention to detail
- Responsive design that works on all devices

### 🌓 Theme Support

- **Light and Dark modes** with smooth transitions
- Theme preference saved in localStorage
- Easy toggle button in the header
- Carefully crafted color palettes for both modes

### 📑 Navigation

- **Sidebar navigation** with:
  - List of all blog posts
  - Table of contents for current post
  - Sticky positioning for easy access
- **Header navigation** with menu items
- **Mobile-responsive** menu

### 📝 Blog Features

- Beautiful blog post layouts with:
  - Reading time estimates
  - Publication dates
  - Tag system for categorization
  - Automatic table of contents generation
- Homepage with post summaries
- Tag and category pages
- SEO-optimized metadata

### 🎯 Footer

- Personal bio section
- Social media links (GitHub, Twitter, Email)
- Copyright information
- Responsive layout

## Getting Started

### Prerequisites

- Hugo (extended version)
- Node.js and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run Hugo development server:

```bash
hugo server -D
```

3. Build for production:

```bash
hugo --minify
```

## Project Structure

```
blogs/
├── content/           # Your blog posts and pages
├── themes/
│   └── papyrus/      # The Papyrus theme
│       ├── assets/
│       │   ├── css/  # Tailwind CSS styles
│       │   └── js/   # Theme toggle and interactions
│       └── layouts/  # HTML templates
├── hugo.toml         # Hugo configuration
├── tailwind.config.mjs
└── postcss.config.mjs
```

## Writing Posts

Create a new post in the `content/` directory:

```markdown
---
title: "Your Post Title"
date: 2025-12-17T10:00:00-07:00
tags: ["tag1", "tag2", "tag3"]
---

Your content here...
```

## Customization

### Colors

Edit the color variables in `themes/papyrus/assets/css/main.css`:

- Light theme: `--color-*` variables
- Dark theme: `--color-dark-*` variables

### Footer

Update the footer content in `themes/papyrus/layouts/_partials/footer.html`

### Menu

Add menu items in `hugo.toml`:

```toml
[[menus.main]]
  name = "Home"
  pageRef = "/"
  weight = 10
```

## Typography

### Font Pairing

- **EB Garamond**: Used for headings and body text - elegant, classical serif
- **Inter**: Used for UI elements, dates, and metadata - clean, modern sans-serif

This combination creates a sophisticated balance between traditional readability and modern design.

## License

This blog theme is open source and available for personal and commercial use.

## Credits

Built with:

- [Hugo](https://gohugo.io/)
- [Tailwind CSS](https://tailwindcss.com/)
