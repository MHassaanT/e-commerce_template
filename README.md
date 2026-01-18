# LUXE - Premium Clothing E-Commerce Store

A production-ready, full-stack e-commerce demo built with Next.js 14, TypeScript, and Tailwind CSS. This project showcases a complete online clothing store with authentication, payment processing, admin panel, and modern UX.

![Stack](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.20-darkgreen)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🚀 Features

### Customer Features
- **Product Browsing**: Responsive product grid with filtering and sorting
- **Product Details**: Image gallery, size/color selection, stock indicators
- **Shopping Cart**: Persistent cart with quantity management  
- **Secure Checkout**: Stripe integration (test mode) with shipping options
- **User Accounts**: Registration, login, order history
- **Responsive Design**: Mobile-first, optimized for all devices

### Admin Features  
- **Product Management**: View, create, edit, delete products
- **Order Management**: Track and update order statuses
- **Inventory Tracking**: Real-time stock levels
- **Dashboard**: Quick stats and insights
- **Role-Based Access**: Protected admin routes

### Technical Features
- **Server Components**: Optimized performance with Next.js App Router
- **SEO Optimized**: Dynamic sitemaps, meta tags, Open Graph
- **Type-Safe**: Full TypeScript coverage
- **Tested**: Unit, integration, and E2E tests
- **CI/CD Ready**: GitHub Actions workflow included

## 📋 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router), React 18 |
| **Language** | TypeScript 5.6 |
| **Styling** | Tailwind CSS 3.4, CSS Modules |
| **Database** | Prisma ORM 5.20 + SQLite (PostgreSQL ready) |
| **Authentication** | NextAuth.js 4.24 |
| **Payments** | Stripe 17.5 (test mode) |
| **State Management** | Zustand 4.5 |
| **Validation** | Zod 3.23 |
| **Testing** | Jest 29, React Testing Library, Playwright |
| **Linting** | ESLint, Prettier |
| **CI/CD** | GitHub Actions |

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd Clothing_Website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. **Initialize database**
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

5. **Start development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run E2E tests
npm run test:e2e

# Run tests in CI mode
npm run test:ci

# Type checking
npm run type-check
```

## 📦 Build & Deploy

### Local Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables in Vercel dashboard
- Deploy!

3. **Set up Stripe webhooks**
- In Stripe Dashboard, add webhook endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
- Add webhook secret to Vercel environment variable `STRIPE_WEBHOOK_SECRET`

## 🔐 Demo Accounts

### User Account
- **Email**: `user@demo.com`
- **Password**: `demo123`

### Admin Account
- **Email**: `admin@demo.com`
- **Password**: `demo123`

### Stripe Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date and any CVC

## 📁 Project Structure

```
/app                    # Next.js App Router pages
  /(auth)              # Authentication pages
  /admin               # Admin dashboard
  /api                 # API routes
  /product             # Product pages
  /shop                # Shop listing
  /checkout            # Checkout flow
/src
  /components          # React components
    /ui                # Reusable UI components
    /product           # Product-specific components
    /layout            # Layout components
  /hooks               # Custom hooks
  /lib                 # Utilities and configurations
/prisma                # Database schema and migrations
  schema.prisma        # Prisma schema
  seed.ts              # Database seed script
/e2e                   # E2E tests
/public                # Static assets
```

## 🔄 Switching to Production Services

### PostgreSQL Database

1. **Update schema provider**:
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

2. **Update DATABASE_URL**:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

3. **Migrate**:
```bash
npx prisma migrate dev
```

### SendGrid Email Service

1. **Install SendGrid**:
```bash
npm install @sendgrid/mail
```

2. **Update `/src/lib/email.ts`**:
```typescript
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmail(options: EmailOptions) {
  await sgMail.send({
    to: options.to,
    from: process.env.FROM_EMAIL!,
    subject: options.subject,
    html: options.html,
  })
}
```

3. **Add to `.env`**:
```env
SENDGRID_API_KEY="SG.xxx"
FROM_EMAIL="noreply@yourstore.com"
```

### Stripe Live Mode

1. **Get live keys** from Stripe Dashboard
2. **Update `.env`** (or Vercel environment):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # From live webhook endpoint
```

## ✅ Feature Checklist

- [x] Homepage with hero and collections
- [x] Product listing with filters and sorting
- [x] Product detail pages with variants
- [x] Shopping cart with persistence  
- [x] User authentication (signup/login)
- [x] Checkout flow with Stripe
- [x] Order confirmation and tracking
- [x] User account dashboard
- [x] Admin product management
- [x] Admin order management
- [x] Email notifications (mock)
- [x] SEO optimization
- [x] Responsive design
- [x] Testing setup
- [x] CI/CD pipeline

## 🎯 Mock vs Production Features

| Feature | Status | Notes |
|---------|--------|-------|
| Stripe Payments | ✅ Test Mode | Switch to live keys for production |
| Email Service | 🔶 Mock | Console logs only. Integrate SendGrid for production |
| Promo Codes | 🔶 UI Only | Backend logic not implemented |
| Image Upload | 🔶 URLs Only | Integrate Cloudinary/S3 for production |
| Search | 🔶 Basic | Can enhance with Algolia/Elasticsearch |
| Wishlist | 🔶 UI Only | Backend persistence not implemented |

## 🐛 Troubleshooting

**Database Issues**
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev
npm run prisma:seed
```

**Stripe Webhook Testing**
```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📝 Scripts Reference

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm test             # Run Jest tests
npm run test:e2e     # Run Playwright E2E tests
npm run prisma:studio # Open Prisma Studio (database GUI)
npm run prisma:seed  # Seed database with sample data
```

## 📄 License

This is a demo project for educational and portfolio purposes.

## 🤝 Contributing

This is a demo project, but feel free to fork and customize for your own needs!

## 📧 Contact

For questions or feedback about this demo:
- Create an issue in the repository
- Email: demo@luxe-store.com (demo only)

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
