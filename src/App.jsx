import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import JoshuaNavigation from './components/JoshuaNavigation';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Contact from './pages/Contact';

const App = () => {
  return (
    <main className="app-container">
      <Router>
        <JoshuaNavigation />
        
        {/* Main Content Area */}
        <div className="relative z-10">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Project />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
};

export default App;