# AIS-WEB 🌟

**AI Society - Bennett University Official Website**

A modern, interactive website for the Artificial Intelligence Society at Bennett University, featuring cutting-edge animations, project showcases, and member registration capabilities.

## 🚀 Live Demo

Visit our website: [ai-society.club](https://ai-society.club)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Data Management](#data-management)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎨 Interactive Design
- **Smooth Animations**: GSAP-powered animations with mobile optimization
- **Custom Cursor**: Interactive cursor effects for desktop users
- **Parallax Effects**: Immersive scrolling experiences
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Page Transitions**: Smooth transitions between pages

### 📱 Pages & Functionality
- **Homepage**: Hero section, stats, about, teams, and leadership showcase
- **Projects**: Dynamic project gallery with detailed views
- **Events**: Event timeline and detailed event pages
- **Join Us**: Comprehensive registration form with Appwrite integration
- **Announcements**: Latest society updates and news

### 🔧 Technical Features
- **Form Validation**: Zod schema validation with React Hook Form
- **Database Integration**: Appwrite backend for form submissions
- **Smooth Scrolling**: Lenis-powered smooth scrolling
- **Performance Optimized**: Mobile-optimized animations and reduced motion support
- **SEO Ready**: Meta tags and structured data

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations and scroll triggers

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend & Database
- **Appwrite** - Backend-as-a-Service
- **Node.js** - Server-side JavaScript

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
AIS-WEB/
├── app/                          # Next.js App Router pages
│   ├── announcements/           # Announcements page
│   ├── event/                   # Events page
│   ├── join/                    # Registration form
│   │   └── appwrite/           # Appwrite configuration
│   ├── projects/               # Projects showcase
│   │   └── [id]/              # Dynamic project pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   ├── about.tsx               # About section
│   ├── enhanced-team-cards.tsx # Team member cards
│   ├── hero.tsx                # Hero section
│   ├── navigation.tsx          # Navigation component
│   ├── page-transition.tsx     # Page transition effects
│   └── ...                     # Other components
├── data/                       # Data files
│   ├── data.ts                # General data
│   ├── event-data.ts          # Event information
│   └── projects.ts            # Project data
├── hooks/                     # Custom React hooks
├── lib/                       # Utility libraries
│   ├── lenis.ts              # Smooth scrolling setup
│   └── utils.ts              # Utility functions
├── public/                    # Static assets
│   ├── images/               # Image assets
│   └── fonts/                # Custom fonts
└── styles/                    # Additional stylesheets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/AIS-WEB.git
   cd AIS-WEB
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Alternative with yarn
yarn dev
yarn build
yarn start
yarn lint
```

## 🧩 Key Components

### Core Components
- **`ParallaxHero`**: Animated hero section with parallax effects
- **`EnhancedTeamCards`**: Interactive team member cards
- **`PageTransition`**: Smooth page transition animations
- **`SpaceshipNavigation`**: Unique navigation component
- **`FluidGradient`**: Dynamic gradient backgrounds

### Form Components
- **Registration Form**: Multi-step form with validation
- **Department Selection**: Interactive department picker
- **Form Validation**: Real-time validation with error handling

### Animation Components
- **`CursorFollower`**: Custom cursor effects
- **`BlobBackground`**: Animated background elements
- **`ScrollProgress`**: Scroll progress indicators
- **`MobileOptimizedAnimations`**: Performance-optimized animations

## 📊 Data Management

### Project Data (`data/projects.ts`)
Contains information about society projects including:
- Project descriptions and details
- Technology stacks
- Contributors
- GitHub links
- Project status

### Event Data (`data/event-data.ts`)
Manages event information:
- Event details and descriptions
- Dates and locations
- Key features
- Event images

### General Data (`data/data.ts`)
Stores general society information and configurations.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure mobile responsiveness
- Test animations on different devices

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:
- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: Optimized for touch interactions
- **Performance**: Reduced animations on mobile for better performance
- **Accessibility**: Supports reduced motion preferences

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Various gradients and highlights

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- Consistent border radius (rounded-2xl)
- Smooth transitions and hover effects
- Glass morphism effects
- Magnetic button interactions

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom animations
- Extended color palette
- Responsive breakpoints

### Next.js
Configuration in `next.config.mjs`:
- Image optimization
- Font optimization
- Performance optimizations

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js Image component usage
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Components loaded on demand

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript errors
   - Verify environment variables

2. **Animation Issues**
   - Check if GSAP plugins are properly registered
   - Verify mobile optimization settings
   - Test with reduced motion preferences

3. **Form Submission Issues**
   - Verify Appwrite configuration
   - Check environment variables
   - Ensure database permissions

## 📞 Support

For support and questions:
- **Email**: ais@bennett.edu.in
- **GitHub Issues**: [Create an issue](https://github.com/your-username/AIS-WEB/issues)
- **Discord**: Join our community server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bennett University** for supporting the AI Society
- **Contributors** who helped build this amazing platform
- **Open Source Community** for the amazing tools and libraries
- **Design Inspiration** from modern web design trends

---

**Made with ❤️ by the AI Society - Bennett University**

*Training Minds, One Epoch at a Time* 🧠✨
