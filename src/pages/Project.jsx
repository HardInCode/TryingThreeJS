import React, { useState, useEffect } from 'react'

const Project = () => {
  const [mounted, setMounted] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSelecting, setIsSelecting] = useState(false)

  useEffect(() => {
    setMounted(true)
    let rafId = null
    let selectionTimeout = null
    
    const handleMouseMove = (e) => {
      // Only update mouse position if not selecting text and not hovering over interactive elements
      const target = e.target
      const isHoverableElement = target.closest('.filter-button') || target.closest('.project-card') || target.closest('button') || target.closest('a')
      
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

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Maya Civilization Island",
      category: "3d-object",
      description: "A detailed 3D recreation of an ancient Maya civilization scene with temples, vegetation, and atmospheric lighting.",
      image: "/api/placeholder/400/250",
      tech: ["Maya", "3D Modeling", "Texturing"],
      featured: true
    },
    {
      id: 2,
      title: "Character Walk Cycle",
      category: "animation",
      description: "Smooth character animation showcasing natural walking motion with proper weight distribution.",
      image: "/api/placeholder/400/250",
      tech: ["Maya", "Animation", "Rigging"],
      featured: false
    },
    {
      id: 3,
      title: "Temple Exploration",
      category: "cutscene",
      description: "Cinematic cutscene showing exploration of ancient ruins with dynamic camera movements.",
      image: "/api/placeholder/400/250",
      tech: ["Maya", "Cinematography", "Lighting"],
      featured: false
    },
    {
      id: 4,
      title: "Puzzle Adventure Game",
      category: "game",
      description: "Interactive 3D puzzle game with Maya-inspired themes and mechanics.",
      image: "/api/placeholder/400/250",
      tech: ["Unity", "C#", "3D Design"],
      featured: false
    },
    {
      id: 5,
      title: "Organic Tree Model",
      category: "3d-object",
      description: "Highly detailed organic tree model with realistic bark textures and foliage.",
      image: "/api/placeholder/400/250",
      tech: ["Maya", "Substance Painter", "UV Mapping"],
      featured: false
    },
    {
      id: 6,
      title: "Flying Through Clouds",
      category: "animation",
      description: "Dynamic animation of flying through volumetric clouds with particle effects.",
      image: "/api/placeholder/400/250",
      tech: ["Maya", "Particle Systems", "VFX"],
      featured: false
    },
    {
      id: 7,
      title: "Sunset Ritual Scene",
      category: "cutscene",
      description: "Atmospheric cutscene depicting an ancient ritual during golden hour.",
      image: "/api/placeholder/400/250",
      tech: ["Maya", "Lighting", "Color Grading"],
      featured: true
    },
    {
      id: 8,
      title: "Temple Runner",
      category: "game",
      description: "Fast-paced endless runner game set in Maya temple environments.",
      image: "/api/placeholder/400/250",
      tech: ["Unity", "Game Design", "Level Design"],
      featured: false
    }
  ]

  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      const shuffled = [...projects].sort(() => Math.random() - 0.5)
      setFilteredProjects(shuffled)
    } else {
      const filtered = projects.filter(project => project.category === activeFilter)
      setFilteredProjects(filtered)
    }
  }, [activeFilter])

  // Custom SVG Icons
  const CubeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
    </svg>
  )

  const PlayIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5V19L19 12L8 5Z"/>
    </svg>
  )

  const FilmIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 4L20 8H17L15 4H13L15 8H12L10 4H8L10 8H7L5 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H18ZM20 18H4V10H20V18Z"/>
    </svg>
  )

  const GamepadIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 9H8V11H10V13H8V15H6V13H4V11H6V9ZM16.5 11.5C16.5 12.3 15.8 13 15 13S13.5 12.3 13.5 11.5 14.2 10 15 10 16.5 10.7 16.5 11.5ZM14.5 15C14.5 15.8 13.8 16.5 13 16.5S11.5 15.8 11.5 15 12.2 13.5 13 13.5 14.5 14.2 14.5 15ZM17.41 6.59C16.05 5.22 14.12 4.5 12 4.5S7.95 5.22 6.59 6.59C5.22 7.95 4.5 9.88 4.5 12S5.22 16.05 6.59 17.41C7.95 18.78 9.88 19.5 12 19.5S16.05 18.78 17.41 17.41C18.78 16.05 19.5 14.12 19.5 12S18.78 7.95 17.41 6.59ZM12 17.5C9.5 17.5 7.5 15.5 7.5 13H4.5C4.5 16.6 7.4 19.5 11 19.5V16.5C11.3 16.5 11.6 16.5 12 17.5Z"/>
    </svg>
  )

  const GridIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 4H14V8H10V4ZM16 4H20V8H16V4ZM16 10H20V14H16V10ZM10 10H14V14H10V10ZM4 4H8V8H4V4ZM4 10H8V14H4V10ZM4 16H8V20H4V16ZM10 16H14V20H10V16ZM16 16H20V20H16V16Z"/>
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

  const filterButtons = [
    { id: 'all', label: 'All Projects', icon: GridIcon, color: 'from-green-500 to-emerald-600' },
    { id: '3d-object', label: '3D Objects', icon: CubeIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'animation', label: 'Animation', icon: PlayIcon, color: 'from-purple-500 to-purple-600' },
    { id: 'cutscene', label: 'Cutscenes', icon: FilmIcon, color: 'from-orange-500 to-orange-600' },
    { id: 'game', label: 'Games', icon: GamepadIcon, color: 'from-red-500 to-red-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 font-sans overflow-hidden relative">
      {/* Floating background shapes - now with parallax movement */}
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

      {/* Enhanced Maya symbols background - now with parallax movement */}
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

      {/* Floating clouds */}
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
        <div className="max-w-7xl mx-auto px-6">
          <FloatingCard id="card-header" className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-3 poppins-font select-text">
              My <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-green-600 text-lg poppins-font select-text">3D Creations & Digital Experiences</p>
          </FloatingCard>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
        <FloatingCard id="filter-buttons" delay={200}>
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveFilter(button.id)}
                className={`filter-button flex items-center gap-2 px-4 py-2 rounded-xl font-medium poppins-font ${
                  activeFilter === button.id
                    ? `bg-gradient-to-r ${button.color} text-white shadow-lg`
                    : 'bg-white/80 text-gray-700'
                }`}
              >
                <button.icon />
                <span className="text-sm">{button.label}</span>
              </button>
            ))}
          </div>
        </FloatingCard>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <FloatingCard
              key={project.id}
              id={`project-${project.id}`}
              delay={400 + (index * 100)}
              className="group"
            >
              <div className="project-card bg-white/85 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-green-200/50 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-green-300/50">🎨</div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 poppins-font group-hover:text-green-700 transition-colors duration-300 select-text">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 poppins-font leading-relaxed flex-grow line-clamp-3 select-text">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium poppins-font select-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Button */}
                  <button className="view-button w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl font-medium poppins-font mt-auto">
                    View Project
                  </button>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <FloatingCard id="empty-state" delay={600} className="text-center py-12">
            <div className="text-green-300 text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 poppins-font select-text">No projects found</h3>
            <p className="text-gray-500 poppins-font select-text">Try selecting a different category to see more projects.</p>
          </FloatingCard>
        )}
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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Stable hover effects using pure CSS */
        .project-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0) scale(1);
        }
        
        .project-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(34, 197, 94, 0.15);
        }
        
        .filter-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1);
        }
        
        .filter-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.2);
        }
        
        .filter-button:not(.bg-gradient-to-r):hover {
          background: rgba(255, 255, 255, 0.95);
        }
        
        .view-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .view-button:hover {
          background: linear-gradient(to right, #16a34a, #059669);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
          transform: translateY(-2px);
        }
        
        /* Prevent any transform interference */
        .project-card,
        .filter-button {
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Disable animations on reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .project-card,
          .filter-button,
          .view-button {
            transition: none;
          }
          
          .animate-float-slow,
          .animate-float-slower {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Project