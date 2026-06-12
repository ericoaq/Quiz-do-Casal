import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RefreshCw, Upload, Music, VolumeX, Award } from 'lucide-react';
import { PolaroidMural } from './PolaroidMural';

interface CoupleCelebrationProps {
  lovePercentage: number;
  selectedDessert: string;
  onReset: () => void;
}

export const CoupleCelebration: React.FC<CoupleCelebrationProps> = ({
  lovePercentage,
  selectedDessert,
  onReset
}) => {
  return (
    <div className="flex flex-col items-center justify-start h-full pt-1 pb-2 overflow-y-auto max-h-[750px] pr-1 select-none scrollbar-hide flex-1">
      
      {/* 1. INTERACTIVE POLAROID WORKSPACE MURAL */}
      <div className="w-full relative mb-1 shrink-0">
        <PolaroidMural 
          lovePercentage={lovePercentage} 
          selectedDessert={selectedDessert} 
        />
      </div>

      {/* 3. ROMANTIC LETTER WRAPPER CARD */}
      <div className="w-full bg-[#fffbfb] rounded-2xl border-2 border-[#ffccd5] p-5 text-center shadow-md relative flex flex-col gap-3.5 shrink-0 mb-4 animate-fade-in_delay mt-2">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white rounded-full px-3 py-0.5 text-[8.5px] font-bold uppercase tracking-widest leading-none flex items-center gap-1 shadow-xs border border-white">
          <Heart className="w-2.5 h-2.5 fill-white animate-pulse" />
          Feliz dia dos namorados, amor!
        </div>

        <h3 className="font-serif text-2xl font-black text-[#5c0d16] tracking-tight leading-tight mt-1.5">
          Te Amo até o Infinito! ❤️
        </h3>

        <div className="font-sans text-xs text-on-surface-variant leading-relaxed space-y-3 px-1">
          <p>
            Hoje comemoramos o <strong>Dia dos Namorados</strong> com a maior alegria possível do mundo! E amanhã faltará exatamente <strong>1 mês</strong> para celebrarmos os nossos inesquecíveis <strong>2 anos</strong> juntos! 👩‍❤️‍👨✨
          </p>
          <p>
            Completar esta romântica jornada prova como cada data marcante, hambúrguer frito, fondue à luz de velas e beijo apertado estão bem guardados nas gavetas do nosso amor.
          </p>
          
          {/* Dynamic recap labels */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#ffe5ec] text-left">
            <div className="bg-[#ffe5ec] p-2.5 rounded-xl border border-[#ffccd5]">
              <span className="text-[10px] font-bold text-[#c9184a] block uppercase">Nossas Alianças 💍</span>
              <span className="font-bold text-[#5c0d16] text-[11px]">03/08/2024</span>
            </div>
            <div className="bg-[#ffe5ec] p-2.5 rounded-xl border border-[#ffccd5]">
              <span className="text-[10px] font-bold text-[#c9184a] block uppercase">Nossa Sobremesa 🎂</span>
              <span className="font-bold text-[#5c0d16] text-[11px] truncate block" title={selectedDessert}>
                {selectedDessert}
              </span>
            </div>
          </div>
          
          <div className="bg-[#fff0f5] border-2 border-dashed border-[#ff4d6d]/60 p-3 rounded-2xl mt-4 text-center">
            <span className="text-[10px] font-extrabold text-[#c9184a] uppercase block tracking-wider">Métrica de Amor Registrada</span>
            <span className="font-serif text-[19px] font-black text-[#ff4d6d] tracking-tight">{lovePercentage}% (Amor supremo! ♾️💖)</span>
          </div>
        </div>
      </div>

      {/* 4. RESTART BUTTON / ACTIONS */}
      <div className="w-full mt-2 shrink-0">
        <button
          onClick={onReset}
          className="w-full py-3.5 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-bold font-sans rounded-full shadow-[0_8px_20px_rgba(255,77,109,0.3)] hover:shadow-[0_12px_24px_rgba(255,77,109,0.45)] hover:scale-102 transition-all flex items-center justify-center gap-2 text-xs active:scale-95 cursor-pointer border border-white/20"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reiniciar Nossa Jornada de Amor 💖
        </button>
      </div>

    </div>
  );
};
