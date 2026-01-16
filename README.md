# 🛒 SuaraShop - Voice-Enabled E-Commerce for Elderly Users

A bilingual (English/Bahasa Malaysia) e-commerce platform designed specifically for elderly users with accessibility features, large UI elements, and voice navigation capabilities.

## 🎯 Project Status

**Current Stage**: Alpha Prototype
**Build Status**: ✅ Successful
**Database**: ✅ Configured with sample data
**Authentication**: ✅ Working

## ✨ Features

### Implemented
- ✅ User authentication (sign up, login, logout)
- ✅ Product catalog with categories
- ✅ Shopping cart management
- ✅ Checkout flow (3 steps)
- ✅ Order history
- ✅ Bilingual support (English/Malay)
- ✅ Dark mode
- ✅ Text size adjustment
- ✅ Accessibility features
- ✅ Responsive mobile design

### In Progress
- 🚧 Voice navigation
- 🚧 AI chatbot assistant
- 🚧 Payment integration (Stripe/PayPal)
- 🚧 Product detail pages
- 🚧 Order tracking
- 🚧 Admin dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (already configured)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## 🗂️ Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, BottomNav
│   └── ui/            # Reusable components (Button, Input, Card)
├── contexts/          # React Context (AuthContext)
├── lib/               # Supabase client, translations, types
├── pages/             # Page components
│   ├── Home.tsx       # Landing page with categories
│   ├── Products.tsx   # Product listing and search
│   ├── Cart.tsx       # Shopping cart
│   ├── Checkout.tsx   # Checkout flow
│   ├── Orders.tsx     # Order history
│   ├── Profile.tsx    # User profile and settings
│   ├── Login.tsx      # Login page
│   └── Signup.tsx     # Registration page
└── store/             # Zustand state management
```

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🗄️ Database Schema

### Tables
- `profiles` - Extended user information and preferences
- `categories` - Product categories (bilingual)
- `products` - Product catalog (bilingual)
- `cart_items` - Shopping cart items
- `favorites` - Wishlist items
- `addresses` - Delivery addresses
- `orders` - Order records
- `order_items` - Order line items
- `reviews` - Product reviews
- `chat_history` - AI chatbot conversations

### Sample Data
- 4 categories (Groceries, Health, Home, Medicine)
- 20+ products with realistic Malaysian pricing
- Fully bilingual product information

## 🌐 Internationalization

Two languages supported:
- English (`en`)
- Bahasa Malaysia (`ms`)

Switch language from Profile → Settings

## 🎨 Design System

- **Primary Color**: Purple (#6D28D9)
- **Font**: Lexend
- **Icons**: Material Symbols
- **Spacing**: 8px base system
- **Breakpoints**: Mobile-first, max-width 480px

## 🔐 Authentication

Using Supabase Auth with email/password:
- Sign up creates user + profile
- Session persists in localStorage
- Protected routes redirect to login
- Row Level Security on all tables

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly buttons (min 44x44px)
- Bottom navigation for easy thumb access
- Optimized for single-hand use
- Safe area insets for notched devices

## ♿ Accessibility Features

- **Text Size**: 4 levels (Small, Medium, Large, Extra Large)
- **Dark Mode**: Full dark theme support
- **High Contrast**: Optional high contrast mode
- **Reduced Motion**: Respects user preference
- **Screen Readers**: Proper ARIA labels
- **Keyboard Navigation**: Full keyboard support

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite 5
- React Router v6
- Tailwind CSS 3

### Backend
- Supabase (PostgreSQL)
- Supabase Auth
- Row Level Security (RLS)

### State Management
- Zustand (global state)
- TanStack Query (server state)
- React Context (auth)

### Utilities
- React Hook Form (forms)
- Zod (validation)
- date-fns (dates)
- clsx (classnames)

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # TypeScript check + production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🐛 Known Issues

1. TypeScript strict mode disabled due to Supabase type generation issues
2. Voice navigation UI present but not functional (needs Web Speech API)
3. AI chatbot database ready but no frontend implementation
4. Product detail and order detail pages not yet implemented
5. Payment integration is demo only

## 📝 Next Steps

See `IMPLEMENTATION_DOCUMENTATION.md` for detailed roadmap and implementation status.

### Immediate Priorities
1. Generate proper TypeScript types from Supabase
2. Implement product detail page
3. Implement order detail page
4. Add address management UI
5. Integrate real payment gateway

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (recommended)
- Netlify
- AWS Amplify
- Firebase Hosting

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables in Production
Make sure to set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📊 Performance

Current build output:
```
dist/index.html                   1.15 kB
dist/assets/index-*.css          30.20 kB
dist/assets/index-*.js          137.64 kB
dist/assets/react-vendor-*.js   160.66 kB
dist/assets/supabase-*.js       172.48 kB
```

Total: ~502 kB (gzipped: ~140 kB)

## 🧪 Testing

Testing not yet implemented. Recommended:
- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Coverage Target**: >80%

## 📄 License

This project is private and proprietary.

## 👥 Team

Developed for elderly users in Malaysia with focus on accessibility and ease of use.

## 📞 Support

For issues or questions, refer to the full documentation in `IMPLEMENTATION_DOCUMENTATION.md`.

---

**Last Updated**: January 2026
**Version**: 1.0.0-alpha
**Status**: Prototype/Alpha
