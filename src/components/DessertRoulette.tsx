import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DessertOption } from '../types';
import { DESSERT_OPTIONS } from '../questionsData';
import { Sparkles, RefreshCw, ChevronRight } from 'lucide-react';

interface DessertRouletteProps {
  onComplete: (selectedDessert: string) => void;
}

export const DessertRoulette: React.FC<DessertRouletteProps> = ({ onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<DessertOption | null>(null);

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Minimum 5 full spins (1800deg) + random offset
    const randomOffset = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 1800 + randomOffset;
    setRotation(totalRotation);

    // Duration is 4 seconds. Let's calculate winner right after rotation finishes.
    setTimeout(() => {
      setIsSpinning(false);

      // Map the landing rotation to the correct segment.
      // The needle is fixed at the top (which corresponds to 0 deg/360 deg relative to the wheel coordinate).
      // Since the wheel rotates CLOCKWISE by `totalRotation` degrees, the element
      // now under the top needle was originally located at `(360 - (totalRotation % 360)) % 360` degrees counterclockwise.
      const landingDegrees = (360 - (totalRotation % 360)) % 360;

      // 4 segments of 90 degrees:
      // Segment 0: Petit Gâteau (0deg to 90deg)
      // Segment 1: Red Velvet (90deg to 180deg)
      // Segment 2: Fondue Chocolate (180deg to 270deg)
      // Segment 3: Torta de Limão (270deg to 360deg)
      let winningIndex = 0;
      if (landingDegrees >= 0 && landingDegrees < 90) {
        winningIndex = 0;
      } else if (landingDegrees >= 90 && landingDegrees < 180) {
        winningIndex = 1;
      } else if (landingDegrees >= 180 && landingDegrees < 270) {
        winningIndex = 2;
      } else {
        winningIndex = 3;
      }

      setWinner(DESSERT_OPTIONS[winningIndex]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full py-2">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs tracking-widest uppercase font-bold text-primary opacity-60">ETAPA FINAL - SOBREPRESA</span>
        <h2 className="font-serif text-3xl font-bold text-surface-tint mt-1">Doce Destino</h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-[280px] mx-auto mt-2">
          Deixe o destino decidir qual será o nosso doce de comemoração hoje! 🧁✨
        </p>
      </div>

      {/* Decorative Roulette Container */}
      <div className="relative w-72 h-72 flex items-center justify-center mb-8">
        
        {/* Needle Pointer */}
        <div className="absolute -top-5 z-30 flex flex-col items-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] pointer-events-none">
          <div className="w-5 h-5 bg-[#ff4d6d] rounded-full border-[3px] border-[#fff0f5] z-10 shadow-inner"></div>
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-[#ff4d6d]"></div>
        </div>

        {/* Outer Elegant Rose Rim */}
        <div className="absolute inset-0 rounded-full border-[8px] border-cream-surface bg-background shadow-[0_12px_36px_rgba(255,179,193,0.35)] overflow-hidden transition-all duration-500">
          
          {/* Wheel Inner Container rotated by state */}
          <motion.div
            className="w-full h-full relative origin-center"
            style={{
              background: `conic-gradient(
                #ffb3c1 0deg 90deg,
                #FFF0F5 90deg 180deg,
                #ff8fa3 180deg 270deg,
                #ffe5ec 270deg 360deg
              )`
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.1, 0.9, 0.25, 1] }}
          >
            {/* Segment Contents */}
            {/* Sector 1: Pétit gateau (Top Right, 0-90deg) */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] origin-bottom-left flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[14px] font-bold text-[#5c0d16] -rotate-45 translate-x-3 -translate-y-3 text-center select-none leading-tight">
                Pétit<br/>gateau
              </span>
            </div>

            {/* Sector 2: Brownie com sorvete (Bottom Right, 90-180deg) */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] origin-top-left flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[14px] font-bold text-[#c9184a] rotate-45 translate-x-3 translate-y-3 text-center select-none leading-tight">
                Brownie<br/>sorvete
              </span>
            </div>

            {/* Sector 3: Fundue de chocolate (Bottom Left, 180-270deg) */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] origin-top-right flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[14px] font-bold text-white -rotate-45 -translate-x-3 translate-y-3 text-center select-none leading-tight">
                Fundue<br/>chocolate
              </span>
            </div>

            {/* Sector 4: Pipoca doce (Top Left, 270-360deg) */}
            <div className="absolute top-0 left-0 w-[60%] h-[60%] origin-bottom-right flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[14px] font-bold text-[#c9184a] rotate-45 -translate-x-3 -translate-y-3 text-center select-none leading-tight">
                Pipoca<br/>doce
              </span>
            </div>

          </motion.div>
        </div>

        {/* Central Spin Button */}
        <button
          onClick={startSpin}
          disabled={isSpinning}
          className="absolute z-20 w-24 h-24 bg-white rounded-full shadow-[0_6px_20px_rgba(255,77,109,0.25)] border-[4px] border-[#ff4d6d] flex flex-col items-center justify-center active:scale-95 transition-all duration-200 focus:outline-none disabled:opacity-90 disabled:scale-95"
          style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}
        >
          {isSpinning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            >
              <RefreshCw className="w-5 h-5 text-[#ff4d6d]" />
            </motion.div>
          ) : (
            <span className="font-sans text-xs font-bold text-[#ff4d6d] text-center leading-tight">
              Girar para<br/>Escolher
            </span>
          )}
        </button>
      </div>

      {/* Result presentation and confirmation */}
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[90px]">
        {winner ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 w-full"
          >
            <div className="bg-[#ffccd5]/30 border border-[#ff4d6d]/40 px-5 py-3 rounded-2xl flex items-center gap-2 max-w-sm">
              <Sparkles className="w-4 h-4 text-[#ff4d6d] shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#ff4d6d] block leading-none opacity-80">O destino escolheu:</span>
                <span className="font-serif text-lg font-extrabold italic text-[#c9184a]">{winner.name}</span>
              </div>
            </div>

            <button
              onClick={() => onComplete(winner.name)}
              className="mt-2 w-full max-w-[280px] py-3 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-bold rounded-full shadow-[0_8px_16px_rgba(255,77,109,0.3)] hover:shadow-[0_12px_24px_rgba(255,77,109,0.45)] hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm border border-white/20 cursor-pointer"
            >
              Confirmar Escolha
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <p className="text-xs text-on-surface-variant italic animate-pulse">
            {isSpinning ? 'Torcendo pela melhor sobremesa... 🤞💕' : 'Toque no centro para rodar a roleta!'}
          </p>
        )}
      </div>
    </div>
  );
};
