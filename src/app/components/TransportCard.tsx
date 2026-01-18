import { Bus, Train, Car, MapPin } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface TransportCardProps {
  type: "bus" | "train" | "car";
  from: string;
  to: string;
  time: string;
  duration: string;
  price?: number;
}

export function TransportCard({ type, from, to, time, duration, price }: TransportCardProps) {
  const getIcon = () => {
    switch (type) {
      case "bus":
        return <Bus className="w-5 h-5 text-orange-600" />;
      case "train":
        return <Train className="w-5 h-5 text-blue-600" />;
      case "car":
        return <Car className="w-5 h-5 text-green-600" />;
    }
  };

  const getTypeName = () => {
    switch (type) {
      case "bus":
        return "巴士";
      case "train":
        return "火車";
      case "car":
        return "租車";
    }
  };

  return (
    <Card className="p-3 mb-2 bg-gray-50 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <p className="text-sm font-semibold">{getTypeName()}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{from}</span>
              <MapPin className="w-3 h-3" />
              <span>{to}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">{time}</p>
          <p className="text-xs text-gray-500">{duration}</p>
          {price && <p className="text-xs text-blue-600">${price}</p>}
        </div>
      </div>
    </Card>
  );
}
