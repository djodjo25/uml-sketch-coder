
import { Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyButton from "./CopyButton";

interface CodeDownloadSectionProps {
  xmlCode: string;
  selectedVersion: any;
}

const CodeDownloadSection = ({ xmlCode, selectedVersion }: CodeDownloadSectionProps) => {
  const handleDownloadXML = () => {
    const element = document.createElement("a");
    const file = new Blob([xmlCode], { type: 'application/xml' });
    element.href = URL.createObjectURL(file);
    element.download = `uml_diagram_${selectedVersion.name.toLowerCase().replace(' ', '_')}.xml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadImage = (format: string) => {
    // Logique de téléchargement du diagramme en image
    console.log(`Téléchargement du diagramme ${selectedVersion.name} en ${format}`);
  };

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="text-green-600" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Code généré</h2>
        <Badge className="bg-green-100 text-green-800">
          Prêt à télécharger
        </Badge>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            generated_uml.xml
          </span>
          <div className="flex items-center space-x-2">
            <CopyButton textToCopy={xmlCode} className="bg-gray-700 hover:bg-gray-600 border-gray-600" />
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <pre className="p-6 text-gray-100 text-sm overflow-x-auto max-h-96">
          <code>{xmlCode}</code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Télécharger le code</h3>
          <Button onClick={handleDownloadXML} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download size={16} className="mr-2" />
            Télécharger XML
          </Button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Télécharger le diagramme</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              onClick={() => handleDownloadImage('png')}
              className="w-full"
            >
              <Download size={16} className="mr-2" />
              PNG
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleDownloadImage('jpg')}
              className="w-full"
            >
              <Download size={16} className="mr-2" />
              JPG
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">✨ Code généré avec succès !</h3>
        <p className="text-blue-700 text-sm">
          Votre diagramme UML manuscrit a été analysé et transformé en code source. 
          Vous pouvez maintenant télécharger le fichier XML ou l'image du diagramme.
        </p>
      </div>
    </Card>
  );
};

export default CodeDownloadSection;
