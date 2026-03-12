# Kordbear — 3D Printing E-Commerce Platform

Kordbear is a full-stack e-commerce web application developed for a professional 3D printing company. The platform offers a seamless shopping experience, a powerful admin panel, and a modern dark-themed UI built with performance and scalability in mind.

## 🖥️ Live Demo
- Frontend: [kordbear.vercel.app](https://kordbear.vercel.app)
- Backend API: [kordbear-api.railway.app](https://kordbear-api.railway.app)

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18, Vite, React Router v6     |
| Backend     | Node.js, Express.js (ES Modules)    |
| Database    | MongoDB Atlas, Mongoose             |
| Auth        | JWT (JSON Web Tokens), bcryptjs     |
| Payment     | iyzico Payment Gateway (3D Secure)  |
| Deployment  | Vercel (Frontend), Railway (Backend)|

---

## ✨ Features

### 🛒 Shopping Experience
- Product listing with category filtering and search
- Detailed product pages with specifications
- Per-user persistent shopping cart (localStorage)
- Checkout flow with shipping address form
- iyzico payment integration with 3D Secure support
- Order confirmation page after successful payment

### 👤 User Account
- Register & login with JWT authentication
- Profile page with editable name and email
- Order history with status tracking
- Messages page — view admin replies to contact form submissions

### 🔧 Admin Panel
- **Dashboard** — overview stats, recent orders, products, and messages
- **Products** — create, edit, delete products with price, stock, category
- **Categories** — manage product categories
- **Orders** — view all orders, update order status
- **Users** — view all users, change roles (user/admin), delete users
- **Messages** — view contact form submissions, mark as read, reply to users, delete

### 📄 Static Pages
- About Us
- How We Manufacture (step-by-step 3D printing process)
- FAQ
- Shipping & Return Policy
- Privacy Policy
- Terms of Service

### 🎨 Design
- Dark theme with anthracite background and electric orange (#FF6B2B) accent
- Bebas Neue display font + DM Sans body font
- Fully responsive layout
- Smooth animations and transitions
- Professional corporate aesthetic

---

## 📁 Project Structure

```
kordbear-web/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── admin/       # Admin panel components
│   │   │   ├── auth/        # Auth components
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Homepage sections
│   │   │   └── ui/          # Generic UI elements
│   │   ├── context/         # React Context (Auth, Cart, Loading)
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── styles/          # Theme variables
│   │   └── utils/           # API utility
│   └── package.json
│
└── server/                  # Express backend
    ├── src/
    │   ├── config/          # iyzico config
    │   ├── controllers/     # Route controllers
    │   ├── middleware/       # Auth middleware
    │   ├── models/          # Mongoose models
    │   └── routes/          # API routes
    └── package.json
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint            | Access  | Description         |
|--------|---------------------|---------|---------------------|
| POST   | /api/auth/register  | Public  | Register new user   |
| POST   | /api/auth/login     | Public  | Login user          |
| GET    | /api/auth/profile   | Private | Get user profile    |
| PUT    | /api/auth/profile   | Private | Update user profile |

### Products
| Method | Endpoint            | Access  | Description         |
|--------|---------------------|---------|---------------------|
| GET    | /api/products       | Public  | Get all products    |
| GET    | /api/products/:id   | Public  | Get single product  |
| POST   | /api/products       | Admin   | Create product      |
| PUT    | /api/products/:id   | Admin   | Update product      |
| DELETE | /api/products/:id   | Admin   | Delete product      |

### Orders
| Method | Endpoint               | Access  | Description         |
|--------|------------------------|---------|---------------------|
| POST   | /api/orders            | Private | Create order        |
| GET    | /api/orders/my         | Private | Get my orders       |
| GET    | /api/orders            | Admin   | Get all orders      |
| PUT    | /api/orders/:id/status | Admin   | Update order status |

### Payment
| Method | Endpoint                | Access  | Description           |
|--------|-------------------------|---------|-----------------------|
| POST   | /api/payment/initiate   | Private | Start iyzico checkout |
| POST   | /api/payment/callback   | Public  | iyzico callback       |

### Contact
| Method | Endpoint               | Access  | Description         |
|--------|------------------------|---------|---------------------|
| POST   | /api/contact           | Private | Send message        |
| GET    | /api/contact           | Admin   | Get all messages    |
| GET    | /api/contact/my        | Private | Get my messages     |
| PUT    | /api/contact/:id/read  | Admin   | Mark as read        |
| PUT    | /api/contact/:id/reply | Admin   | Reply to message    |
| DELETE | /api/contact/:id       | Admin   | Delete message      |

---

## ⚙️ Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IYZICO_API_KEY=your_iyzico_api_key
IYZICO_SECRET_KEY=your_iyzico_secret_key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
SERVER_URL=https://your-backend-url.railway.app
CLIENT_URL=https://your-frontend-url.vercel.app
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- iyzico Merchant account (sandbox for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kordbear-web.git
cd kordbear-web

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running Locally

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

---

## 💳 iyzico Test Cards

| Card Number      | Type      | CVV | Expiry | 3D Password |
|------------------|-----------|-----|--------|-------------|
| 5528790000000008 | Standard  | 123 | 12/30  | —           |
| 4766620000000001 | 3D Secure | 123 | 12/30  | a           |

---

## 📝 License

This project is proprietary software developed for Kordbear.  
All rights reserved © 2025 Kordbear.
"# kordbear_web" 
