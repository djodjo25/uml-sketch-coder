
import { useState } from "react";
import { Eye, Code, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsSectionProps {
  image: string | null;
  results: any;
  onCodeGeneration: (code: string) => void;
}

const ResultsSection = ({ image, results, onCodeGeneration }: ResultsSectionProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCode = () => {
    setIsGenerating(true);
    
    // Simulation de génération de code
    setTimeout(() => {
      const generatedCode = `public class Utilisateur {
    private String nom;
    private String email;
    
    public void connecter() {
        // Implémentation de la connexion
    }
    
    public void deconnecter() {
        // Implémentation de la déconnexion
    }
}

public class Commande {
    private int id;
    private Date date;
    private Utilisateur utilisateur;
    
    public double calculerTotal() {
        // Calcul du total
        return 0.0;
    }
    
    public void valider() {
        // Validation de la commande
    }
}`;
      
      onCodeGeneration(generatedCode);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Eye className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Résultats de la détection</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle size={14} className="mr-1" />
          Analyse terminée
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image avec annotations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Image analysée</h3>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            {image && (
              <img 
                src={image} 
                alt="Diagramme analysé" 
                className="w-full h-auto max-h-96 object-contain"
              />
            )}
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-600">
                {results.classes.length} classes détectées
              </Badge>
            </div>
          </div>
        </div>

        {/* Résultats structurés */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Structure détectée</h3>
          
          <div className="space-y-4">
            {results.classes.map((classe: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  {classe.name}
                </h4>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Attributs:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {classe.attributes.map((attr: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-600">Méthodes:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {classe.methods.map((method: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs bg-blue-50">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Relations détectées:</h4>
            {results.relations.map((rel: any, index: number) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-blue-700">
                <span>{rel.from}</span>
                <ArrowRight size={14} />
                <span>{rel.to}</span>
                <Badge variant="outline" className="text-xs border-blue-300">
                  {rel.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleGenerateCode}
          disabled={isGenerating}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
        >
          {isGenerating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Génération en cours...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Code size={20} />
              <span>Générer le code source</span>
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ResultsSection;
