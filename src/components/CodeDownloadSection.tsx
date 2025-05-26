
import { useState } from "react";
import { Download, FileText, Image as ImageIcon, CheckCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CodeDownloadSectionProps {
  xmlCode: string;
  selectedVersion: any;
}

const CodeDownloadSection = ({ xmlCode, selectedVersion }: CodeDownloadSectionProps) => {
  const [imageFormat, setImageFormat] = useState("png");
  const [copied, setCopied] = useState(false);

  const handleCopyXML = () => {
    navigator.clipboard.writeText(xmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadXML = () => {
    const element = document.createElement("a");
    const file = new Blob([xmlCode], { type: 'application/xml' });
    element.href = URL.createObjectURL(file);
    element.download = `uml_diagram.xml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadImage = async () => {
    try {
      // Appel vers votre endpoint de génération d'image
      const response = await fetch('YOUR_IMAGE_GENERATION_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          version: selectedVersion,
          format: imageFormat 
        })
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const element = document.createElement("a");
      element.href = url;
      element.download = `uml_diagram.${imageFormat}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      // Fallback pour la démonstration
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = '#333';
        ctx.font = '24px Arial';
        ctx.fillText('Diagramme UML Généré', 250, 300);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = url;
            element.download = `uml_diagram.${imageFormat}`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            URL.revokeObjectURL(url);
          }
        }, `image/${imageFormat}`);
      }
    }
  };

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Téléchargements</h2>
          <Badge className="bg-green-100 text-green-800">
            Prêt à télécharger
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code XML */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FileText className="mr-2 text-blue-600" size={20} />
              Code XML du diagramme
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyXML}
              className="flex items-center space-x-1 text-xs"
            >
              {copied ? (
                <CheckCircle size={14} className="text-green-600" />
              ) : (
                <Copy size={14} />
              )}
              <span>{copied ? "Copié !" : "Copier"}</span>
            </Button>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2">
              <span className="text-gray-300 text-sm font-medium">
                uml_diagram.xml
              </span>
            </div>
            <pre className="p-4 text-gray-100 text-xs overflow-x-auto max-h-64">
              <code>{xmlCode}</code>
            </pre>
          </div>
          
          <Button onClick={handleDownloadXML} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download size={16} className="mr-2" />
            Télécharger le code XML
          </Button>
        </div>

        {/* Image du diagramme */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <ImageIcon className="mr-2 text-purple-600" size={20} />
            Diagramme digitalisé
          </h3>
          
          <div className="border rounded-lg p-4 bg-gray-50">
            <img
              src={selectedVersion?.preview || "/placeholder.svg?height=200&width=300&text=Diagramme"}
              alt="Diagramme sélectionné"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm font-medium text-gray-700">Format :</span>
              <Select value={imageFormat} onValueChange={setImageFormat}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleDownloadImage} className="w-full bg-purple-600 hover:bg-purple-700">
            <Download size={16} className="mr-2" />
            Télécharger l'image ({imageFormat.toUpperCase()})
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">✨ Traitement terminé avec succès !</h4>
        <p className="text-green-700 text-sm">
          Votre diagramme UML manuscrit a été analysé, digitalisé et converti en code XML. 
          Vous pouvez maintenant télécharger les fichiers pour les utiliser dans vos projets.
        </p>
      </div>
    </Card>
  );
};

export default CodeDownloadSection;
