import { Plane, Clock, DollarSign } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface FlightCardProps {
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  price: number;
  type: "departure" | "return";
}

export function FlightCard({
  airline,
  flightNumber,
  from,
  to,
  departTime,
  arriveTime,
  duration,
  price,
  type,
}: FlightCardProps) {
  return (
    <Card className="p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Plane className={`w-5 h-5 ${type === "departure" ? "text-blue-600" : "text-green-600"}`} />
          <div>
            <p className="font-semibold">{airline}</p>
            <p className="text-xs text-gray-500">{flightNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <DollarSign className="w-4 h-4" />
          <span className="text-lg">${price}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-2xl">{departTime}</p>
          <p className="text-sm text-gray-600">{from}</p>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <Plane className="w-4 h-4" />
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <p className="text-xs text-gray-500">{duration}</p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-2xl">{arriveTime}</p>
          <p className="text-sm text-gray-600">{to}</p>
        </div>
      </div>
    </Card>
  );
}
