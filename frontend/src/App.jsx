import { useState } from 'react';
import axios from 'axios';
import { Sparkles, Send, Copy, RefreshCw, Heart } from 'lucide-react';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5001/api';

function App() {
  const [name, setName] = useState('');
  const [tone, setTone] = useState('');
  const [greeting, setGreeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tones = [
    { value: 'traditional', label: 'Traditional', emoji: '🙏' },
    { value: 'festive', label: 'Festive', emoji: '🎆' },
    { value: 'spiritual', label: 'Spiritual', emoji: '🪔' },
    { value: 'warm', label: 'Warm', emoji: '💫' },
    { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { value: 'inspirational', label: 'Inspirational', emoji: '🌟' },
    { value: 'poetic', label: 'Poetic', emoji: '✨' },
    { value: 'cheerful', label: 'Cheerful', emoji: '🎊' },
  ];

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

  const generateGreeting = async () => {
    setLoading(true);
    setCopied(false);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filtered = tone 
      ? fallbackGreetings.filter(g => g.style === tone)
      : fallbackGreetings;
    const greeting = filtered[Math.floor(Math.random() * filtered.length)] || fallbackGreetings[0];
    
    if (name.trim()) {
      setGreeting({
        message: `Dear ${name.trim()},\n\n${greeting.message}`,
        style: greeting.style,
        isAI: false
      });
    } else {
      setGreeting({ ...greeting, isAI: false });
    }
    
    setLoading(false);
  };

  const getRandomGreeting = async () => {
    setLoading(true);
    setCopied(false);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const greeting = fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
    
    if (name.trim()) {
      setGreeting({
        message: `Dear ${name.trim()},\n\n${greeting.message}`,
        style: greeting.style,
        isAI: false
      });
    } else {
      setGreeting({ ...greeting, isAI: false });
    }
    
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (greeting) {
      navigator.clipboard.writeText(greeting.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8 px-4">
      {/* Animated Diyas Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float">🪔</div>
        <div className="absolute top-20 right-20 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>🎆</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float" style={{ animationDelay: '1.5s' }}>🪔</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-diwali-gold animate-sparkle" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-diwali-orange via-diwali-gold to-diwali-red bg-clip-text text-transparent">
              Diwali Greetings
            </h1>
            <Sparkles className="w-10 h-10 text-diwali-gold animate-sparkle" />
          </div>
          <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
            Create beautiful AI-powered Diwali wishes <Heart className="w-5 h-5 text-red-500 inline animate-pulse" />
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-diwali-gold/30">
          {/* Input Section */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Recipient's Name (Optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-diwali-gold focus:ring-2 focus:ring-diwali-gold/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose a Tone
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                      tone === t.value
                        ? 'bg-gradient-to-r from-diwali-orange to-diwali-gold text-white border-diwali-gold shadow-lg scale-105'
                        : 'bg-white border-gray-200 hover:border-diwali-gold hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{t.emoji}</span>
                    <span className="text-sm">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={generateGreeting}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-diwali-orange to-diwali-red text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Greeting
                  </>
                )}
              </button>

              <button
                onClick={getRandomGreeting}
                disabled={loading}
                className="sm:w-auto bg-gradient-to-r from-diwali-purple to-diwali-red text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Surprise Me!
              </button>
            </div>
          </div>

          {/* Greeting Display */}
          {greeting && (
            <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-diwali-gold/50 animate-glow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🪔</span>
                  <h3 className="text-xl font-bold text-diwali-purple">Your Diwali Greeting</h3>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all text-sm font-medium"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">
                {greeting.message}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="px-3 py-1 bg-white rounded-full font-medium">
                  Style: {greeting.style}
                </span>
                {greeting.isAI && (
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Generated
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> for Diwali 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
