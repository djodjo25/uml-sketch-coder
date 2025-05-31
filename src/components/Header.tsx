
import { Code2 } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">UML Pilot</span>
          </div>
          
          <nav className="flex items-center">
            <img 
              src="/lovable-uploads/50b03050-82cb-4d02-8925-2ddab0dd5951.png" 
              alt="VERMEG Logo" 
              className="h-12 w-auto"
            />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
