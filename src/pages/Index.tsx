
import { useState } from "react";
import { Upload, Eye, Code, Download } from "lucide-react";
import Header from "@/components/Header";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import CodeSection from "@/components/CodeSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<any>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep(2);
    // Simulation de la détection - à remplacer par votre API
    setTimeout(() => {
      setDetectionResults({
        classes: [
          { name: "Utilisateur", attributes: ["nom", "email"], methods: ["connecter()", "deconnecter()"] },
          { name: "Commande", attributes: ["id", "date"], methods: ["calculerTotal()", "valider()"] }
        ],
        relations: [
          { from: "Utilisateur", to: "Commande", type: "one-to-many" }
        ]
      });
      setCurrentStep(3);
    }, 2000);
  };

  const handleCodeGeneration = (code: string) => {
    setGeneratedCode(code);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            UML Sketch Coder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transformez vos diagrammes UML manuscrits en code source automatiquement. 
            Notre IA reconnaît vos dessins et génère le code correspondant.
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            {[
              { step: 1, icon: Upload, label: "Upload", active: currentStep >= 1 },
              { step: 2, icon: Eye, label: "Détection", active: currentStep >= 2 },
              { step: 3, icon: Code, label: "Code", active: currentStep >= 3 },
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-12">
        <UploadSection onImageUpload={handleImageUpload} />
        
        {detectionResults && (
          <ResultsSection 
            image={uploadedImage} 
            results={detectionResults} 
            onCodeGeneration={handleCodeGeneration}
          />
        )}
        
        {generatedCode && (
          <CodeSection code={generatedCode} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
