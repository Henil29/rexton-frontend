# Rexton Marketing

> A modern, high-performance marketing website built with Next.js, React, and cutting-edge animation technologies.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 🎯 Overview

Rexton is a premium marketing website showcasing services, pricing, projects, and client testimonials. It features smooth scroll animations, engaging interactions, and a responsive design that delivers an exceptional user experience across all devices.

## ✨ Key Features

- 🎬 **Smooth Scroll Animations** - Powered by GSAP and Lenis for buttery-smooth scrolling
- 🎨 **Modern UI Components** - Reusable, well-structured React components
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- ⚡ **High Performance** - Next.js App Router with optimized code splitting
- 🎯 **Interactive Elements** - Framer Motion animations and custom hooks for engaging interactions
- 🔤 **Text Effects** - Custom scramble text animation hook for dynamic content
- 🎨 **Tailwind CSS** - Utility-first styling for rapid, consistent design
- ♿ **Accessible** - Built with accessibility best practices
- 🌐 **SEO Optimized** - Next.js built-in SEO optimization

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 16.2.4](https://nextjs.org/) |
| **UI Library** | [React 19.2.4](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [GSAP](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/) |
| **Linting** | [ESLint 9](https://eslint.org/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── components/              # Page components
│       ├── Hero.tsx             # Hero section
│       ├── Navbar.tsx           # Navigation bar
│       ├── About.tsx            # About section
│       ├── Services.tsx         # Services showcase
│       ├── Process.tsx          # Process flow
│       ├── Projects.tsx         # Portfolio projects
│       ├── Pricing.tsx          # Pricing plans
│       ├── Testimonials.tsx     # Client testimonials
│       ├── WhyChooseUs.tsx      # Value proposition
│       ├── Faq.tsx             # FAQ section
│       ├── Footer.tsx           # Footer
│       └── ClientInit.tsx       # Client-side initialization
│   └── hook/                    # Custom React hooks
│       ├── useScrambleText.ts   # Text scramble animation
│       └── AnimatedButton.tsx   # Animated button component
├── lib/
│   ├── gsap.ts                  # GSAP configuration
│   └── lenis.ts                 # Lenis scroll setup
├── public/
│   ├── images/                  # Image assets
│   └── videos/                  # Video assets
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.mjs           # PostCSS configuration
└── eslint.config.mjs            # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rexton
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site. The page automatically updates as you edit files.

### Scripts

| Script | Description |
|--------|------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
npm start
```

The build process optimizes your application for best performance and is ready for deployment.

## 📦 Key Components

### Components Overview

- **Hero** - Eye-catching hero section with CTAs
- **Navbar** - Navigation with responsive mobile menu
- **About** - Company/service introduction
- **Services** - Detailed service offerings
- **Process** - Step-by-step process visualization
- **Projects** - Portfolio showcase
- **Pricing** - Flexible pricing plans
- **Testimonials** - Client success stories
- **WhyChooseUs** - Key differentiators
- **FAQ** - Common questions and answers
- **Footer** - Contact and social links

### Custom Hooks

- **useScrambleText** - Creates animated text scramble effects for dynamic, engaging typography

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive Next.js guide
- [React Documentation](https://react.dev/) - Learn React patterns
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Utility-first CSS framework
- [GSAP Documentation](https://gsap.com/docs/) - Professional animation library
- [Framer Motion Guide](https://www.framer.com/motion/) - React animation library

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com) from the creators of Next.js:

1. Push your repository to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js settings and deploy
4. Your site goes live with each push to the main branch

**[Deploy Now](https://vercel.com/new?utm_medium=referral&utm_source=next.js-org&utm_campaign=nextjs-readme)**

### Other Deployment Options

- **Netlify** - Git-connected deployment
- **AWS Amplify** - AWS ecosystem integration
- **Docker** - Containerize for any platform
- **Self-hosted** - Deploy on your own server

See [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed guides.

## 📝 Development Tips

- Use TypeScript for type safety
- Follow component naming conventions (PascalCase)
- Keep components focused and reusable
- Optimize images with Next.js Image component
- Use CSS modules or Tailwind for styling
- Test responsive designs across devices

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Made with ❤️ by the Henil**
