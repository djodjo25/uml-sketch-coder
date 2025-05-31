
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
              src="/lovable-uploads/c4b3cd80-11cf-4a9f-a7e2-a6389afada83.png" 
              alt="VERMEG Logo" 
              className="h-16 w-auto"
            />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
