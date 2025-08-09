'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BowlingAnimationProps {
  isVisible: boolean
  onAnimationComplete?: () => void
}

export const BowlingAnimation = ({ isVisible, onAnimationComplete }: BowlingAnimationProps) => {
  const [animationStarted, setAnimationStarted] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isVisible) {
      // Start the first animation immediately
      setAnimationStarted(true)
      
      // Set up interval to repeat animation every 4 seconds (increased for full strike sequence)
      interval = setInterval(() => {
        setAnimationStarted(false)
        // Small delay to ensure state reset, then restart animation
        setTimeout(() => {
          setAnimationStarted(true)
          setAnimationKey(prev => prev + 1) // Force re-render of motion components
        }, 100)
      }, 4000)
    } else {
      setAnimationStarted(false)
    }

    // Cleanup interval on unmount or when visibility changes
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isVisible])

  // Pin positions in a proper 10-pin triangle formation
  const pinPositions = [
    { x: 0, y: 0 },     // Pin 7
    { x: 12, y: -6 },   // Pin 8
    { x: 24, y: -12 },  // Pin 9
    { x: 36, y: -18 },  // Pin 10
    { x: 6, y: 6 },     // Pin 4
    { x: 18, y: 0 },    // Pin 5
    { x: 30, y: -6 },   // Pin 6
    { x: 12, y: 12 },   // Pin 2
    { x: 24, y: 6 },    // Pin 3
    { x: 18, y: 18 },   // Pin 1 (head pin)
  ]

  return (
    <div className="relative w-full h-32 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg overflow-hidden border-2 border-amber-200">
      {/* Bowling Lane */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200">
        {/* Lane Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-300 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-300 transform -translate-y-1/2 translate-y-4"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-300 transform -translate-y-1/2 -translate-y-4"></div>
      </div>

      {/* Bowling Pins */}
      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
        {pinPositions.map((pin, index) => {
          return (
            <motion.div
              key={`pin-${index}-${animationKey}`}
              className="absolute w-2.5 h-5 bg-white rounded-t-full border border-gray-300 shadow-sm"
              style={{
                left: `${pin.x}px`,
                top: `${pin.y}px`,
              }}
              initial={{ rotate: 0, x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={animationStarted ? {
                // Pins fall down in different directions for realistic strike
                rotate: [0, 0, Math.random() * 180 + 90],
                x: [0, 0, (Math.random() - 0.5) * 60],
                y: [0, 0, Math.random() * 30 + 20],
                opacity: [1, 1, 0.3],
                scale: [1, 1, 0.8]
              } : { rotate: 0, x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 1.2 + index * 0.03, // Pins fall in sequence after ball hits
                duration: 0.6,
                ease: "easeOut"
              }}
            />
          )
        })}
      </div>

      {/* Bowling Ball */}
      <motion.div
        key={`ball-${animationKey}`}
        className="absolute top-1/2 w-7 h-7 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg transform -translate-y-1/2 z-10"
        initial={{ x: -40, rotate: 0 }}
        animate={animationStarted ? {
          // Ball travels almost to the right edge where pins are located
          x: "calc(100vw - 120px)", // Travels much further to actually reach the pins
          rotate: 720
        } : { x: -40, rotate: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut"
        }}
        onAnimationComplete={() => {
          if (onAnimationComplete) {
            setTimeout(onAnimationComplete, 1000)
          }
        }}
      >
        {/* Ball holes */}
        <div className="absolute top-1.5 left-1.5 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
        <div className="absolute top-1.5 right-1.5 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
        <div className="absolute bottom-1.5 left-1/2 w-0.5 h-0.5 bg-gray-600 rounded-full transform -translate-x-1/2"></div>
      </motion.div>

      {/* Strike Effect */}
      {animationStarted && (
        <motion.div
          key={`strike-${animationKey}`}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0], 
            scale: [0, 0, 1.2, 1.5, 2],
            rotate: [0, 0, -5, 5, 0]
          }}
          transition={{ 
            delay: 1.2, // Strike appears right when ball reaches pins
            duration: 1.5,
            times: [0, 0.3, 0.5, 0.8, 1]
          }}
        >
          <div className="text-xl font-bold text-yellow-500 drop-shadow-lg">STRIKE!</div>
        </motion.div>
      )}

      {/* Impact Effect */}
      {animationStarted && (
        <motion.div
          key={`impact-${animationKey}`}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 w-8 h-8 border-4 border-yellow-400 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 2, 4]
          }}
          transition={{ 
            delay: 1.2, // Impact happens when ball reaches pins
            duration: 0.5
          }}
        />
      )}

      {/* Sparkle Effects */}
      {animationStarted && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}-${animationKey}`}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                right: `${50 + Math.random() * 60}px`,
                top: `${30 + Math.random() * 60}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
                y: [0, -30, -50]
              }}
              transition={{
                delay: 1.3 + i * 0.05, // Sparkles appear after impact
                duration: 1.2,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Reset indicator */}
      {animationStarted && (
        <motion.div
          key={`reset-${animationKey}`}
          className="absolute bottom-2 right-2 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 1] }}
          transition={{ 
            delay: 3.0, 
            duration: 0.5
          }}
        >
          Resetting...
        </motion.div>
      )}
    </div>
  )
}