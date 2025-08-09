import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

// Add this component for the falling hearts effect
export const FallingHeartsAnimation = () => {
  const [fallingHearts, setFallingHearts] = useState<Array<{ id: number; delay: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        delay: Math.random() * 0.5
      }
      
      setFallingHearts(prev => [...prev, newHeart])
      
      // Remove hearts after animation completes
      setTimeout(() => {
        setFallingHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
      }, 3000)
    }, 800) // Create new heart every 800ms

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative inline-block mb-6">
      {/* Main pulsing heart */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="relative z-10"
      >
        <Heart className="w-16 h-16 text-pink-500 mx-auto" fill="currentColor" />
      </motion.div>

      {/* Falling hearts */}
      <AnimatePresence>
        {fallingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 1, 
              scale: 0.3,
              x: Math.random() * 20 - 10, // Random horizontal offset
              y: 0 
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.1,
              y: 100,
              x: Math.random() * 40 - 20 // Drift sideways as they fall
            }}
            transition={{ 
              duration: 2.5,
              delay: heart.delay,
              ease: "easeOut"
            }}
            className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
          >
            <Heart 
              className="w-6 h-6 text-pink-400" 
              fill="currentColor" 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}