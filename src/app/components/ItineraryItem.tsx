import { Clock, MapPin, Image as ImageIcon } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ItineraryItemProps {
  time: string;
  title: string;
  location: string;
  description: string;
  image?: string;
  duration: string;
}

export function ItineraryItem({ time, title, location, description, image, duration }: ItineraryItemProps) {
  return (
    <Card className="p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-24 text-center">
          <p className="text-xl font-semibold text-blue-600">{time}</p>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
            <Clock className="w-3 h-3" />
            {duration}
          </p>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <p className="text-sm text-gray-700 mb-3">{description}</p>
          
          {image && (
            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback 
                src={image} 
                alt={title}
                className="w-full h-40 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
