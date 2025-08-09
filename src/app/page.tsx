'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Calendar, MapPin, Camera, Gift, Star } from "lucide-react"
import { cn, formatDate, getRelativeTime } from "@/lib/utils"
import dynamic from 'next/dynamic'
import { FallingHeartsAnimation } from '@/app/components/falling-heart'
import FloatingBackgroundAnimation from '@/app/components/animation-background'
import { BowlingAnimation } from '@/app/components/bowling-animation'
import { BeachWaveAnimation } from '@/app/components/beach-wave-animation'

// Sample timeline data - replace with your actual memories!
const timelineEvents = [
  {
    id: 1,
    date: "2025-07-12",
    title: "First Meeting",
    description: "The day our eyes first met and everything changed forever ✨",
    location: "Snooker & Route66",
    type: "meeting",
    image: "/placeholder-meeting.jpg", // Add your actual images
    color: "from-pink-400 to-rose-400",
    hasCustomAnimation: false
  },
  {
    id: 2,
    date: "2025-07-16",
    title: "First Date",
    description: "Our first date - you made my heart skip a beat 💕",
    location: "Paws Up Cafe",
    type: "celebration",
    image: "/placeholder-valentine.jpg",
    color: "from-red-400 to-pink-400",
    hasCustomAnimation: false
  },
  {
    id: 3,
    date: "2025-07-17",
    title: "Going above & below",
    description: "Our amazing moment to the BKK highest tower - creating memories that will last forever 🏔️",
    location: "MahaNakorn & CHinaTown",
    type: "travel",
    image: "/placeholder-trip.jpg",
    color: "from-blue-400 to-purple-400",
    hasCustomAnimation: false
  },
  {
    id: 4,
    date: "2025-07-20",
    title: "Going out for slaying stress",
    description: "Someone We could have fun together, bowling and snooker again",
    location: "Blue-O Rhythm & Bowl",
    type: "milestone",
    image: "/placeholder-home.jpg",
    color: "from-green-400 to-teal-400",
    hasCustomAnimation: true,
    animationType: "bowling"
  },
  {
    id: 5,
    date: "2025-20-29",
    title: "Beach Mode",
    description: "Going tripe together first time, with endless possibilities ahead 🎆",
    location: "Pattya City",
    type: "celebration",
    image: "/placeholder-newyear.jpg",
    color: "from-yellow-400 to-orange-400",
    hasCustomAnimation: true,
    animationType: "beach"
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'meeting': return Heart
    case 'celebration': return Star
    case 'travel': return MapPin
    case 'milestone': return Gift
    default: return Calendar
  }
}

function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visibleAnimations, setVisibleAnimations] = useState<Set<number>>(new Set())

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAnimationVisible = (eventId: number) => {
    setVisibleAnimations(prev => new Set([...prev, eventId]))
  }

  const renderCustomAnimation = (event: any, isVisible: boolean) => {
    switch (event.animationType) {
      case 'bowling':
        return (
          <BowlingAnimation 
            isVisible={isVisible}
            onAnimationComplete={() => console.log('Bowling animation completed!')}
          />
        )
      case 'beach':
        return (
          <BeachWaveAnimation 
            isVisible={isVisible}
            onAnimationComplete={() => console.log('Beach animation completed!')}
          />
        )
      default:
        return null
    }
  }

  // Prevent hydration mismatch by not rendering animations until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative">
        {/* Floating Background Animation */}
        <FloatingBackgroundAnimation />
        
        {/* Static header without animations */}
        <header className="text-center py-16 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Static heart for SSR - FallingHeartsAnimation handles its own hydration */}
            <FallingHeartsAnimation />
            
            <h1 className="font-script text-6xl md:text-8xl romantic-text mb-4">
              Our Love Story
            </h1>
            
            <p className="font-elegant text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              A beautiful journey of two hearts becoming one, filled with laughter, 
              adventures, and endless love 💕
            </p>
            
            <div className="mt-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Calendar className="w-5 h-5 text-pink-500" />
              <span className="font-medium text-gray-700">
                {timelineEvents.length} Beautiful Memories
              </span>
            </div>
          </div>
        </header>

        {/* Static timeline without animations */}
        <div className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line rounded-full opacity-30 hidden md:block"></div>
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const Icon = getIcon(event.type)
                const isLeft = index % 2 === 0
                
                return (
                  <div
                    key={event.id}
                    className={cn(
                      "relative flex items-center",
                      "justify-center", // Mobile: center everything
                      isLeft ? "md:justify-start" : "md:justify-end" // Desktop: alternate left/right
                    )}
                  >
                    <div
                      className={cn(
                        "w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300",
                        "mx-4", // Mobile: full width with margin
                        "md:max-w-md md:mx-0", // Desktop: max width
                        isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                      )}
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                        <span className="text-pink-500">•</span>
                        <span>{getRelativeTime(event.date)}</span>
                      </div>

                      <h3 className="font-elegant text-2xl font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Custom Animation for specific events */}
                      {event.hasCustomAnimation && (
                        <div className="mb-4">
                          {renderCustomAnimation(event, false)}
                        </div>
                      )}

                      {selectedEvent === event.id && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                            <Camera className="w-12 h-12 text-gray-400" />
                            <span className="ml-2 text-gray-500">Photo placeholder</span>
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            Click to add your beautiful memory photo here! 📸
                          </p>
                        </div>
                      )}

                      <button className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors">
                        {selectedEvent === event.id ? "Show less" : "View details"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <footer className="text-center py-16 px-4 bg-gradient-to-r from-pink-100 to-purple-100 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="inline-block mb-6">
              <Heart className="w-12 h-12 text-pink-500" fill="currentColor" />
            </div>
            
            <h2 className="font-script text-4xl romantic-text mb-4">
              Forever & Always
            </h2>
            
            <p className="font-elegant text-lg text-gray-600">
              Here's to many more beautiful memories together ✨
            </p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative">
      {/* Floating Background Animation */}
      <FloatingBackgroundAnimation />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* FallingHeartsAnimation with full animations */}
          <FallingHeartsAnimation />
          
          <h1 className="font-script text-6xl md:text-8xl romantic-text mb-4">
            Our Love Story
          </h1>
          
          <p className="font-elegant text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            A beautiful journey of two hearts becoming one, filled with laughter, 
            adventures, and endless love 💕
          </p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="mt-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
          >
            <Calendar className="w-5 h-5 text-pink-500" />
            <span className="font-medium text-gray-700">
              {timelineEvents.length} Beautiful Memories
            </span>
          </motion.div>
        </div>
      </motion.header>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line rounded-full opacity-30 hidden md:block"></div>
          
          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const Icon = getIcon(event.type)
              const isLeft = index % 2 === 0
              const isAnimationVisible = visibleAnimations.has(event.id)
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onViewportEnter={() => {
                    if (event.hasCustomAnimation) {
                      handleAnimationVisible(event.id)
                    }
                  }}
                  className={cn(
                    "relative flex items-center",
                    "justify-center", // Mobile: center everything
                    isLeft ? "md:justify-start" : "md:justify-end" // Desktop: alternate left/right
                  )}
                >
                  {/* Event Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                      "w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300",
                      "mx-4", // Mobile: full width with margin
                      "md:max-w-md md:mx-0", // Desktop: positioned left/right with padding and max width
                      isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12",
                      selectedEvent === event.id ? "ring-4 ring-pink-200 shadow-2xl" : ""
                    )}
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  >
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                      <span className="text-pink-500">•</span>
                      <span>{getRelativeTime(event.date)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-elegant text-2xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Custom Animation for specific events */}
                    {event.hasCustomAnimation && (
                      <div className="mb-4">
                        {renderCustomAnimation(event, isAnimationVisible)}
                      </div>
                    )}

                    {/* Expanded Content */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: selectedEvent === event.id ? "auto" : 0,
                        opacity: selectedEvent === event.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-200">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <Camera className="w-12 h-12 text-gray-400" />
                          <span className="ml-2 text-gray-500">Photo placeholder</span>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          Click to add your beautiful memory photo here! 📸
                        </p>
                      </div>
                    </motion.div>

                    {/* View More Button */}
                    <button className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors">
                      {selectedEvent === event.id ? "Show less" : "View details"}
                    </button>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-16 px-4 bg-gradient-to-r from-pink-100 to-purple-100 relative z-10"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            className="inline-block mb-6"
          >
            <Heart className="w-12 h-12 text-pink-500" fill="currentColor" />
          </motion.div>
          
          <h2 className="font-script text-4xl romantic-text mb-4">
            Forever & Always
          </h2>
          
          <p className="font-elegant text-lg text-gray-600">
            Here's to many more beautiful memories together ✨
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

export default TimelinePage