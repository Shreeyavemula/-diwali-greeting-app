import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI (optional - will use fallback if no API key)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Fallback Diwali greetings (if no AI API key)
const fallbackGreetings = [
  {
    message: "✨ Wishing you a Diwali filled with joy, prosperity, and endless happiness! May the divine light of diyas illuminate your path to success. Happy Diwali! 🪔",
    style: "traditional"
  },
  {
    message: "🎆 May this Diwali bring you abundant joy, health, and wealth! Let's celebrate the victory of light over darkness. Shubh Deepavali! 🌟",
    style: "festive"
  },
  {
    message: "🪔 On this auspicious occasion of Diwali, may Goddess Lakshmi bless you with prosperity and Lord Ganesha remove all obstacles from your life. Happy Diwali! 🙏",
    style: "spiritual"
  },
  {
    message: "✨ Sending you warm wishes and bright lights this Diwali! May your life sparkle with moments of love, laughter, and goodwill. Have a blessed Diwali! 💫",
    style: "warm"
  },
  {
    message: "🎇 May the festival of lights brighten up your life with happiness, success, and good health. Wishing you and your family a very Happy Diwali! 🪔",
    style: "family"
  },
  {
    message: "🌟 Let's celebrate the triumph of good over evil and light over darkness! May this Diwali bring new opportunities and endless joy. Shubh Deepavali! 🎆",
    style: "inspirational"
  },
  {
    message: "🪔 May the glow of diyas and the echo of chants fill your life with peace and prosperity. Wishing you a sparkling Diwali full of love and laughter! ✨",
    style: "poetic"
  },
  {
    message: "🎊 Happy Diwali! May this festival of lights illuminate your dreams and bring you success in all your endeavors. Celebrate with joy and sweets! 🍬",
    style: "cheerful"
  }
];

// Generate AI greeting using OpenAI
async function generateAIGreeting(name, tone) {
  if (!openai) {
    // Return fallback greeting if no API key
    const filtered = tone 
      ? fallbackGreetings.filter(g => g.style === tone)
      : fallbackGreetings;
    const greeting = filtered[Math.floor(Math.random() * filtered.length)] || fallbackGreetings[0];
    
    if (name) {
      return {
        message: `Dear ${name},\n\n${greeting.message}`,
        style: greeting.style,
        isAI: false
      };
    }
    return { ...greeting, isAI: false };
  }

  try {
    const prompt = `Generate a heartfelt Diwali greeting message${name ? ` for ${name}` : ''}. 
    The tone should be ${tone || 'warm and festive'}. 
    Include emojis like 🪔, ✨, 🎆, 🌟. 
    Keep it between 2-3 sentences. 
    Make it personal and meaningful.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative greeting card writer specializing in Indian festivals. Create warm, heartfelt Diwali greetings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.8
    });

    return {
      message: completion.choices[0].message.content.trim(),
      style: tone || 'custom',
      isAI: true
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Fallback to predefined greetings
    const greeting = fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
    if (name) {
      return {
        message: `Dear ${name},\n\n${greeting.message}`,
        style: greeting.style,
        isAI: false
      };
    }
    return { ...greeting, isAI: false };
  }
}

// API Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Diwali Greeting API is running! 🪔',
    endpoints: {
      generateGreeting: 'POST /api/generate-greeting',
      randomGreeting: 'GET /api/random-greeting'
    }
  });
});

// Generate personalized greeting
app.post('/api/generate-greeting', async (req, res) => {
  try {
    const { name, tone } = req.body;
    const greeting = await generateAIGreeting(name, tone);
    res.json({
      success: true,
      greeting
    });
  } catch (error) {
    console.error('Error generating greeting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate greeting'
    });
  }
});

// Get random greeting
app.get('/api/random-greeting', (req, res) => {
  const greeting = fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
  res.json({
    success: true,
    greeting
  });
});

// Get all greeting styles
app.get('/api/greeting-styles', (req, res) => {
  const styles = [...new Set(fallbackGreetings.map(g => g.style))];
  res.json({
    success: true,
    styles
  });
});

app.listen(PORT, () => {
  console.log(`🪔 Diwali Greeting Server running on port ${PORT}`);
  console.log(`🤖 AI Mode: ${openai ? 'Enabled (OpenAI)' : 'Disabled (Using fallback greetings)'}`);
});
