import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeInfo = ({ currentStage }) => {
  console.log('currentStage:', currentStage);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderContent = {
    1: (
      <div className="bg-amber-50/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-amber-200 max-w-sm">
        <p className="text-sm md:text-base leading-relaxed text-center text-amber-900 font-serif">
          Hi 👋, my name is{' '}
          <span className="font-bold text-amber-700">
            Hardin
          </span>
          , welcome to my first 3D web.
        </p>
      </div>
    ),
    
    2: (
      <div className="bg-amber-50/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-amber-200 max-w-sm">
        <p className="text-sm md:text-base leading-relaxed text-center text-amber-900 font-serif mb-3">
          I'm interested in <span className="font-bold text-emerald-700">Cyber Security</span>, and I have a hobby to create Web, Application, and 3D design.
        </p>
        <button 
          onClick={() => handleNavigation('/about')}
          className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 px-4 py-2 rounded-md text-sm font-serif font-medium transition-colors duration-200 pointer-events-auto"
        >
          About Me
        </button>
      </div>
    ),
    
    3: (
      <div className="bg-amber-50/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-amber-200 max-w-md">
        <p className="text-sm md:text-base leading-relaxed text-center text-amber-900 font-serif mb-3">
          I created this floating island using{' '}
          <span className="font-bold text-emerald-700">
            low-poly 3D assets
          </span>{' '}
          that I had previously made for the final project in my 3D Computer Graphics and Animation course during the{' '}
          <span className="font-bold text-orange-700">
            4th semester
          </span>
          .
        </p>
        <button 
          onClick={() => handleNavigation('/projects')}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-amber-50 px-4 py-2 rounded-md text-sm font-serif font-medium transition-colors duration-200 pointer-events-auto"
        >
          View My Projects
        </button>
      </div>
    ),
    
    4: (
      <div className="bg-amber-50/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-amber-200 max-w-sm">
        <p className="text-sm md:text-base leading-relaxed text-center text-amber-900 font-serif mb-3">
          Thanks for visiting my 3D world! 🌴✈️
        </p>
        <button 
          onClick={() => handleNavigation('/contact')}
          className="w-full bg-orange-700 hover:bg-orange-800 text-amber-50 px-4 py-2 rounded-md text-sm font-serif font-medium transition-colors duration-200 pointer-events-auto"
        >
          Get In Touch
        </button>
      </div>
    )
  };

  return (
    <div className="absolute top-4 left-4 z-10 pointer-events-none">
      {renderContent[currentStage] || null}
    </div>
  );
};

export default HomeInfo