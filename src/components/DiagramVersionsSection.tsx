
import { useState } from "react";
import { Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DiagramVersionsSectionProps {
  versions: any[];
  onVersionSelect: (version: any) => void;
}

const DiagramVersionsSection = ({ versions, onVersionSelect }: DiagramVersionsSectionProps) => {
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);

  const handleVersionSelect = (version: any) => {
    setSelectedVersionId(version.id);
    onVersionSelect(version);
  };

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Eye className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Versions digitalisées</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {versions.length} styles disponibles
        </Badge>
      </div>

      <p className="text-gray-600 mb-8">
        Choisissez le style de diagramme digitalisé qui vous convient le mieux :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`border-2 rounded-lg p-4 transition-all duration-300 cursor-pointer ${
              selectedVersionId === version.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleVersionSelect(version)}
          >
            <div className="relative">
              <img
                src={version.preview}
                alt={version.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {selectedVersionId === version.id && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">{version.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {version.description || "Style de diagramme professionnel"}
            </p>
            
            <Button
              variant={selectedVersionId === version.id ? "default" : "outline"}
              className="w-full"
              onClick={() => handleVersionSelect(version)}
            >
              {selectedVersionId === version.id ? "Sélectionné" : "Choisir ce style"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DiagramVersionsSection;
