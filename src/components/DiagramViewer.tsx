
import { useState, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Download, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DiagramViewerProps {
  imageUrl: string;
  title: string;
  onDownload?: (format: string) => void;
}

const DiagramViewer = ({ imageUrl, title, onDownload }: DiagramViewerProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.25, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.25, 0.1));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.1), 5));
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={scale <= 0.1}
          >
            <ZoomOut size={16} />
          </Button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={scale >= 5}
          >
            <ZoomIn size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload?.('png')}
          >
            <Download size={16} />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden"
        style={{ height: '500px', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-w-none select-none"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: 'none',
              maxHeight: 'none'
            }}
            draggable={false}
          />
        </div>
        
        {scale !== 1 || position.x !== 0 || position.y !== 0 ? (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            Utilisez la molette pour zoomer • Glissez pour naviguer
          </div>
        ) : (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            Molette = Zoom • Glisser = Navigation
          </div>
        )}
      </div>
    </Card>
  );
};

export default DiagramViewer;
