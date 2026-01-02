# SuaraShop - Malaysian Elderly-Friendly Ecommerce App

<div align="center">
  <h1>🛒 SuaraShop</h1>
  <p><strong>Mudah & Mesra</strong> - Your Friendly Shopping Assistant</p>
  <p>A voice-enabled, elderly-friendly ecommerce web application designed for Malaysian seniors.</p>
</div>

---

## ✨ Features

- 🎤 **Voice Navigation** - AI-powered voice assistance for easy navigation
- 🤖 **AI Chatbot** - Helpful assistant to guide elderly users
- 🌙 **Dark Mode** - Eye-friendly dark theme support
- 📱 **Mobile-First** - Optimized for smartphones and tablets
- 🔤 **Large Text** - Adjustable text size for better readability
- 🇲🇾 **Bilingual** - Malay and English language support
- 🛍️ **Full Ecommerce** - Product browsing, cart, checkout, orders
- ♿ **Accessible** - WCAG-compliant with keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd elderly_stitch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
elderly_stitch/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Splash screen
│   ├── home/              # Home page
│   ├── products/          # Product listing & detail pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── orders/            # Order history
│   └── profile/           # User profile
├── components/            # Reusable components
│   ├── layout/           # Layout components (Nav, Header)
│   ├── products/         # Product cards, category cards
│   └── ui/               # UI components (buttons, modals)
├── store/                # Zustand state management
│   ├── authStore.ts      # Authentication state
│   └── cartStore.ts      # Shopping cart state
├── data/                 # Mock data
│   ├── categories.ts     # Product categories
│   └── products.ts       # Product catalog
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions
```

## 🎨 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Google Material Symbols](https://fonts.google.com/icons)
- **Fonts**: Lexend, Manrope (Google Fonts)

## 🎯 Key Screens

1. **Splash Screen** - Animated loading screen with SuaraShop branding
2. **Home** - Categories, personalized greeting, recommended products
3. **Product Listing** - Filtered products by category with search
4. **Product Detail** - Full product information (coming soon)
5. **Shopping Cart** - Cart management with quantity controls
6. **Checkout** - Address selection and payment
7. **Orders** - Order history and tracking
8. **Profile** - User profile and settings

## 🧪 Demo Mode

This app is configured for **demo/showcase purposes**:
- Mock authentication (any email/password works)
- Mock product data
- LocalStorage for cart persistence
- Mock AI chatbot responses
- Simulated checkout process

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)  
3. Deploy with one click!

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Philosophy

**Elderly-Friendly UI/UX**:
- Large, readable fonts (18px+)
- High contrast colors
- Clear visual hierarchy
- Big, touchable buttons (48px minimum)
- Bilingual labels (Malay + English)
- Voice assistance integration
- Simple, intuitive navigation

## 🔧 Configuration

### Theme Colors
Edit `tailwind.config.ts` to customize:
- Primary: `#6D28D9` (Purple)
- Background: `#F8F9FA` (Off-white)
- Card: `#F3F1F6` (Lavender-grey)

### Product Data
Add/edit products in `data/products.ts`

### Categories
Modify categories in `data/categories.ts`

## 📝 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- Design inspired by elderly-friendly ecommerce best practices
- Icons from Google Material Symbols
- Images from Google AI Image Service (demo purposes)

---

<div align="center">
  Made with ❤️ for Malaysian seniors
</div>
