
import { useState } from "react";
import { X, User, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (type: 'user' | 'admin') => void;
}

const AuthModal = ({ onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de l'authentification
    onLogin(userType);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type d'utilisateur */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Type de compte</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'user' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Utilisateur</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'admin' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Shield size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Administrateur</span>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="w-full"
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirmer le mot de passe (inscription seulement) */}
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>
          )}

          {/* Bouton de soumission */}
          <Button 
            type="submit"
            className={`w-full py-3 ${
              userType === 'admin' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLogin ? 'Se connecter' : 'S\'inscrire'} en tant que {userType === 'admin' ? 'Administrateur' : 'Utilisateur'}
          </Button>

          {/* Basculer entre connexion et inscription */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLogin ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
