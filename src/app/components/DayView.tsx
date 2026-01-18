import { WeatherCard } from "@/app/components/WeatherCard";
import { TransportCard } from "@/app/components/TransportCard";
import { ItineraryItem } from "@/app/components/ItineraryItem";
import { Card } from "@/app/components/ui/card";
import { Coffee, Utensils, BedDouble, Moon } from "lucide-react";

// 定義混合型態
export type TimelineItemType = 
  | { type: "activity"; data: React.ComponentProps<typeof ItineraryItem> }
  | { type: "transport"; data: React.ComponentProps<typeof TransportCard> };

interface DayViewProps {
  day: number;
  date: string;
  weather: {
    day: string;
    date: string;
    temp: number;
    condition: "sunny" | "cloudy" | "rainy";
    humidity: number;
    wind: number;
  };
  accommodation?: {
    name: string;
    location: string;
    image?: string;
  }; 
  timeline: TimelineItemType[];
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
}

export function DayView({ day, date, weather, accommodation, timeline, meals }: DayViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 border-b border-gray-200 pb-4">
        <h2 className="text-5xl font-serif text-gray-900">Day {day}</h2>
        <div className="flex flex-col">
          <span className="text-lg text-gray-500 font-light tracking-widest uppercase">
            {date.split(" ")[0]}
          </span>
          <span className="text-sm text-gray-400">
            {date.split(" ")[1]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (左側) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. 住宿資訊 (修正：強制固定高度 sm:h-52，確保格式一致) */}
          {accommodation && (
            <Card className="overflow-hidden border-0 shadow-sm bg-white ring-1 ring-gray-100 group">
              <div className="flex flex-col sm:flex-row">
                {/* 圖片區塊：設定固定高度 h-48 (192px) 或 sm:h-52 (208px) */}
                <div className="sm:w-2/5 h-48 sm:h-52 relative overflow-hidden">
                   {accommodation.image ? (
                     <img 
                       src={accommodation.image} 
                       alt={accommodation.name}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                   ) : (
                     <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                       <BedDouble className="w-8 h-8 text-slate-300" />
                     </div>
                   )}
                   <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1 shadow-sm">
                     <Moon className="w-3 h-3 text-indigo-500" />
                     今晚入住
                   </div>
                </div>
                {/* 文字區塊 */}
                <div className="p-5 flex flex-col justify-center sm:w-3/5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{accommodation.name}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    {accommodation.location}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 3. 時間軸 */}
          <div className="space-y-6 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100 hidden sm:block" />
            
            {timeline.map((item, index) => (
              <div key={index} className="relative z-10">
                {item.type === "transport" ? (
                  <div className="sm:pl-10 my-4 opacity-90 hover:opacity-100 transition-opacity">
                    <TransportCard {...item.data} />
                  </div>
                ) : (
                  <ItineraryItem {...item.data} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (右側) */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Weather</h3>
            <WeatherCard {...weather} />
          </div>

          <Card className="p-6 border-0 shadow-sm bg-white ring-1 ring-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Dining</h3>
            <div className="space-y-4">
              {meals.breakfast && (
                <MealRow icon={<Coffee className="w-4 h-4 text-amber-600" />} title="早餐" content={meals.breakfast} />
              )}
              {meals.lunch && (
                <MealRow icon={<Utensils className="w-4 h-4 text-emerald-600" />} title="午餐" content={meals.lunch} />
              )}
              {meals.dinner && (
                <MealRow icon={<Utensils className="w-4 h-4 text-rose-600" />} title="晚餐" content={meals.dinner} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
}

function MealRow({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="mt-1 p-1.5 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400">{title}</p>
        <p className="text-sm text-gray-700 font-medium">{content}</p>
      </div>
    </div>
  )
}