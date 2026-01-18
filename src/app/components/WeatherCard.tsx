import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface WeatherCardProps {
  day: string;
  date: string;
  temp: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  wind: number;
}

export function WeatherCard({ day, date, temp, condition, humidity, wind }: WeatherCardProps) {
  const getWeatherIcon = () => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-12 h-12 text-gray-500" />;
      case "rainy":
        return <CloudRain className="w-12 h-12 text-blue-500" />;
    }
  };

  return (
    <Card className="p-4 bg-white">
      <div className="text-center">
        <p className="text-sm text-gray-500">{day}</p>
        <p className="text-xs text-gray-400 mb-3">{date}</p>
        {getWeatherIcon()}
        <p className="text-3xl mt-3">{temp}°C</p>
        <div className="flex justify-around mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Cloud className="w-4 h-4" />
            <span>{humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span>{wind}km/h</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
