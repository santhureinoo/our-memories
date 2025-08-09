'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Star } from 'lucide-react'

interface FloatingElement {
  id: number
  type: 'heart' | 'sparkle' | 'star'
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

const FloatingBackgroundAnimation = () => {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [isClient, setIsClient] = useState(false)

  // Ensure we only run on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Create initial elements
    const createRandomElement = (): FloatingElement => ({
      id: Date.now() + Math.random(), // More unique ID
      type: ['heart', 'sparkle', 'star'][Math.floor(Math.random() * 3)] as 'heart' | 'sparkle' | 'star',
      x: Math.random() * 100, // Percentage across screen
      y: Math.random() * 100, // Percentage down screen
      size: Math.random() * 20 + 15, // 15-35px (increased for visibility)
      duration: Math.random() * 15 + 10, // 10-25 seconds (reduced for more activity)
      delay: Math.random() * 2, // 0-2 second delay (reduced)
      opacity: Math.random() * 0.4 + 0.3 // 0.3-0.7 opacity (increased for visibility)
    })

    // Create initial batch of elements
    const initialElements = Array.from({ length: 12 }, createRandomElement)
    setElements(initialElements)

    // Continuously add new elements
    const interval = setInterval(() => {
      const newElement = createRandomElement()
      setElements(prev => [...prev, newElement])

      // Remove the element after its animation completes
      setTimeout(() => {
        setElements(prev => prev.filter(el => el.id !== newElement.id))
      }, (newElement.duration + newElement.delay) * 1000)
    }, 2000) // Add new element every 2 seconds (increased frequency)

    return () => clearInterval(interval)
  }, [isClient])

  const getIcon = (type: string, size: number) => {
    // Use fixed Tailwind classes instead of dynamic ones
    const iconSize = size > 25 ? 'w-8 h-8' : size > 20 ? 'w-6 h-6' : 'w-4 h-4'
    const className = `${iconSize} text-pink-400`
    
    switch (type) {
      case 'heart':
        return <Heart className={className} fill="currentColor" />
      case 'sparkle':
        return <Sparkles className={className} />
      case 'star':
        return <Star className={className} fill="currentColor" />
      default:
        return <Heart className={className} fill="currentColor" />
    }
  }

  // Don't render anything on server side
  if (!isClient) {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {elements.map((element) => (
          <motion.div
            key={element.id}
            initial={{
              x: `${element.x}vw`,
              y: `${element.y}vh`,
              opacity: 0,
              scale: 0,
              rotate: 0
            }}
            animate={{
              x: `${element.x + (Math.random() - 0.5) * 40}vw`, // Increased drift
              y: `${element.y + (Math.random() - 0.5) * 30}vh`, // Increased drift
              opacity: [0, element.opacity, element.opacity, 0],
              scale: [0, 1.2, 1, 0], // Slightly larger scale
              rotate: [0, 180, 360, 540] // Reduced rotations for smoother animation
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              ease: "easeInOut",
              times: [0, 0.15, 0.85, 1] // Adjusted timing
            }}
            className="absolute"
          >
            {getIcon(element.type, element.size)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Additional floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-60"
            animate={{
              x: [0, 150, 300, 450, 600],
              y: [0, -60, 40, -40, 0],
              opacity: [0, 0.8, 0.4, 0.9, 0]
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`
            }}
          />
        ))}
      </div>

      {/* Gentle floating bubbles */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 backdrop-blur-sm"
            animate={{
              y: [0, -150, -300, -450],
              x: [0, 40, -30, 20],
              scale: [0.3, 1.2, 0.9, 0.2],
              opacity: [0, 0.5, 0.3, 0]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeOut"
            }}
            style={{
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              left: `${20 + (i * 20)}%`,
              top: '100%'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FloatingBackgroundAnimation