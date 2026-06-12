import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Flame, RotateCcw } from 'lucide-react';

interface LoveSliderProps {
  selectedDessert: string;
  onReset: () => void;
  onComplete: (loveValue: number) => void;
}

export const LoveSlider: React.FC<LoveSliderProps> = ({ selectedDessert, onReset, onComplete }) => {
  const [loveValue, setLoveValue] = useState<number>(80);
  const [maxSliderLimit, setMaxSliderLimit] = useState<number>(100);
  const [explodedHearts, setExplodedHearts] = useState<{ id: number; x: number; y: number; scale: number; rotate: number; delay: number }[]>([]);
  const [hasExploded, setHasExploded] = useState(false);

  // Dynamic status details based on slider value
  const getLoveLevelAndDetails = (val: number) => {
    if (val < 20) {
      return {
        label: "Brincadeirinha... 😂",
        desc: "Apenas isso? Você com certeza está me provocando só para ver minha reação! Tenho certeza de que é pelo menos 1000%! 👀❤️",
        emoji: "😜"
      };
    } else if (val < 50) {
      return {
        label: "Amor Carinhoso! 🥰",
        desc: "Um amor super fofo e quentinho, mas aposto que, se fechar os olhos por um segundo, descobre que me ama muito mais! ✨💕",
        emoji: "😳"
      };
    } else if (val < 80) {
      return {
        label: "Amor que Transborda! 💓",
        desc: "Uau, meu coração até errou as batidas aqui! Esse amor é do tamanho do mundo inteiro e enche meus dias de pura alegria. 👩‍❤️‍👨🌟",
        emoji: "💖"
      };
    } else if (val < 100) {
      return {
        label: "Te amo Absurdos! 😍",
        desc: "Você é a minha pessoa favorita em todo o universo! Cada segundo ao seu lado é uma página perfeita da nossa história. 📖✨",
        emoji: "💍"
      };
    } else if (val < 1000) {
      return {
        label: "Amor sem Limites! 🌌🚀💞",
        desc: "Os números tradicionais já não dão mais conta do nosso amor! Ele continua expandindo de forma exponencial e preenchendo cada centímetro do cosmos!",
        emoji: "👑"
      };
    } else {
      return {
        label: "AMOR ABSOLUTO E ETERNO! ♾️❤️🔥",
        desc: "Você burlou as leis da física! Rompemos as barreiras do tempo e espaço para viver uma história eterna. Amo você até o infinito e além!",
        emoji: "🔥"
      };
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLoveValue(val);

    // If she attempts to pull near the limit, automatically increase it!
    if (val >= maxSliderLimit - 4) {
      setMaxSliderLimit(prev => prev + 100);
    }
  };

  const handleSliderRelease = () => {
    if (loveValue >= 90) {
      setHasExploded(true);
      // Trigger a beautiful heart explosion animation
      const hearts = Array.from({ length: 45 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 340, // wide horizontal spread
        y: -(Math.random() * 320 + 120), // high upward float path
        scale: Math.random() * 0.7 + 0.5,
        rotate: Math.random() * 120 - 60,
        delay: Math.random() * 0.2
      }));
      setExplodedHearts(hearts);

      // Clean up explosion
      setTimeout(() => {
        setExplodedHearts([]);
      }, 3500);
    }
  };

  const { label, desc, emoji } = getLoveLevelAndDetails(loveValue);
  const fillPercentage = (loveValue / maxSliderLimit) * 100;

  return (
    <div className="flex flex-col items-center justify-between h-full pt-1 pb-4 relative">
      
      {/* Absolute Overlay for Heart Explosion Particles */}
      <div className="absolute pointer-events-none inset-0 overflow-visible z-50">
        <AnimatePresence>
          {explodedHearts.map(h => (
            <motion.div
              key={h.id}
              initial={{ x: 0, y: -20, opacity: 1, scale: 0 }}
              animate={{ x: h.x, y: h.y, opacity: 0, scale: h.scale, rotate: h.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: h.delay }}
              className="absolute bottom-56 left-[50%] -translate-x-[50%] text-primary"
            >
              <Heart className="w-8 h-8 fill-[#d4a5a5] text-primary stroke-1 drop-shadow-md" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top success badge */}
      <div className="text-center w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#ffccd5]/30 border border-[#ff4d6d]/40 text-[#c9184a] text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 shadow-[0_2px_8px_rgba(255,77,109,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ff4d6d]" />
          Acertou tudo, amor! 🎉
        </motion.div>
        
        <h2 className="font-serif text-3xl font-extrabold text-[#c9184a] leading-tight">
          Quanto você me ama?
        </h2>
        
        <p className="font-sans text-xs text-on-surface-variant max-w-[280px] mx-auto mt-2 leading-relaxed">
          Puxe a barra para me mostrar o tamanho do seu sentimento! <span className="font-bold text-[#ff4d6d]">Não tem limites, amor... 😉👇</span>
        </p>
      </div>

      {/* Dynamic love value indicator with heart pulse */}
      <div className="relative my-6 w-full flex flex-col items-center justify-center">
        {/* Pulsing heart display representing percentage */}
        <div className="relative flex items-center justify-center w-36 h-36">
          <motion.div
            animate={{ 
              scale: [1, 1 + Math.min(0.3, loveValue / 800), 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.max(0.35, 1.8 - (loveValue / 120)), // beats faster as value expands!
              ease: "easeInOut"
            }}
            className="text-[#ff4d6d] drop-shadow-[0_4px_16px_rgba(255,117,143,0.45)]"
          >
            <Heart className="w-28 h-28 fill-[#ff4d6d] stroke-none" />
          </motion.div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#fff0f5]">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider opacity-95 leading-none">AMOR</span>
            <span className="font-serif text-[22px] font-extrabold leading-tight tracking-tight mt-0.5">
              {loveValue >= 1000 ? `${(loveValue/1000).toFixed(1)}k%` : `${loveValue}%`}
            </span>
            <span className="text-lg leading-none mt-1">{emoji}</span>
          </div>
        </div>

        {/* Selected Dessert summary bar */}
        <div className="mt-4 bg-[#fff0f5] border border-[#ffb3c1]/60 rounded-xl px-4 py-1.5 text-xs text-[#c9184a] shadow-xs">
          Sobremesa de hoje: <span className="font-bold underline">{selectedDessert}</span> 🍰✨
        </div>
      </div>

      {/* Elegant Custom Range Slider */}
      <div className="w-full px-4 mb-4">
        <div className="relative w-full flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] font-bold text-[#c9184a] opacity-90 uppercase tracking-widest px-1">
            <span>Pouquinho</span>
            <span>Sem Limites! ♾️🚀</span>
          </div>
          
          <input
            type="range"
            min="10"
            max={maxSliderLimit}
            value={loveValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#ff4d6d] bg-[#ffe5ec] focus:outline-none transition-all"
            style={{
              background: `linear-gradient(to right, #ff4d6d 0%, #ff4d6d ${fillPercentage}%, #ffe5ec ${fillPercentage}%, #ffe5ec 100%)`
            }}
          />
        </div>
      </div>

      {/* Love statement message block */}
      <div className="w-full min-h-[110px] bg-background/60 rounded-2xl border border-outline-variant/45 p-4 text-center flex flex-col justify-center animate-fade-in shadow-inner relative overflow-hidden">
        {hasExploded && (
          <div className="absolute top-1 right-2 w-5 h-5 flex items-center justify-center animate-ping text-[#ff4d6d]">💖</div>
        )}
        <h4 className="font-serif text-base font-extrabold text-[#c9184a] mb-1 italic">
          {label}
        </h4>
        <p className="font-sans text-[12px] text-on-surface-variant leading-relaxed px-1">
          {desc}
        </p>
      </div>

      {/* Footer messaging logic */}
      <div className="w-full mt-4 flex flex-col gap-2">
        <button
          onClick={() => onComplete(loveValue)}
          className="w-full py-3.5 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-bold text-xs font-sans rounded-full flex items-center justify-center gap-1.5 hover:shadow-[0_8px_20px_rgba(255,77,109,0.35)] hover:scale-102 transition-all border border-white/20 active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4 animate-pulse" />
          Confirmar e Ver Nosso Presente Especial! 🎁❤️
        </button>

        <button
          onClick={onReset}
          className="w-full py-2.5 bg-white/80 border border-primary/40 text-primary hover:text-white hover:bg-primary font-bold text-[11px] font-sans rounded-full flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Recomeçar Jornada
        </button>
      </div>
    </div>
  );
};
