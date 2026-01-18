import React, { useState, useEffect, useRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Plane, Info, MapPin, Hotel, Camera, Utensils, Ticket, Coffee, Clock, Sun, Cloud, CloudRain, ExternalLink, Car, TrainFront, Home, Edit3, Check, Plus, Trash2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- 工具函式 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 內部元件定義區 ---

// 1. Card 元件
const Card = ({ className, children, onClick }: { className?: string, children: React.ReactNode, onClick?: () => void }) => (
  <div onClick={onClick} className={cn("rounded-[1.5rem] border bg-card text-card-foreground shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

// 2. Tabs 元件
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto pb-2 no-scrollbar">
    <TabsPrimitive.List ref={ref} className={cn("inline-flex h-14 items-center justify-start md:justify-center min-w-full md:min-w-0 rounded-full bg-white px-2 shadow-sm border border-gray-100", className)} {...props} />
  </div>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md hover:text-gray-600 text-gray-400 font-serif italic flex-shrink-0",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("mt-6 md:mt-10 ring-offset-background focus-visible:outline-none", className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// 3. TripHeader 元件
const TripHeader = ({ destination, startDate, endDate, image }: { destination: string, startDate: string, endDate: string, image: string }) => (
  <div className="relative h-[250px] md:h-[400px] rounded-[2rem] overflow-hidden mb-8 shadow-2xl group">
    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors duration-500" />
    <img src={image} alt={destination} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 text-white">
      <div className="inline-block px-3 py-1 bg-orange-500/90 backdrop-blur-sm rounded-full text-xs font-bold mb-3 shadow-lg tracking-wider">
        CNY 2026
      </div>
      <h1 className="text-2xl md:text-5xl font-bold mb-2 text-shadow-lg tracking-tight">{destination}</h1>
      <p className="text-sm md:text-xl font-light opacity-90 flex items-center gap-2">
        <span>{startDate}</span>
        <span className="w-1 h-1 bg-white rounded-full" />
        <span>{endDate}</span>
      </p>
    </div>
  </div>
);

// 4. FlightCard 元件
const FlightCard = ({ airline, flightNumber, from, to, departTime, arriveTime, duration, type }: any) => (
  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
    <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
      <div className={`p-3 rounded-full ${type === 'departure' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
        <Plane className={`w-5 h-5 ${type === 'return' ? 'rotate-180' : ''}`} />
      </div>
      <div>
        <p className="font-bold text-gray-900">{airline}</p>
        <p className="text-xs text-gray-500">{flightNumber}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 flex-1 justify-center px-4">
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800">{departTime}</p>
        <p className="text-xs text-gray-500">{from}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-400 mb-1">{duration}</p>
        <div className="w-24 h-[2px] bg-gray-300 relative">
          <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800">{arriveTime}</p>
        <p className="text-xs text-gray-500">{to}</p>
      </div>
    </div>
  </div>
);

// --- ⭐⭐⭐ UserNote 元件 (修復垃圾桶按鈕) ⭐⭐⭐ ---
const UserNote = ({ storageKey }: { storageKey: string }) => {
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedNote = localStorage.getItem(storageKey);
    if (savedNote) setNote(savedNote);
  }, [storageKey]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    const trimmedNote = note.trim();
    if (trimmedNote) {
      localStorage.setItem(storageKey, trimmedNote);
      setNote(trimmedNote);
    } else {
      localStorage.removeItem(storageKey);
      setNote("");
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
      setNote("");
      localStorage.removeItem(storageKey);
      setIsEditing(false);
  };

  // 1. 編輯模式
  if (isEditing) {
    return (
      <div className="mt-3 pt-3 border-t border-dashed border-gray-100 animate-in fade-in">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-orange-500 font-bold flex items-center gap-1">
            <Edit3 className="w-3 h-3" /> 編輯筆記
          </p>
          <div className="flex gap-2">
             {/* 👇 關鍵修正：加入 onMouseDown={e => e.preventDefault()} 防止失去焦點 */}
             <button 
                onClick={handleDelete} 
                onMouseDown={(e) => e.preventDefault()}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
             >
                <Trash2 className="w-3 h-3" />
             </button>
             <button 
                onClick={handleSave} 
                onMouseDown={(e) => e.preventDefault()}
                className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full flex items-center gap-1 hover:bg-orange-200 transition-colors font-bold"
             >
                <Check className="w-3 h-3" /> 完成
             </button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={note}
          onChange={handleChange}
          onBlur={handleSave}
          className="w-full text-sm p-3 bg-yellow-50/80 rounded-xl border border-yellow-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none h-24 placeholder:text-gray-400 transition-all font-serif"
          placeholder="在這裡輸入..."
        />
      </div>
    );
  }

  // 2. 顯示模式：有內容
  if (note && note.trim().length > 0) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className="mt-3 pt-3 border-t border-dashed border-gray-100 group/note cursor-pointer"
      >
         <div className="bg-yellow-50/80 p-3 rounded-xl border border-yellow-100 relative hover:border-orange-200 transition-all hover:shadow-sm group-hover/note:bg-yellow-100/80">
             <p className="text-xs text-gray-400 font-bold mb-1 flex items-center gap-1">
                <Edit3 className="w-3 h-3 opacity-50 group-hover/note:opacity-100 transition-opacity text-orange-400" /> 私人筆記
             </p>
             <p className="text-sm text-gray-700 whitespace-pre-wrap font-serif">{note}</p>
         </div>
      </div>
    )
  }

  // 3. 靜默模式：沒內容
  return (
    <div className="mt-3 flex justify-end">
        <button 
            onClick={() => setIsEditing(true)}
            className="text-xs text-gray-300 hover:text-orange-500 flex items-center gap-1 py-1 px-2 rounded-lg transition-colors hover:bg-orange-50"
        >
            <Plus className="w-3 h-3" /> 新增筆記
        </button>
    </div>
  );
};
// --- 👆 UserNote 結束 👆 ---


// 5. DayView 元件
export type TimelineItemType = {
    type: 'activity' | 'transport' | 'meal';
    data: any;
};

// TimelineItem
const TimelineItem = ({ item, isLast, dayIndex, itemIndex }: { item: TimelineItemType, isLast: boolean, dayIndex: number, itemIndex: number }) => {
    const { type, data } = item;
    
    // 產生唯一的儲存金鑰
    const uniqueKey = `note-day${dayIndex}-${itemIndex}`;

    const getIcon = () => {
        if (type === 'transport') {
            if (data.type === 'car') return <Car className="w-4 h-4" />;
            if (data.type === 'train') return <TrainFront className="w-4 h-4" />;
            return <Plane className="w-4 h-4" />;
        }
        if (data.title?.includes('酒店') || data.title?.includes('入住')) return <Hotel className="w-4 h-4" />;
        if (data.title?.includes('迪士尼')) return <Ticket className="w-4 h-4" />;
        if (data.title?.includes('食') || data.title?.includes('餐')) return <Utensils className="w-4 h-4" />;
        if (data.title?.includes('家') || data.title?.includes('高雄')) return <Home className="w-4 h-4" />;
        return <MapPin className="w-4 h-4" />;
    };

    return (
        <div className="flex gap-4 md:gap-6 relative group">
            {/* 左側：時間軸線與圖示 */}
            <div className="flex flex-col items-center min-w-[40px] md:min-w-[50px]">
                <div className={cn("relative z-10 flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition-colors", 
                    data.type === 'plane' ? "bg-blue-50 border-blue-100 text-blue-500" : "bg-white border-orange-100 text-orange-400"
                )}>
                   {getIcon()}
                </div>
                {!isLast && <div className="w-[1px] flex-1 bg-gray-200 my-2 group-hover:bg-orange-200 transition-colors" />}
            </div>

            {/* 右側：內容卡片 */}
            <div className="flex-1 pb-8 md:pb-10">
                {data.type === 'plane' ? (
                     <Card className="p-0 border-0 shadow-sm ring-1 ring-blue-100 hover:ring-blue-300 transition-all duration-300 bg-blue-50/30">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold mb-1">
                                        <Plane className="w-3 h-3" />
                                        {data.airline}
                                    </span>
                                    <h4 className="text-lg font-bold text-gray-800">{data.flightNumber}</h4>
                                </div>
                                <div className="text-right">
                                     <p className="text-xs text-gray-400 font-medium">飛行時間</p>
                                     <p className="text-sm font-bold text-gray-700">{data.duration}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between relative">
                                <div className="text-center min-w-[60px]">
                                    <p className="text-2xl font-bold text-gray-800">{data.departTime}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1 px-2 py-0.5 bg-white rounded-md border border-gray-100">{data.from}</p>
                                </div>
                                
                                <div className="flex-1 px-4 flex flex-col items-center">
                                    <div className="w-full h-[2px] bg-blue-200 relative mt-2">
                                         <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-blue-200 rotate-45"></div>
                                    </div>
                                    <p className="text-[10px] text-blue-400 mt-1">直飛</p>
                                </div>

                                <div className="text-center min-w-[60px]">
                                    <p className="text-2xl font-bold text-gray-800">{data.arriveTime}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1 px-2 py-0.5 bg-white rounded-md border border-gray-100">{data.to}</p>
                                </div>
                            </div>
                            
                            <UserNote storageKey={uniqueKey} />
                        </div>
                     </Card>
                ) : (
                    <Card className="p-5 md:p-6 border-0 shadow-sm ring-1 ring-gray-100 hover:ring-orange-200 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                             <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {data.time}
                            </span>
                        </div>
                        
                        <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{data.title || (data.from + ' ➝ ' + data.to)}</h4>
                        
                         {data.location && (
                             <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                                 <MapPin className="w-3.5 h-3.5" />
                                 {data.location}
                             </div>
                         )}

                         {data.description && <p className="text-gray-600 text-sm leading-relaxed mb-4">{data.description}</p>}
                         
                         {data.image && (
                             <div className="rounded-2xl overflow-hidden aspect-video relative group/img shadow-sm">
                                 <img 
                                    src={data.image} 
                                    alt={data.title} 
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" 
                                 />
                             </div>
                         )}
                         
                         {data.duration && (
                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 font-medium">
                                {data.type === 'car' ? <Car className="w-3 h-3" /> : 
                                 data.type === 'train' ? <TrainFront className="w-3 h-3" /> :
                                 data.title?.includes('家') ? <Home className="w-3 h-3" /> :
                                 <Clock className="w-3 h-3" />}
                                {data.duration}
                            </div>
                        )}

                        <UserNote storageKey={uniqueKey} />
                    </Card>
                )}
            </div>
        </div>
    );
};

// DayView 主體
const DayView = ({ day, date, weather, accommodation, timeline }: any) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start animate-in slide-in-from-bottom-8 duration-700">
            {/* 左側：資訊區 */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 text-center lg:text-left">
                
                {/* 1. 大數字與日期 */}
                <div className="relative mb-6 md:mb-8 inline-block lg:block">
                    <div className="text-[6rem] md:text-[8rem] leading-none font-bold text-gray-100 select-none absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 -z-10">
                        {String(day).padStart(2, '0')}
                    </div>
                    <div className="relative z-10 pt-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{date.split(' ')[0]}</h2>
                        <h3 className="text-gray-400 font-medium tracking-widest uppercase mt-1">{date.split(' ')[1]}</h3>
                    </div>
                </div>

                {/* 2. 天氣小藥丸 */}
                <div className="flex justify-center lg:justify-start mb-6 md:mb-8">
                    <div className="inline-flex items-center gap-3 bg-gray-50 rounded-2xl p-3 pr-6 border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                            {weather.condition === 'sunny' ? <Sun className="w-5 h-5 text-orange-400" /> : 
                             weather.condition === 'rain' ? <CloudRain className="w-5 h-5 text-blue-400" /> : 
                             <Cloud className="w-5 h-5" />}
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-700 text-lg leading-none">{weather.temp}°C</p>
                            <p className="text-xs text-gray-400 font-medium">{weather.condition}</p>
                        </div>
                    </div>
                </div>

                {/* 3. 住宿卡片 */}
                {accommodation && (
                    <div className="text-left bg-orange-50/50 rounded-[2rem] p-5 border border-orange-100/50 mb-8 lg:mb-0">
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4 pl-1">ACCOMMODATION</p>
                        <div className="group">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-sm">
                                <img src={accommodation.image} alt={accommodation.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{accommodation.name}</h4>
                            
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(accommodation.name)}`}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="text-xs text-gray-400 flex items-center gap-1 hover:text-orange-600 transition-colors cursor-pointer mt-2 inline-flex"
                            >
                                <MapPin className="w-3 h-3" /> 
                                <span>{accommodation.location}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-50" />
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* 右側：時間軸 */}
            <div className="lg:col-span-2 pt-2">
                {timeline.map((item: any, index: number) => (
                    <TimelineItem 
                        key={index} 
                        item={item} 
                        isLast={index === timeline.length - 1}
                        dayIndex={day}
                        itemIndex={index} 
                    />
                ))}
            </div>
        </div>
    );
};

// --- 主程式 ---

function App() {
  const [activeDay, setActiveDay] = useState("day1");

  const basePath = import.meta.env.MODE === 'production' ? '/HK_trip' : '';

  const tripData = {
    destination: "香港迪士尼 · 港鐵色彩之旅",
    startDate: "2026年1月27日",
    endDate: "2026年1月31日",
    image: `${basePath}/header-bg.jpg`
  };

  const flightData = [
    {
      airline: "香港快運 HK Express",
      flightNumber: "UO133",
      from: "KHH 高雄",
      to: "HKG 香港",
      departTime: "15:00",
      arriveTime: "16:35",
      duration: "1h 35m",
      price: 3500,
      type: "departure" as const,
    },
    {
      airline: "香港快運 HK Express",
      flightNumber: "UO124",
      from: "HKG 香港",
      to: "KHH 高雄",
      departTime: "18:50",
      arriveTime: "20:15",
      duration: "1h 25m",
      price: 3800,
      type: "return" as const,
    },
  ];

  const dayData = [
    {
      day: 1,
      date: "2026/01/27 星期二",
      weather: { day: "Tuesday", date: "1/27", temp: 18, condition: "cloudy" as const, humidity: 60, wind: 15 },
      accommodation: {
        name: "迪士尼好萊塢酒店", 
        location: "香港迪士尼度假區",
        image: `${basePath}/hotel01.jpg`
      },
      timeline: [
        {
          type: "transport",
          data: {
            type: "plane",
            airline: "HK Express",
            flightNumber: "UO133",
            from: "KHH",
            to: "HKG",
            departTime: "15:00",
            arriveTime: "16:35",
            duration: "1h 35m",
            time: "15:00"
          }
        },
        {
          type: "activity",
          data: {
            time: "16:35",
            title: "入境與領取行李",
            location: "香港國際機場 (HKG)",
            description: "抵達香港後辦理入境手續並領取行李。",
            image: `${basePath}/airport01.jpg`,
            duration: "1小時",
          }
        },
        {
          type: "transport",
          data: {
            type: "car" as const,
            from: "香港國際機場",
            to: "迪士尼度假區",
            time: "17:40",
            duration: "約 15~20 分鐘 (計程車)",
            price: 150,
          }
        },
        {
          type: "activity",
          data: {
            time: "18:00",
            title: "入住迪士尼度假區",
            location: "迪士尼度假區",
            description: "搭乘計程車直達飯店門口。辦理入住手續，晚上欣賞度假區夜景。",
            image: `${basePath}/disney01.jpg`,
            duration: "自由活動",
          }
        },
      ] as TimelineItemType[],
      meals: { lunch: "機上/機場", dinner: "迪士尼度假區餐廳" },
    },
    {
      day: 2,
      date: "2026/01/28 星期三",
      weather: { day: "Wednesday", date: "1/28", temp: 20, condition: "sunny" as const, humidity: 55, wind: 10 },
      accommodation: {
        name: "迪士尼好萊塢酒店", 
        location: "香港迪士尼度假區",
        image: `${basePath}/hotel01.jpg`
      },
      timeline: [
        {
          type: "activity",
          data: {
            time: "10:00",
            title: "香港迪士尼樂園",
            location: "香港迪士尼樂園",
            description: "全日遊玩迪士尼樂園！探索魔雪奇緣世界、明日世界、欣賞遊行與城堡煙火。",
            image: `${basePath}/disney02.jpg`,
            duration: "全日",
          }
        },
        {
          type: "activity",
          data: {
            time: "20:30",
            title: "迪士尼星夢光影之旅",
            location: "奇妙夢想城堡",
            description: "欣賞夜間城堡匯演，結合多媒體光影與煙火的視覺饗宴。",
            duration: "30分鐘",
          }
        },
      ] as TimelineItemType[],
      meals: { breakfast: "飯店自助餐", lunch: "樂園內餐廳", dinner: "樂園內餐廳" },
    },
    {
      day: 3,
      date: "2026/01/29 星期四",
      weather: { day: "Thursday", date: "1/29", temp: 19, condition: "cloudy" as const, humidity: 65, wind: 12 },
      accommodation: {
        name: "旭逸酒店·荃灣",
        location: "香港荃灣",
        image: `${basePath}/hotel02.jpg`
      },
      timeline: [
        { type: "transport", data: { type: "train" as const, from: "迪士尼", to: "葵興站", time: "10:00", duration: "地鐵轉乘" } },
        { type: "activity", data: { time: "11:00", title: "🟡 港鐵色系：葵興 (黃)", location: "葵興站", description: "【起點】飯店出發，收集黃色系車站照片。", duration: "拍攝" } },
        { type: "transport", data: { type: "train" as const, from: "葵興", to: "荔枝角", time: "11:20", duration: "荃灣線" } },
        { type: "activity", data: { time: "11:30", title: "🟢 大窩口 & 🔴 荔枝角", location: "荔枝角 D2 Place", description: "順路拍攝大窩口(深綠)，於荔枝角(橙紅)出站逛 D2 Place TWO (The Barn) 文創商場。", duration: "1.5小時" } },
        { type: "activity", data: { time: "13:30", title: "🌿 深水埗 (草綠) 美食", location: "深水埗", description: "經長沙灣(土黃)快閃，於深水埗出站享用「合益泰腸粉」與「公和豆花」。", image: "https://images.unsplash.com/photo-1552599576-0f8d098e945c?q=80&w=1080", duration: "1.5小時" } },
        { type: "activity", data: { time: "15:30", title: "🟣 太子 & 🔴 旺角", location: "旺角 T.O.P 商場", description: "太子(紫)轉乘快閃，旺角(紅)出站逛 T.O.P 商場 (D-Barn)。", duration: "2小時" } },
        { type: "activity", data: { time: "18:00", title: "⚫ 尖沙咀 (黑) 維港夜景", location: "維多利亞港", description: "經油麻地(灰)快閃，終點站尖沙咀出站，漫步海旁欣賞維多利亞港夜景。", image: "https://images.unsplash.com/photo-1507941097613-9f2157b69235?q=80&w=1080", duration: "2小時" } },
      ] as TimelineItemType[],
      meals: { breakfast: "自理", lunch: "合益泰腸粉、公和豆花", dinner: "尖沙咀周邊" },
    },
    {
      day: 4,
      date: "2026/01/30 星期五",
      weather: { day: "Friday", date: "1/30", temp: 21, condition: "sunny" as const, humidity: 50, wind: 8 },
      accommodation: {
        name: "旭逸酒店·荃灣",
        location: "香港荃灣",
        image: `${basePath}/hotel02.jpg`
      },
      timeline: [
        { type: "activity", data: { time: "10:00", title: "市區自由探索 (待排)", location: "香港市區", description: "建議行程：中環大館、中環街市，或搭乘山頂纜車前往太平山頂。", duration: "彈性" } }
      ] as TimelineItemType[],
      meals: { breakfast: "港式飲茶", lunch: "待安排", dinner: "待安排" },
    },
    {
      day: 5,
      date: "2026/01/31 星期六",
      weather: { day: "Saturday", date: "1/31", temp: 20, condition: "cloudy" as const, humidity: 55, wind: 12 },
      timeline: [
        { type: "activity", data: { time: "16:00", title: "前往機場", location: "香港國際機場", description: "辦理退稅、登機手續。", duration: "1小時" } },
        { 
          type: "transport", 
          data: { 
            type: "plane", 
            airline: "HK Express",
            flightNumber: "UO124",
            from: "HKG",
            to: "KHH",
            departTime: "18:50",
            arriveTime: "20:15",
            duration: "1h 25m",
            time: "18:50"
          } 
        },
        { 
          type: "activity", 
          data: { 
            time: "20:15", 
            title: "抵達高雄 - 甜蜜的家", 
            location: "高雄 (Kaohsiung)", 
            description: "平安抵達高雄，結束五天四夜的香港迪士尼之旅！", 
            image: `${basePath}/KH.jpg`,
            duration: "Sweet Home"
          } 
        },
      ] as TimelineItemType[],
      meals: { breakfast: "自理", lunch: "東薈城", dinner: "機上" },
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <TripHeader
          destination={tripData.destination}
          startDate={tripData.startDate}
          endDate={tripData.endDate}
          image={tripData.image}
        />

        <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
          <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-1.5 mb-8 sticky top-4 z-20 border border-gray-100/50">
            <TabsList className="grid w-full grid-cols-6 gap-2 bg-transparent">
              <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white">
                <Info className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">總覽</span>
              </TabsTrigger>
              {[1, 2, 3, 4, 5].map((d) => (
                <TabsTrigger key={d} value={`day${d}`} className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white">
                  <span className="font-serif italic mr-1">Day</span>
                  <span>{d}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="space-y-6 animate-in fade-in duration-500">
              <Card className="p-6 border-0 shadow-sm bg-white ring-1 ring-gray-100">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 font-serif text-gray-900">
                  <Plane className="w-6 h-6 text-blue-600" />
                  航班資訊
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold mb-3 text-blue-600 uppercase tracking-wider">去程航班 (Departure)</h3>
                    <FlightCard {...flightData[0]} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-3 text-emerald-600 uppercase tracking-wider">回程航班 (Return)</h3>
                    <FlightCard {...flightData[1]} />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-sm bg-white ring-1 ring-gray-100">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 font-serif text-gray-900">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  行程摘要
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {dayData.map((day) => (
                    <Card
                      key={day.day}
                      className="p-5 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-black group"
                      onClick={() => setActiveDay(`day${day.day}`)}
                    >
                      <h3 className="text-xl font-serif font-bold mb-1 group-hover:text-blue-600 transition-colors">Day {day.day}</h3>
                      <p className="text-xs text-gray-400 mb-3 tracking-wider">{day.date.split(' ')[0]}</p>
                      <div className="space-y-1">
                        {day.timeline.slice(0, 2).map((item, i) => (
                          item.type === 'activity' && (
                            <p key={i} className="text-xs text-gray-600 line-clamp-1">• {item.data.title}</p>
                          )
                        ))}
                        <p className="text-xs text-blue-500 mt-2 font-medium">查看詳情 →</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-0 shadow-inner">
                <h2 className="text-2xl font-semibold mb-4 font-serif text-gray-900">旅行小提示</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-gray-500">📱 必備APP</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>MTR Mobile - 港鐵路線查詢</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Google Maps - 地圖導航</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Klook/KKday - 景點門票預訂</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black"></span>Uber - 叫車備用</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-gray-500">💳 支付與貨幣</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>必備八達通卡 (Octopus) - 交通與超商</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>港幣現金 - 部分小吃店/計程車只收現金</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>信用卡 (Visa/Mastercard) - 商場普遍可用</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {dayData.map((day) => (
            <TabsContent key={day.day} value={`day${day.day}`}>
              <DayView {...day} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default App;