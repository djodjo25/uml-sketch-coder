
import { Code2, Github, LogIn, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'user' | 'admin' | null>(null);

  const handleLogin = (type: 'user' | 'admin') => {
    setIsLoggedIn(true);
    setUserType(type);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">UML Pilot</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              Comment ça marche
            </a>
            <a href="#examples" className="text-gray-600 hover:text-blue-600 transition-colors">
              Exemples
            </a>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {userType === 'admin' ? 'Administrateur' : 'Utilisateur'}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn size={16} />
                <span>Se connecter</span>
              </Button>
            )}
            
            <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Github size={16} />
              <span>GitHub</span>
            </button>
          </nav>
        </div>
      </header>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
};

export default Header;
