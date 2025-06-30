import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Contact from './pages/Contact';
import JoshuaNavigation from './components/JoshuaNavigation';
import { Loader } from './components/Loader';
import '@fontsource/poppins'; // Defaults to weight 400
import '@fontsource/poppins/400.css'; // Specify weight
import '@fontsource/poppins/700.css'; // Bold
// In your src/index.js or App.js
import '@fontsource/space-grotesk'; // Defaults to weight 400
import '@fontsource/space-grotesk/400.css'; // Specific weight
import '@fontsource/space-grotesk/300.css'; // Light weight
import '@fontsource/space-grotesk/500.css'; // Medium weight

export {
  Home,
  About,
  Project,
  Contact,
  JoshuaNavigation,
  Loader
};