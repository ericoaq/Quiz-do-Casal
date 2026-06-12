import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface HeartInstance {
  id: number;
  x: number; // percentage width
  delay: number; // seconds
  duration: number; // seconds
  size: number; // pixels
  color: string;
  char: string;
}

const HEART_CHARS = ['💖', '❤️', '💕', '✨', '🌸', '💘', '💍'];
const PASTEL_COLORS = ['text-rose-400', 'text-red-400', 'text-pink-400', 'text-amber-300', 'text-rose-300'];

export const HeartConfetti: React.FC = () => {
  const [hearts, setHearts] = useState<HeartInstance[]>([]);

  useEffect(() => {
    const generated: HeartInstance[] = [];
    // Generate 45 romantic falling elements
    for (let i = 0; i < 45; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100, // random x coordinate
        delay: Math.random() * 4, // delay between 0 and 4s
        duration: 4 + Math.random() * 5, // duration between 4 and 9s
        size: 16 + Math.random() * 24, // size from 16px to 40px
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
        char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
      });
    }
    setHearts(generated);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden rounded-xl">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, x: `${heart.x}%`, opacity: 0, rotate: 0 }}
          animate={{
            y: '105%',
            opacity: [0, 1, 1, 0.8, 0],
            rotate: Math.random() > 0.5 ? 360 : -360,
            x: [`${heart.x}%`, `${heart.x + (Math.random() * 10 - 5)}%`, `${heart.x + (Math.random() * 20 - 10)}%`]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            fontSize: `${heart.size}px`,
          }}
          className={`${heart.color} drop-shadow-sm select-none`}
        >
          {heart.char}
        </motion.div>
      ))}
    </div>
  );
};
