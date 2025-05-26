
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface UploadSectionProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadSection = ({ onImageUpload }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTimeout(() => {
            onImageUpload(e.target?.result as string);
            setIsUploading(false);
          }, 1000);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Uploadez votre diagramme UML manuscrit
        </h2>
        <p className="text-gray-600">
          Glissez-déposez votre image ou cliquez pour parcourir vos fichiers
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Upload className="text-blue-600" size={24} />
            </div>
            <p className="text-blue-600 font-medium">Analyse en cours...</p>
            <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <ImageIcon className="text-gray-400" size={24} />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Cliquez pour sélectionner ou glissez votre image ici
              </p>
              <p className="text-sm text-gray-500">
                Formats supportés: PNG, JPG, JPEG (max 10MB)
              </p>
            </div>
            <Button variant="outline" className="mt-4">
              <FileImage size={16} className="mr-2" />
              Parcourir les fichiers
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-green-600 font-bold text-sm">1</span>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Reconnaissance des éléments UML</h3>
          <p className="text-sm text-gray-600">Détection automatique des composants</p>
        </div>
        <div className="text-center p-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-600 font-bold text-sm">2</span>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Extraction du texte manuscrit</h3>
          <p className="text-sm text-gray-600">Lecture automatique du contenu</p>
        </div>
        <div className="text-center p-4">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-600 font-bold text-sm">3</span>
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Génération de code source automatique</h3>
          <p className="text-sm text-gray-600">Création du code final</p>
        </div>
      </div>
    </Card>
  );
};

export default UploadSection;
