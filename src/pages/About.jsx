import React, { useState, useEffect } from 'react'

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)

  useEffect(() => {
    setMounted(true)
    let rafId = null
    let selectionTimeout = null
    
    const handleMouseMove = (e) => {
      // Only update mouse position if not selecting text and not hovering over interactive elements
      const target = e.target
      const isHoverableElement = target.closest('.skill-item') || target.closest('button') || target.closest('a')
      
      if (!isSelecting && !isHoverableElement) {
        // Use requestAnimationFrame to throttle updates
        if (rafId) {
          cancelAnimationFrame(rafId)
        }
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
        })
      }
    }

    const handleMouseDown = () => {
      // Clear any existing timeout
      if (selectionTimeout) {
        clearTimeout(selectionTimeout)
        selectionTimeout = null
      }
      setIsSelecting(true)
    }

    const handleMouseUp = () => {
      // Only reset if there's no text selected after a delay
      selectionTimeout = setTimeout(() => {
        const selection = window.getSelection()
        if (!selection || selection.toString().length === 0) {
          setIsSelecting(false)
        }
      }, 300)
    }

    const handleSelectStart = () => {
      if (selectionTimeout) {
        clearTimeout(selectionTimeout)
        selectionTimeout = null
      }
      setIsSelecting(true)
    }

    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) {
        // Clear any existing timeout when text is selected
        if (selectionTimeout) {
          clearTimeout(selectionTimeout)
          selectionTimeout = null
        }
        setIsSelecting(true)
      } else {
        // Only reset after a longer delay to avoid race conditions
        if (selectionTimeout) {
          clearTimeout(selectionTimeout)
        }
        selectionTimeout = setTimeout(() => {
          setIsSelecting(false)
        }, 500)
      }
    }

    const handleClick = (e) => {
      // If clicking somewhere that's not text, clear selection after delay
      const selection = window.getSelection()
      if (selection && selection.toString().length === 0) {
        selectionTimeout = setTimeout(() => {
          setIsSelecting(false)
        }, 100)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('selectstart', handleSelectStart)
    window.addEventListener('click', handleClick)
    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (selectionTimeout) {
        clearTimeout(selectionTimeout)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('selectstart', handleSelectStart)
      window.removeEventListener('click', handleClick)
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [isSelecting])

  // Custom SVG Icons
  const GraduationCapIcon = () => (
    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3L1 9L5 11.18V17.18C5 19.53 8.13 21 12 21C15.87 21 19 19.53 19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.5 9L12 12.5L5.5 9L12 5.5L18.5 9ZM17 16C17 17.1 15.21 18 12 18C8.79 18 7 17.1 7 16V12.5L12 15L17 12.5V16Z"/>
    </svg>
  )

  const ZapIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 0.5L8.5 8.5L16 8L11 23.5L15.5 15.5L8 16L13 0.5Z"/>
    </svg>
  )

  const PaletteIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H14V8C14 8.55 14.45 9 15 9H19V21Z"/>
    </svg>
  )

  const FilmIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 4L20 8H17L15 4H13L15 8H12L10 4H8L10 8H7L5 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H18ZM20 18H4V10H20V18Z"/>
    </svg>
  )

  const ShieldIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.5V16.5C16,17.1 15.4,17.5 14.8,17.5H9.2C8.6,17.5 8,17.1 8,16.5V12.5C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
    </svg>
  )

  const GlobeIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"/>
    </svg>
  )

  const SchoolIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 13.18V17.18C5 19.53 8.13 21 12 21C15.87 21 19 19.53 19 17.18V13.18L12 17L5 13.18ZM12 16L21 12L12 8L3 12L12 16Z"/>
    </svg>
  )

  const RocketIcon = () => (
    <svg className="w-8 h-8 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2.81 14.12L5.64 11.29L8.17 10.79C6.36 6.96 7.60 2.34 10.36 1.70C12.14 1.27 14.07 2.33 15.17 4.29C15.84 5.26 16.12 6.44 15.95 7.60C18.60 4.05 22.61 2.11 22.61 8.89C22.61 14.08 19.65 16.73 17.18 18.29L14.17 16.35L13.67 18.88L10.84 21.71C10.84 21.71 10.13 19.04 8.15 17.06C6.17 15.08 3.50 14.37 2.81 14.12M16.42 5.13C15.93 4.35 15.04 3.91 14.12 4.08C12.30 4.42 11.35 7.96 12.72 10.04L16.42 5.13M9.88 16.96L10.35 16.49C8.77 15.54 7.46 14.23 6.51 12.65L6.04 13.12C7.9 14.07 9.20 15.37 9.88 16.96Z"/>
    </svg>
  )

  const FloatingCard = ({ children, id, delay = 0, className = "" }) => (
    <div
      id={id}
      className={`transform transition-all duration-500 ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )

  const ParallaxElement = ({ children, speed = 0.5, className = "" }) => (
    <div
      className={className}
      style={{
        transform: isSelecting ? 'none' : `translate(${mousePosition.x * speed * 0.01}px, ${mousePosition.y * speed * 0.01}px)`,
        transition: isSelecting ? 'transform 0.3s ease' : 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 font-sans overflow-hidden relative">
      {/* Floating background shapes - earthy colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxElement speed={0.3} className="absolute top-20 left-10 opacity-10">
          <div className="w-20 h-20 bg-emerald-400 rounded-full blur-xl"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.5} className="absolute top-60 right-20 opacity-10">
          <div className="w-32 h-32 bg-green-500 transform rotate-12 blur-xl"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.2} className="absolute bottom-40 left-1/3 opacity-10">
          <div className="w-28 h-28 bg-teal-400 rounded-full blur-xl"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.4} className="absolute top-1/3 left-1/2 opacity-8">
          <div className="w-24 h-24 bg-yellow-400 transform rotate-45 blur-xl"></div>
        </ParallaxElement>
      </div>

      {/* Enhanced Maya symbols background - more visible and better positioned */}
      <div className="absolute inset-0 pointer-events-none opacity-15 z-0">
        {/* Top area symbols */}
        <ParallaxElement speed={0.1} className="absolute top-12 left-20">
          <div className="text-4xl text-green-600 font-bold transform rotate-12 drop-shadow-sm">◊</div>
        </ParallaxElement>
        <ParallaxElement speed={0.15} className="absolute top-20 right-32">
          <div className="text-5xl text-emerald-600 font-bold transform -rotate-12 drop-shadow-sm">⬟</div>
        </ParallaxElement>
        
        {/* Left side symbols */}
        <ParallaxElement speed={0.08} className="absolute top-80 left-8">
          <div className="text-6xl text-teal-600 font-bold transform rotate-45 drop-shadow-sm">⌘</div>
        </ParallaxElement>
        <ParallaxElement speed={0.12} className="absolute top-1/2 left-16">
          <div className="text-3xl text-green-700 font-bold transform -rotate-45 drop-shadow-sm">◈</div>
        </ParallaxElement>
        
        {/* Right side symbols */}
        <ParallaxElement speed={0.18} className="absolute top-96 right-16">
          <div className="text-4xl text-emerald-700 font-bold transform rotate-30 drop-shadow-sm">⬢</div>
        </ParallaxElement>
        <ParallaxElement speed={0.14} className="absolute top-1/2 right-8">
          <div className="text-5xl text-teal-700 font-bold transform -rotate-30 drop-shadow-sm">⬟</div>
        </ParallaxElement>
        
        {/* Bottom area symbols */}
        <ParallaxElement speed={0.16} className="absolute bottom-32 left-1/4">
          <div className="text-4xl text-green-600 font-bold transform rotate-60 drop-shadow-sm">◊</div>
        </ParallaxElement>
        <ParallaxElement speed={0.20} className="absolute bottom-40 right-1/4">
          <div className="text-3xl text-emerald-600 font-bold transform -rotate-60 drop-shadow-sm">◈</div>
        </ParallaxElement>
        
        {/* Additional scattered symbols */}
        <ParallaxElement speed={0.13} className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <div className="text-3xl text-teal-500 font-bold transform rotate-90 drop-shadow-sm opacity-60">⬢</div>
        </ParallaxElement>
        <ParallaxElement speed={0.11} className="absolute bottom-1/3 left-2/3">
          <div className="text-4xl text-green-500 font-bold transform -rotate-15 drop-shadow-sm opacity-70">⌘</div>
        </ParallaxElement>
      </div>

      {/* Simple floating clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-1/4 animate-float-slow opacity-20">
          <div className="w-16 h-6 bg-white rounded-full blur-sm"></div>
        </div>
        <div className="absolute top-40 right-1/3 animate-float-slower opacity-15">
          <div className="w-12 h-4 bg-white rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative pt-20 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <FloatingCard id="card-header" className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-3 poppins-font select-text">
              Hi, I'm <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">Hardin</span>
            </h1>
            <p className="text-green-600 text-lg poppins-font select-text">Cyber Security Student at President University</p>
          </FloatingCard>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main about card */}
          <FloatingCard 
            id="card-main" 
            delay={200}
            className="lg:col-span-2 bg-white/85 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCapIcon />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 poppins-font select-text">Welcome to my 3D Portfolio!</h2>
                <p className="text-green-600 poppins-font select-text">Student & 3D Design Enthusiast</p>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed poppins-font select-text">
              <p>
                I am a student at President University majoring in Information Technology, I have an interest in 3D modeling design, animation, and game development. This portfolio showcases my journey into the exciting world of 3D design.
              </p>
              <p>
                The 3D Maya island scene you see on the homepage is actually the result of my final assignment 
                for the 4th semester <span className="font-medium text-green-700 bg-green-50 px-2 py-1 rounded">3D Computer Graphics and Animation (CGA)</span> course. 
                It represents countless hours of learning, experimenting, and pushing the boundaries of what I could create.
              </p>
              <p>
                While I study <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">cyber security</span> academically, 
                3D design has become my creative outlet and hobby. I love the intersection between technical precision 
                and artistic expression that 3D modeling offers.
              </p>
            </div>
          </FloatingCard>

          {/* Skills */}
          <FloatingCard 
            id="card-skills" 
            delay={400}
            className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-200/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <ZapIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 poppins-font select-text">What I do</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: PaletteIcon, name: "3D Modeling", desc: "Creating digital worlds", color: "from-emerald-500 to-green-600" },
                { icon: FilmIcon, name: "3D Animation", desc: "Bringing scenes to life", color: "from-green-500 to-emerald-600" },
                { icon: ShieldIcon, name: "Cyber Security", desc: "Academic focus area", color: "from-slate-500 to-slate-700" },
                { icon: GlobeIcon, name: "Web Development", desc: "developing a website", color: "from-teal-500 to-cyan-600" }
              ].map((skill) => (
                <div key={skill.name} className="skill-item flex items-center gap-3 p-2 rounded-lg hover:bg-white/70 transition-all duration-300 group cursor-pointer">
                  <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon />
                  </div>
                  <div className="select-text">
                    <div className="font-medium text-gray-800 poppins-font">{skill.name}</div>
                    <div className="text-sm text-gray-600 poppins-font">{skill.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>

          {/* Academic journey */}
          <FloatingCard 
            id="card-projects" 
            delay={600}
            className="lg:col-span-2 bg-gradient-to-r from-emerald-100/90 to-teal-100/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-md">
                <SchoolIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 poppins-font select-text">My Academic Journey</h3>
            </div>
            <p className="text-gray-700 leading-relaxed poppins-font select-text">
              Currently pursuing my degree at President University with a focus on Cyber Security. 
              The 3D Maya civilization scene featured on this portfolio was created as my final project 
              for the 3D CGA course in my 4th semester. This project allowed me to combine my interest 
              in ancient civilizations with modern 3D technology, creating something both educational and visually stunning.
            </p>
          </FloatingCard>

          {/* Let's connect */}
          <FloatingCard 
            id="card-connect" 
            delay={800}
            className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <div className="text-center select-text">
              <RocketIcon />
              <h4 className="font-semibold text-lg mb-2 poppins-font">Let's create together!</h4>
              <p className="text-green-100 text-sm poppins-font">
                Interested in 3D design or have a creative project in mind?
              </p>
            </div>
          </FloatingCard>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
        }
        .poppins-font {
          font-family: 'Poppins', sans-serif;
        }
        .select-text {
          user-select: text;
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
        }
      `}</style>
    </div>
  )
}

export default About