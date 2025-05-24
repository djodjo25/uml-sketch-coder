
import { Code2, Github } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">UML Sketch Coder</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
            Comment ça marche
          </a>
          <a href="#examples" className="text-gray-600 hover:text-blue-600 transition-colors">
            Exemples
          </a>
          <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Github size={16} />
            <span>GitHub</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
