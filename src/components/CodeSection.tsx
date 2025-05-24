
import { useState } from "react";
import { Copy, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CodeSectionProps {
  code: string;
}

const CodeSection = ({ code }: CodeSectionProps) => {
  const [language, setLanguage] = useState("java");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `generated_classes.${language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Code généré</h2>
          <Badge className="bg-green-100 text-green-800">
            Prêt à télécharger
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleCopy} size="sm">
            {copied ? (
              <CheckCircle size={16} className="text-green-600" />
            ) : (
              <Copy size={16} />
            )}
            {copied ? "Copié !" : "Copier"}
          </Button>

          <Button onClick={handleDownload} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download size={16} className="mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            generated_classes.{language}
          </span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <pre className="p-6 text-gray-100 text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">✨ Code généré avec succès !</h3>
        <p className="text-blue-700 text-sm">
          Votre diagramme UML manuscrit a été analysé et transformé en code source. 
          Vous pouvez maintenant télécharger le fichier ou copier le code pour l'utiliser dans votre projet.
        </p>
      </div>
    </Card>
  );
};

export default CodeSection;
