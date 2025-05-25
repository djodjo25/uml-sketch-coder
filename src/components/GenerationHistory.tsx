
import { useState } from "react";
import { History, Trash2, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GenerationItem {
  id: string;
  originalImage: string;
  detectionResults: any;
  selectedVersion: any;
  generatedCode: string;
  timestamp: Date;
  diagramVersions: any[];
}

interface GenerationHistoryProps {
  history: GenerationItem[];
  onRestoreGeneration: (item: GenerationItem) => void;
  onDeleteGeneration: (id: string) => void;
  onViewGeneration: (item: GenerationItem) => void;
}

const GenerationHistory = ({ 
  history, 
  onRestoreGeneration, 
  onDeleteGeneration,
  onViewGeneration 
}: GenerationHistoryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <History className="text-purple-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Historique de génération</h2>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            {history.length} génération{history.length > 1 ? 's' : ''}
          </Badge>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          <span>{isExpanded ? 'Réduire' : 'Développer'}</span>
        </Button>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'max-h-none' : 'max-h-96 overflow-y-auto'}`}>
        {history.map((item, index) => (
          <div 
            key={item.id}
            className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white rounded border overflow-hidden">
                  <img 
                    src={item.originalImage} 
                    alt={`Génération ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Génération #{history.length - index}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatTime(item.timestamp)} • {item.detectionResults?.classes?.length || 0} classes détectées
                  </p>
                  {item.selectedVersion && (
                    <p className="text-xs text-blue-600">
                      Style: {item.selectedVersion.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewGeneration(item)}
                  className="flex items-center space-x-1"
                >
                  <Eye size={14} />
                  <span>Voir</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRestoreGeneration(item)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Download size={14} />
                  <span>Restaurer</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteGeneration(item.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
              <div>
                <span className="font-medium">Classes:</span> {item.detectionResults?.classes?.length || 0}
              </div>
              <div>
                <span className="font-medium">Relations:</span> {item.detectionResults?.relations?.length || 0}
              </div>
              <div>
                <span className="font-medium">Code:</span> {item.generatedCode ? 'Généré' : 'Non généré'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GenerationHistory;
