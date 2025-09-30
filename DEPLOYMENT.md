# 🚀 Deployment Guide

## Deploy to Vercel (Single Link - Recommended)

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

### Steps:

1. **Initialize Git Repository**
```bash
cd diwali-greeting-app
git init
git add .
git commit -m "Initial commit: Diwali Greeting App"
```

2. **Push to GitHub**
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/diwali-greeting-app.git
git branch -M main
git push -u origin main
```

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click "Deploy"

4. **Add Backend API (Serverless Functions)**
   - In your Vercel project settings, add the backend as API routes
   - Or use Vercel's serverless functions

### Alternative: Deploy Backend Separately

If you want to keep backend separate:

1. **Deploy Backend to Railway/Render**
   - Sign up at railway.app or render.com
   - Connect your GitHub repo
   - Select the `backend` folder
   - Deploy

2. **Update Frontend API URL**
   - In `frontend/src/App.jsx`, update the API_URL to your backend URL
   - Redeploy frontend to Vercel

---

## Deploy to Railway (Easiest - Single Command)

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login to Railway**
```bash
railway login
```

3. **Initialize and Deploy**
```bash
cd diwali-greeting-app
railway init
railway up
```

Railway will automatically detect both frontend and backend and deploy them together!

---

## Deploy to Netlify (Frontend) + Render (Backend)

### Frontend (Netlify):
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Backend (Render):
1. Go to render.com
2. Create new Web Service
3. Connect GitHub repo
4. Select `backend` folder
5. Deploy

---

## Environment Variables

If using OpenAI API:
- Add `OPENAI_API_KEY` in your deployment platform's environment variables
- The app works perfectly without it using pre-written greetings!

---

## 🎉 You're Done!

Your Diwali Greeting App will be live with a single URL!
