import { MapPin, Calendar } from "lucide-react";

interface TripHeaderProps {
  destination: string;
  startDate: string;
  endDate: string;
  image?: string;
}

export function TripHeader({ destination, startDate, endDate, image }: TripHeaderProps) {
  return (
    <div className="relative h-64 rounded-2xl overflow-hidden mb-8 shadow-md group">
      {/* 背景圖片層 */}
      <div className="absolute inset-0">
        {image ? (
          <img 
            src={image} 
            alt={destination} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600" />
        )}
      </div>
      
      {/* 漸層遮罩 (讓文字看清楚) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* 文字內容 */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-6 h-6 text-yellow-400" />
          <h1 className="text-4xl font-bold tracking-wide shadow-black/10 drop-shadow-md font-serif">
            {destination}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-gray-200 font-medium tracking-wider text-lg">
          <Calendar className="w-5 h-5" />
          <span>{startDate} - {endDate}</span>
        </div>
      </div>
    </div>
  );
}