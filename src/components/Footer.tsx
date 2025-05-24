
import { Code2, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">UML Pilot</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transformez vos diagrammes UML manuscrits en code source automatiquement 
              grâce à l'intelligence artificielle avancée.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Technologies utilisées</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• YOLOv8 pour la détection d'objets</li>
              <li>• PaddleOCR pour la reconnaissance de texte</li>
              <li>• React + TypeScript pour l'interface</li>
              <li>• Tailwind CSS pour le design</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">À propos</h3>
            <p className="text-sm text-gray-400 mb-4">
              Projet de fin d'études (PFE) développé avec passion pour faciliter 
              la transformation de diagrammes manuscrits en code source exploitable.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Fait avec</span>
              <Heart size={14} className="text-red-500" />
              <span>pour l'innovation</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 UML Pilot. Projet de fin d'études - Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
