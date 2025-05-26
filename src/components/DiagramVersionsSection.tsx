
import { useState } from "react";
import { Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DiagramViewer from "./DiagramViewer";

interface DiagramVersionsSectionProps {
  versions: any[];
  uploadedImage: string | null;
  onVersionSelect: (version: any) => void;
}

const DiagramVersionsSection = ({ versions, uploadedImage, onVersionSelect }: DiagramVersionsSectionProps) => {
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);
  const [previewVersion, setPreviewVersion] = useState<any | null>(null);

  const handleVersionSelect = (version: any) => {
    setSelectedVersionId(version.id);
    onVersionSelect(version);
  };

  const handlePreview = (version: any) => {
    setPreviewVersion(version);
  };

  const handleDownload = (format: string) => {
    if (previewVersion) {
      // Logique de téléchargement du diagramme
      console.log(`Téléchargement du diagramme ${previewVersion.name} en ${format}`);
    }
  };

  // Generate versions with the uploaded image and style overlays
  const generateStyledVersions = () => {
    if (!uploadedImage) return versions;
    
    return versions.map(version => ({
      ...version,
      preview: uploadedImage, // Use the actual uploaded image
      styledPreview: uploadedImage // We'll add style overlay effects here
    }));
  };

  const styledVersions = generateStyledVersions();

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Eye className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Versions digitalisées</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {styledVersions.length} styles disponibles
        </Badge>
      </div>

      <p className="text-gray-600 mb-8">
        Choisissez le style de diagramme digitalisé qui vous convient le mieux :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {styledVersions.map((version) => (
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
              <div className="relative w-full h-48 rounded-md mb-4 overflow-hidden bg-gray-100">
                <img
                  src={version.preview}
                  alt={version.name}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(version);
                  }}
                />
                {/* Style overlay indicator */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-20 pointer-events-none ${
                  version.id === 1 ? 'from-blue-500 to-blue-700' :
                  version.id === 2 ? 'from-purple-500 to-purple-700' :
                  'from-green-500 to-green-700'
                }`}></div>
                
                {/* Style name overlay */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                  {version.name}
                </div>
              </div>
              
              {selectedVersionId === version.id && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">{version.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {version.description || "Style de diagramme professionnel appliqué à votre image"}
            </p>
            
            <div className="space-y-2">
              <Button
                variant={selectedVersionId === version.id ? "default" : "outline"}
                className="w-full"
                onClick={() => handleVersionSelect(version)}
              >
                {selectedVersionId === version.id ? "Sélectionné" : "Choisir ce style"}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(version);
                }}
              >
                <Eye size={16} className="mr-2" />
                Aperçu détaillé
              </Button>
            </div>
          </div>
        ))}
      </div>

      {previewVersion && (
        <DiagramViewer
          imageUrl={previewVersion.preview}
          title={`Aperçu - ${previewVersion.name}`}
          onDownload={handleDownload}
        />
      )}
    </Card>
  );
};

export default DiagramVersionsSection;
