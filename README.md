# XDotPay - Non-Custodial USDC Payment API

> **Transparent. Open Source. Non-Custodial.**

XDotPay is a payment gateway API for accepting USDC cryptocurrency payments. We are **NOT a Virtual Asset Service Provider (VASP)** - we don't intercept, hold, or control funds. All payments go directly from payer to merchant's wallet.

---

## 🚀 Quick Start

### Production API
- **API Base URL**: `https://api.xdotpay.com`
- **API Documentation**: [https://api.xdotpay.com/api/docs](https://api.xdotpay.com/api/docs)
- **Full Documentation**: [https://xdotpay.com](https://xdotpay.com)

---

## 📚 What is XDotPay?

XDotPay is a SaaS platform that provides:

✅ **Non-custodial USDC payments** - Funds go directly to your wallet  
✅ **Complete API** - Full REST API for invoice creation and payment verification  
✅ **Dashboard Frontend** - Next.js-based merchant dashboard  
✅ **Blockchain verification** - On-chain payment confirmation via Ethereum RPC  
✅ **No intermediaries** - Direct peer-to-peer transactions  

---

## 🔑 How It Works

### 1. **Sign Up** → Create a merchant account
```bash
POST https://api.xdotpay.com/api/auth/signup
```

### 2. **Create Invoice** → Generate a payment request
```bash
POST https://api.xdotpay.com/api/v1/new/invoice
```

### 3. **Customer Pays** → User sends USDC via MetaMask directly to your wallet

### 4. **Verify Payment** → Confirm the transaction on-chain
```bash
GET https://api.xdotpay.com/api/v1/verify?invoice_id={id}&tx_hash={hash}
```

---

## 🛠️ Key Features

### Authentication
- **Signup** - Register new merchants
- **Login** - Authenticate and receive bearer token
- **Account Management** - Update merchant wallet address, email, etc.

### Payment Gateway
- **Create Invoices** - Generate payment requests with custom metadata
- **View Invoices** - Retrieve single or multiple invoices
- **Pay Invoice** - Record payment details (from_address, tx_hash)
- **Verify Payment** - Blockchain verification of USDC transactions
- **Dashboard Stats** - Revenue, completed, and pending payment statistics

---

## 📖 API Documentation

### Full Interactive Docs
Visit **[https://xdotpay.com](https://xdotpay.com)** for:
- Complete endpoint documentation
- Interactive code examples (cURL, JavaScript, Python)
- Request/Response schemas
- Setup guides for Dashboard and API

### OpenAPI Specification
Access the OpenAPI spec at **[https://api.xdotpay.com/api/docs](https://api.xdotpay.com/api/docs)**

---

## 🏗️ Running Locally

### Prerequisites
- **Backend**: Django, Python 3.x, Ethereum RPC node access
- **Frontend**: Next.js, Node.js, npm/yarn

### Backend Setup (Django API)

1. **Clone the repository**
```bash
git clone https://github.com/24greyhat/xdotpay.com.git
cd xdotpay.com/xdotpayApi
```

2. **Create `.env` file** with required variables:
```env
ETH_RPC=https://your-ethereum-rpc-node.com
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```

3. **Install dependencies and run**
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup (Next.js Dashboard)

1. **Clone the repository**
```bash 
git clone https://github.com/24greyhat/xdotpay.com.git
cd xdotpay.com/dashboard
```

2. **Create `.env` file**:
```env
NEXT_PUBLIC_API_URL=https://api.xdotpay.com/api/
```

3. **Install dependencies and run**
```bash
npm install
npx next dev --turbo
```

Visit the setup guides at **[https://xdotpay.com](https://xdotpay.com)** for detailed instructions.

---

## 🔐 Authentication

All authenticated endpoints require a **Bearer token** in the Authorization header:

```bash
Authorization: Bearer <your-token>
```

Get your token by calling the `/api/auth/login` endpoint.

---

## 💰 Payment Flow Example

### Step 1: Create an Invoice
```bash
curl -X POST https://api.xdotpay.com/api/v1/new/invoice \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.50,
    "metadata": {
      "order_id": "ORDER-123",
      "customer_email": "customer@example.com"
    }
  }'
```

### Step 2: Customer Pays via MetaMask
The customer sends USDC directly to your merchant wallet address using MetaMask.

### Step 3: Verify the Payment
```bash
curl -X GET "https://api.xdotpay.com/api/v1/verify?invoice_id=1&tx_hash=0xabc123..." \
  -H "Authorization: Bearer YOUR_TOKEN"
```

The API verifies the transaction on the Ethereum blockchain and confirms the payment.

**Note:** To see this in action, spin up the **dashboard** locally and see how i implemented the frontend side of the payment handling.

---

## ⚖️ Legal & Compliance

### VASP Clarification

**XDotPay is NOT a Virtual Asset Service Provider (VASP)**

We do not:
- ❌ Intercept funds
- ❌ Hold custody of funds
- ❌ Control or manage user wallets
- ❌ Act as an intermediary in transactions

We only:
- ✅ Provide API infrastructure for invoice management
- ✅ Verify blockchain transactions
- ✅ Facilitate direct peer-to-peer payments

**All USDC payments go directly from the payer's wallet to the merchant's wallet.**

For full legal details, visit:
- [Terms of Service](https://xdotpay.com/terms-of-service)
- [Privacy Policy](https://xdotpay.com/privacy-policy)

---

## 🌐 Resources

- **Production API**: [https://api.xdotpay.com](https://api.xdotpay.com)
- **Documentation**: [https://xdotpay.com](https://xdotpay.com)
- **OpenAPI Spec**: [https://api.xdotpay.com/api/docs](https://api.xdotpay.com/api/docs)
- **Support**: Contact via documentation site

---

## 🧑‍💻 Technology Stack

- **Backend**: Django + NinjaAPI
- **Frontend**: Next.js + React
- **Blockchain**: Ethereum (USDC on Ethereum)
- **Authentication**: Bearer Token (HTTP)
- **Database**: PostgreSQL (recommended)

---

## 📝 License

This project is open source and transparent. See full terms at [https://xdotpay.com/terms-of-service](https://xdotpay.com/terms-of-service).

---

## 🤝 Support

For questions, issues, or support:
1. Visit the documentation at **[https://xdotpay.com](https://xdotpay.com)**
2. Check the API reference at **[https://api.xdotpay.com/api/docs](https://api.xdotpay.com/api/docs)**
3. Review the setup guides for detailed instructions

---

**Built with ❤️ for transparent, non-custodial cryptocurrency payments**
