import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartCrack, RotateCcw } from 'lucide-react';

interface ErrorPopupProps {
  isOpen: boolean;
  onRetry: () => void;
  message?: string;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isOpen,
  onRetry,
  message = "Tente de novo, amor! 💕"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#74001b]/55 backdrop-blur-xs p-5 rounded-3xl animate-fade-in">
          {/* Spring Card container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
            }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 18,
              duration: 0.5,
            }}
            className="w-full max-w-[340px] bg-[#fffbfb] rounded-3xl border-2 border-[#ffccd5] p-6 text-center shadow-[0_20px_50px_rgba(255,77,109,0.3)] flex flex-col items-center"
          >
            {/* Sad/Broken heart dynamic visual */}
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4 relative border border-red-150">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <HeartCrack className="w-10 h-10 text-red-500" />
              </motion.div>
              {/* Floating crying sparkle */}
              <span className="absolute top-2 right-2 text-xl">😢</span>
            </div>

            {/* Typography */}
            <h3 className="font-serif text-2xl font-bold text-red-600 mb-2 leading-tight">
              {message}
            </h3>
            
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6 max-w-[240px]">
              Eu sei que você consegue lembrar do nosso momento real! Pense com carinho e tente mais uma vez.
            </p>

            {/* Cutesy Try Again CTA */}
            <button
              onClick={onRetry}
              className="w-full h-12 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white font-bold font-sans rounded-full shadow-[0_8px_16px_rgba(255,77,109,0.3)] hover:shadow-[0_12px_24px_rgba(255,77,109,0.45)] hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm active:scale-95 cursor-pointer border border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
