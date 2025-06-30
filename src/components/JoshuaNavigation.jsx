import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const JoshuaNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  // Update currentPage when location changes
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  // Control body scroll when menu is open
  useEffect(() => {
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    
    if (isOpen) {
      bodyStyle.overflow = 'hidden';
      htmlStyle.overflow = 'hidden';
    } else {
      bodyStyle.overflow = '';
      htmlStyle.overflow = '';
    }
    
    return () => {
      bodyStyle.overflow = '';
      htmlStyle.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (path) => {
    navigate(path);
    setCurrentPage(path);
    closeMenu();
  };

  const navItems = [
    { path: '/', label: "Floating Island" },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const currentPageLabel = navItems.find(item => item.path === currentPage)?.label || 'Home';
    
  return (
    <div className="fixed w-full z-40">
      {/* Top Left Logo */}
      <div className="absolute top-6 left-6 z-40">
        <div className="text-black font-bold text-lg">
          <div>My</div>
          <div>Island</div>
        </div>
      </div>

      {/* Menu Toggle Button - Top Right */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-all duration-300"
      >
        <div className="w-6 h-6 relative flex flex-col items-center justify-center">
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
              isOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          />
        </div>
      </button>

      {/* Dark Sidebar Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-xl z-40 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Navigation Items */}
        <div className="pt-20 px-8">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left py-4 px-6 text-xl font-medium rounded-lg transition-all duration-300 ${
                  item.path === currentPage 
                    ? 'text-blue-400 text-2xl font-bold bg-white/5' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={closeMenu}
        />
      )}

      {/* Current Page Indicator */}
      <div className="fixed bottom-6 left-6 text-black/80 text-sm">
        Current: {currentPageLabel}
      </div>
    </div>
  );
};

export default JoshuaNavigation;