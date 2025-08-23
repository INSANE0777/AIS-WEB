
Notes:
- These variables are referenced in app/join/appwrite/app.js and app/join/page.tsx.
- The Join page falls back to mock IDs if env vars are not provided, but real persistence requires valid Appwrite configuration.

## Available Scripts

- dev: Start the Next.js dev server (hot reload)
- build: Production build
- start: Start the production server after build
- lint: Run Next.js ESLint

Refer to package.json for the full scripts list.

## Key Components & Pages

- Layout (app/layout.tsx)
  - Poppins font, global metadata, favicon links
  - ReactLenis root provider for smooth scrolling
  - Custom cursor container
  - Global FluidGradient background, RightScrollProgress, SpaceshipNavigation, SpaceFooter
  - PageTransition wrapper for route changes

- Home (app/page.tsx)
  - Sections: About, Teams, Leadership, Stats, Timeline
  - Scroll-based GSAP animations and ParallaxHero
  - CursorFollower and FluidGradient enhancements

- Projects (app/projects/page.tsx)
  - Projects listing using data from data/projects.ts
  - UI elements: Card, Button, Badge, MagneticButton, and more

- Events (app/event/page.tsx)
  - Interactive galleries; mobile-optimized animations patterns

- Announcements (app/announcements/page.tsx)
  - Animated cards with category-based styling and iconography

- Join (app/join/page.tsx)
  - Appwrite client setup in app/join/appwrite/app.js
  - Rich form with react-hook-form + zod validation
  - Dynamic department selection, saved local state, toasts

- UI Primitives (components/ui/*)
  - Buttons, Inputs, Dialogs, Sheets, Popovers, Tabs, Select, Tooltip, Switch, Slider, Calendar, Toast, Command, etc.
  - Tailwind-based, accessible, and theme-aware

## Styling & Theming

- Tailwind CSS configured in tailwind.config.js with custom theme extensions:
  - Colors mapped to CSS variables for dynamic theming
  - Custom radii, animations, fonts
- Global CSS: app/globals.css + styles/globals.css
- Dark mode via next-themes and Tailwind dark class
- shadcn/ui style conventions (utility-first with composition)

## Animations & Motion

- GSAP + ScrollTrigger for scroll-triggered reveals and timelines across sections (e.g., About, Timeline, Stats)
- Lenis for smooth, consistent scroll (ReactLenis root provider in layout)
- Framer Motion for micro-interactions and UI feedback (e.g., TakeWhatYouNeed, cards, buttons)
- Embla Carousel for carousels
- Page transitions via components/page-transition.tsx

## Development Notes

- next.config.mjs:
  - ESLint and TypeScript build checks are disabled for production builds:
    - eslint.ignoreDuringBuilds: true
    - typescript.ignoreBuildErrors: true
  - Images are unoptimized (images.unoptimized: true)

- TypeScript:
  - Strict mode enabled
  - Module resolution via bundler
  - Aliases: "@/..." pointing to project root

- Custom Cursor:
  - Body has class has-custom-cursor and #custom-cursor-container mounts the cursor component

- Folder Organization:
  - Domain-specific components live under components/
  - UI primitives under components/ui/
  - Data in data/
  - Appwrite client in app/join/appwrite/

## Acknowledgements

- Next.js, React, TypeScript
- Tailwind CSS, shadcn/ui, Radix UI
- GSAP, Lenis, Framer Motion, Embla
- lucide-react icons
- Appwrite