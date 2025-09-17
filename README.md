# JewSide

A modern web application for exploring Jewish traditions, prayers, and educational content.

## Features

- Multilingual support (English/Hebrew)
- RTL support for Hebrew
- Light/Dark theme
- Responsive design
- Accessible interface (WCAG AA compliant)
- Content browsing by categories
- Video and prayer collections
- Admin interface (UI only, no backend)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- next-intl for internationalization

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/jewside.git
cd jewside
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open the application in your browser
- English version: [http://localhost:3000/en](http://localhost:3000/en)
- Hebrew version: [http://localhost:3000/he](http://localhost:3000/he)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run Playwright tests

## Project Structure

- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and configuration
- `src/content/` - Mock JSON data
- `src/messages/` - Translation files (en.json, he.json)
- `src/styles/` - Global styles
- `src/tests/` - Playwright tests

## License

This project is for educational purposes only. All rights reserved.