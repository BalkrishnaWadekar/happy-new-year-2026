import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { randomInt, randomRange, sample, generateId } from '../utils';

const EMOJIS = ['🎆', '🎊', '🥂', '✨', '💫', '🎉', '🍾', '🎈'];

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  duration: number;
  delay: number;
  size: number;
}

const FloatingEmojis: React.FC = () => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const newEmojis: FloatingEmoji[] = Array.from({ length: 15 }).map(() => ({
      id: generateId(),
      emoji: sample(EMOJIS),
      x: randomRange(0, 100),
      duration: randomRange(10, 20),
      delay: randomRange(0, 10),
      size: randomInt(20, 40),
    }));
    setEmojis(newEmojis);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {emojis.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '110vh', x: `${item.x}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, randomInt(-20, 20), 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            fontSize: item.size,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
