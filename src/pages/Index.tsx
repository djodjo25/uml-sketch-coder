
import { useState } from "react";
import { Upload, Eye, Code, Download } from "lucide-react";
import Header from "@/components/Header";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import DiagramVersionsSection from "@/components/DiagramVersionsSection";
import CodeDownloadSection from "@/components/CodeDownloadSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<any>(null);
  const [diagramVersions, setDiagramVersions] = useState<any[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleImageUpload = async (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep(2);
    
    try {
      // Appel vers votre modèle YOLOv8 sur Colab
      const detectionResponse = await fetch('YOUR_COLAB_YOLO_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageUrl })
      });
      
      const detectionData = await detectionResponse.json();
      
      // Appel vers votre modèle PaddleOCR sur Colab
      const ocrResponse = await fetch('YOUR_COLAB_OCR_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageUrl })
      });
      
      const ocrData = await ocrResponse.json();
      
      // Combinaison des résultats
      const combinedResults = {
        detection: detectionData,
        ocr: ocrData,
        classes: extractClassesFromResults(detectionData, ocrData),
        relations: extractRelationsFromResults(detectionData)
      };
      
      setDetectionResults(combinedResults);
      setCurrentStep(3);
      
      // Génération des versions digitalisées
      generateDiagramVersions(combinedResults);
      
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
      // Fallback avec données simulées pour le développement
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setTimeout(() => {
      const mockResults = {
        classes: [
          { name: "Utilisateur", attributes: ["nom", "email"], methods: ["connecter()", "deconnecter()"] },
          { name: "Commande", attributes: ["id", "date"], methods: ["calculerTotal()", "valider()"] }
        ],
        relations: [
          { from: "Utilisateur", to: "Commande", type: "one-to-many" }
        ]
      };
      
      setDetectionResults(mockResults);
      setCurrentStep(3);
      
      // Versions simulées du diagramme
      const mockVersions = [
        { id: 1, name: "Style Classique", preview: "/placeholder.svg?height=200&width=300&text=Classique" },
        { id: 2, name: "Style Moderne", preview: "/placeholder.svg?height=200&width=300&text=Moderne" },
        { id: 3, name: "Style Minimaliste", preview: "/placeholder.svg?height=200&width=300&text=Minimaliste" }
      ];
      
      setDiagramVersions(mockVersions);
    }, 2000);
  };

  const extractClassesFromResults = (detection: any, ocr: any) => {
    // Logique pour extraire les classes à partir des résultats
    // À adapter selon le format de vos données
    return [];
  };

  const extractRelationsFromResults = (detection: any) => {
    // Logique pour extraire les relations à partir des résultats
    // À adapter selon le format de vos données
    return [];
  };

  const generateDiagramVersions = async (results: any) => {
    try {
      // Appel vers votre endpoint de génération de diagrammes
      const response = await fetch('YOUR_DIAGRAM_GENERATION_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results })
      });
      
      const versions = await response.json();
      setDiagramVersions(versions);
    } catch (error) {
      console.error('Erreur lors de la génération des versions:', error);
    }
  };

  const handleVersionSelect = (version: any) => {
    setSelectedVersion(version);
    setCurrentStep(4);
    generateXMLCode(detectionResults);
  };

  const generateXMLCode = (results: any) => {
    // Génération du code XML à partir des résultats
    const xmlCode = `<?xml version="1.0" encoding="UTF-8"?>
<uml:Model xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:uml="http://www.eclipse.org/uml2/3.0.0/UML">
  ${results.classes.map((classe: any) => `
  <packagedElement xmi:type="uml:Class" name="${classe.name}">
    ${classe.attributes.map((attr: string) => `
    <ownedAttribute name="${attr}" type="String"/>
    `).join('')}
    ${classe.methods.map((method: string) => `
    <ownedOperation name="${method.replace('()', '')}"/>
    `).join('')}
  </packagedElement>
  `).join('')}
</uml:Model>`;
    
    setGeneratedCode(xmlCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            UML Pilot
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transformez vos diagrammes UML manuscrits en code source automatiquement. 
            Notre IA reconnaît vos dessins et génère le code correspondant en quelques secondes.
          </p>
          
          <div className="flex justify-center items-center space-x-8 mb-12">
            {[
              { step: 1, icon: Upload, label: "Upload", active: currentStep >= 1 },
              { step: 2, icon: Eye, label: "Analyse", active: currentStep >= 2 },
              { step: 3, icon: Code, label: "Versions", active: currentStep >= 3 },
              { step: 4, icon: Download, label: "Télécharger", active: currentStep >= 4 }
            ].map(({ step, icon: Icon, label, active }) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  active ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon size={20} />
                </div>
                <span className={`mt-2 text-sm font-medium ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-12">
        <UploadSection onImageUpload={handleImageUpload} />
        
        {detectionResults && (
          <ResultsSection 
            image={uploadedImage} 
            results={detectionResults} 
          />
        )}
        
        {diagramVersions.length > 0 && (
          <DiagramVersionsSection 
            versions={diagramVersions}
            onVersionSelect={handleVersionSelect}
          />
        )}
        
        {selectedVersion && generatedCode && (
          <CodeDownloadSection 
            xmlCode={generatedCode}
            selectedVersion={selectedVersion}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
