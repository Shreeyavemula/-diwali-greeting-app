# 🪔 Diwali Greeting App

LINK - https://diwali-greeting-app.netlify.app/

A beautiful AI-powered Diwali greeting generator built with React and Node.js.

## ✨ Features

- 🎨 Beautiful, modern UI with Tailwind CSS
- 🤖 AI-generated personalized greetings (optional OpenAI integration)
- 🎭 8 different greeting tones (Traditional, Festive, Spiritual, etc.)
- 📝 Personalize with recipient's name
- 📋 One-click copy to clipboard
- 🎆 Animated Diwali-themed interface
- 💫 Works without AI API key (uses beautiful pre-written greetings)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

1. **Clone and navigate to the project**
```bash
cd diwali-greeting-app
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running Locally

1. **Start the Backend Server**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

3. **Open your browser** and visit `http://localhost:5173`

## 🔑 Optional: AI Integration

To enable AI-generated greetings with OpenAI:

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Create a `.env` file in the `backend` folder:
```bash
cd backend
cp .env.example .env
```
3. Add your API key to `.env`:
```
OPENAI_API_KEY=your_api_key_here
PORT=5000
```

**Note:** The app works perfectly without an API key using beautiful pre-written greetings!

## 📦 Deployment

### Deploy to Vercel (Recommended for single-link deployment)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Railway

1. Push code to GitHub
2. Connect Railway to your GitHub repo
3. Railway will auto-detect and deploy both frontend and backend

## 🎨 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, OpenAI API (optional)
- **Styling:** Tailwind CSS with custom Diwali theme

## 📝 API Endpoints

- `POST /api/generate-greeting` - Generate personalized greeting
- `GET /api/random-greeting` - Get random greeting
- `GET /api/greeting-styles` - Get all available greeting styles

## 🎉 Usage

1. Enter recipient's name (optional)
2. Choose a greeting tone
3. Click "Generate Greeting" or "Surprise Me!"
4. Copy and share your beautiful Diwali greeting!

## 💝 Made with Love for Diwali 2025

Happy Diwali! 🪔✨
