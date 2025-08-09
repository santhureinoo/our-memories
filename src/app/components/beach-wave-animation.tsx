'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BeachWaveAnimationProps {
  isVisible: boolean
  onAnimationComplete?: () => void
}

export const BeachWaveAnimation = ({ isVisible, onAnimationComplete }: BeachWaveAnimationProps) => {
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    if (isVisible && !animationStarted) {
      setAnimationStarted(true)
    }
  }, [isVisible, animationStarted])

  return (
    <div className="relative w-full h-32 bg-gradient-to-b from-sky-200 to-blue-400 rounded-lg overflow-hidden border-2 border-blue-300">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-200 to-blue-300">
        {/* Sun */}
        <motion.div
          className="absolute top-4 right-6 w-8 h-8 bg-yellow-400 rounded-full"
          animate={animationStarted ? {
            rotate: 360,
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-3 bg-yellow-300 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '50% 16px',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
              }}
              animate={animationStarted ? {
                scaleY: [1, 1.3, 1]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Beach Sand */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-200 to-yellow-100"></div>

      {/* Waves - Multiple layers for depth */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 h-12"
        animate={animationStarted ? {
          x: [-20, 20, -20]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Wave 1 - Back layer */}
        <motion.div
          className="absolute bottom-0 w-full h-8 bg-blue-300 opacity-60"
          style={{
            clipPath: "polygon(0% 100%, 0% 60%, 10% 50%, 20% 60%, 30% 45%, 40% 55%, 50% 40%, 60% 50%, 70% 35%, 80% 45%, 90% 30%, 100% 40%, 100% 100%)"
          }}
          animate={animationStarted ? {
            x: [0, -30, 0]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Wave 2 - Middle layer */}
        <motion.div
          className="absolute bottom-0 w-full h-6 bg-blue-400 opacity-80"
          style={{
            clipPath: "polygon(0% 100%, 0% 70%, 15% 55%, 25% 65%, 35% 50%, 45% 60%, 55% 45%, 65% 55%, 75% 40%, 85% 50%, 95% 35%, 100% 45%, 100% 100%)"
          }}
          animate={animationStarted ? {
            x: [0, 25, 0]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Wave 3 - Front layer */}
        <motion.div
          className="absolute bottom-0 w-full h-4 bg-blue-500"
          style={{
            clipPath: "polygon(0% 100%, 0% 80%, 12% 65%, 22% 75%, 32% 60%, 42% 70%, 52% 55%, 62% 65%, 72% 50%, 82% 60%, 92% 45%, 100% 55%, 100% 100%)"
          }}
          animate={animationStarted ? {
            x: [0, -15, 0]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Jellyfish */}
      {animationStarted && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 20}%`,
                bottom: `${25 + Math.random() * 20}px`,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0,
                y: 30
              }}
              animate={{
                opacity: [0, 0.8, 0.8],
                scale: [0, 1, 1],
                y: [30, 0, -5, 0],
                x: [0, 3, -3, 0]
              }}
              transition={{
                delay: 0.8 + i * 0.4,
                duration: 2,
                ease: "easeOut",
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                x: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Jellyfish Body */}
              <div className="relative">
                {/* Bell/Umbrella */}
                <motion.div
                  className="w-6 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full opacity-80"
                  animate={{
                    scaleY: [1, 1.1, 1],
                    scaleX: [1, 0.95, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
                
                {/* Tentacles */}
                {[...Array(4)].map((_, tentacleIndex) => (
                  <motion.div
                    key={tentacleIndex}
                    className="absolute top-3 bg-pink-300 opacity-60"
                    style={{
                      left: `${2 + tentacleIndex * 4}px`,
                      width: '1px',
                      height: '8px',
                      transformOrigin: 'top center'
                    }}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scaleY: [1, 1.2, 0.8, 1]
                    }}
                    transition={{
                      duration: 1.5 + tentacleIndex * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: tentacleIndex * 0.1
                    }}
                  />
                ))}
                
                {/* Jellyfish glow effect */}
                <motion.div
                  className="absolute inset-0 w-6 h-4 bg-pink-200 rounded-full opacity-30 blur-sm"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </>
      )}

      {/* Bubbles */}
      {animationStarted && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/60 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: '20px',
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -60, -100],
                x: [0, Math.random() * 20 - 10]
              }}
              transition={{
                delay: 1 + i * 0.4,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </>
      )}

      {/* Beach Text Effect */}
      {animationStarted && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1.2, 1, 0.8],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            delay: 2, 
            duration: 2,
            times: [0, 0.3, 0.7, 1]
          }}
          onAnimationComplete={onAnimationComplete}
        >
          <div className="text-xl font-bold text-white drop-shadow-lg">
            🏖️ Beach Vibes! 🌊
          </div>
        </motion.div>
      )}
    </div>
  )
}