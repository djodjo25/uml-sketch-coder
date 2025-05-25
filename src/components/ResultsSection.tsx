
import { Eye, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsSectionProps {
  image: string | null;
  results: any;
}

const ResultsSection = ({ image, results }: ResultsSectionProps) => {
  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Eye className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Analyse terminée</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle size={14} className="mr-1" />
          Détection réussie
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                {results.classes?.length || 0} classes détectées
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Éléments reconnus</h3>
          
          <div className="space-y-4">
            {results.classes?.map((classe: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  {classe.name}
                </h4>
                
                <div className="space-y-2">
                  {classe.attributes?.length > 0 && (
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
                  )}
                  
                  {classe.methods?.length > 0 && (
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultsSection;
