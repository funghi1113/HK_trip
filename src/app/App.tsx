import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { TripHeader } from "@/app/components/TripHeader";
import { FlightCard } from "@/app/components/FlightCard";
import { DayView, TimelineItemType } from "@/app/components/DayView";
import { Plane, Calendar, Info, MapPin } from "lucide-react";
import { Card } from "@/app/components/ui/card";

function App() {
  const [activeDay, setActiveDay] = useState("day1");

  // ⚠️ 注意：為了配合 GitHub Pages，所有圖片路徑前面都加了 "/HK_trip"
  const tripData = {
    destination: "香港迪士尼 · 港鐵色彩之旅",
    startDate: "2026年1月27日",
    endDate: "2026年1月31日",
    image: "/HK_trip/header-bg.jpg" 
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
      weather: {
        day: "Tuesday",
        date: "1/27",
        temp: 18,
        condition: "cloudy" as const,
        humidity: 60,
        wind: 15,
      },
      accommodation: {
        name: "香港迪士尼樂園酒店 / 探索家度假酒店",
        location: "香港迪士尼度假區",
        image: "/HK_trip/hotel01.jpg"
      },
      timeline: [
        {
          type: "activity",
          data: {
            time: "15:00",
            title: "高雄出發",
            location: "高雄小港機場 (KHH)",
            description: "搭乘 UO133 航班前往香港，請提前 2 小時抵達機場辦理登機。",
            duration: "1.5小時",
          }
        },
        {
          type: "activity",
          data: {
            time: "16:35",
            title: "抵達香港",
            location: "香港國際機場 (HKG)",
            description: "入境香港，領取行李。",
            image: "/HK_trip/airport01.jpg", 
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
            image: "/HK_trip/Day1_Disney.jpg",
            duration: "自由活動",
          }
        },
      ] as TimelineItemType[],
      meals: {
        lunch: "機上/機場",
        dinner: "迪士尼度假區餐廳",
      },
    },
    {
      day: 2,
      date: "2026/01/28 星期三",
      weather: {
        day: "Wednesday",
        date: "1/28",
        temp: 20,
        condition: "sunny" as const,
        humidity: 55,
        wind: 10,
      },
      accommodation: {
        name: "香港迪士尼樂園酒店 / 探索家度假酒店",
        location: "香港迪士尼度假區",
        image: "/HK_trip/hotel01.jpg"
      },
      timeline: [
        {
          type: "activity",
          data: {
            time: "10:00",
            title: "香港迪士尼樂園",
            location: "香港迪士尼樂園",
            description: "全日遊玩迪士尼樂園！探索魔雪奇緣世界、明日世界、欣賞遊行與城堡煙火。",
            image: "/HK_trip/disney02.jpg",
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
      meals: {
        breakfast: "飯店自助餐",
        lunch: "樂園內餐廳",
        dinner: "樂園內餐廳",
      },
    },
    {
      day: 3,
      date: "2026/01/29 星期四",
      weather: {
        day: "Thursday",
        date: "1/29",
        temp: 19,
        condition: "cloudy" as const,
        humidity: 65,
        wind: 12,
      },
       accommodation: {
        name: "旭逸酒店·荃灣",
        location: "香港荃灣",
        image: "/HK_trip/hotel02.jpg"
      },
      timeline: [
        {
          type: "transport",
          data: {
            type: "train" as const,
            from: "迪士尼",
            to: "葵興站",
            time: "10:00",
            duration: "地鐵轉乘",
          }
        },
        {
          type: "activity",
          data: {
            time: "11:00",
            title: "🟡 港鐵色系：葵興 (黃)",
            location: "葵興站",
            description: "【起點】飯店出發，收集黃色系車站照片。",
            duration: "拍攝",
          }
        },
        {
          type: "transport",
          data: {
            type: "train" as const,
            from: "葵興",
            to: "荔枝角",
            time: "11:20",
            duration: "荃灣線",
          }
        },
        {
          type: "activity",
          data: {
            time: "11:30",
            title: "🟢 大窩口 & 🔴 荔枝角",
            location: "荔枝角 D2 Place",
            description: "順路拍攝大窩口(深綠)，於荔枝角(橙紅)出站逛 D2 Place TWO (The Barn) 文創商場。",
            duration: "1.5小時",
          }
        },
        {
          type: "activity",
          data: {
            time: "13:30",
            title: "🌿 深水埗 (草綠) 美食",
            location: "深水埗",
            description: "經長沙灣(土黃)快閃，於深水埗出站享用「合益泰腸粉」與「公和豆花」。",
            image: "https://images.unsplash.com/photo-1552599576-0f8d098e945c?q=80&w=1080",
            duration: "1.5小時",
          }
        },
        {
          type: "activity",
          data: {
            time: "15:30",
            title: "🟣 太子 & 🔴 旺角",
            location: "旺角 T.O.P 商場",
            description: "太子(紫)轉乘快閃，旺角(紅)出站逛 T.O.P 商場 (D-Barn)。",
            duration: "2小時",
          }
        },
        {
          type: "activity",
          data: {
            time: "18:00",
            title: "⚫ 尖沙咀 (黑) 維港夜景",
            location: "維多利亞港",
            description: "經油麻地(灰)快閃，終點站尖沙咀出站，漫步海旁欣賞維多利亞港夜景。",
            image: "https://images.unsplash.com/photo-1507941097613-9f2157b69235?q=80&w=1080",
            duration: "2小時",
          }
        },
      ] as TimelineItemType[],
      meals: {
        breakfast: "自理",
        lunch: "合益泰腸粉、公和豆花",
        dinner: "尖沙咀周邊",
      },
    },
     {
      day: 4,
      date: "2026/01/30 星期五",
      weather: {
        day: "Friday", date: "1/30", temp: 21, condition: "sunny" as const, humidity: 50, wind: 8,
      },
      accommodation: { 
        name: "旭逸酒店·荃灣", 
        location: "香港荃灣",
        image: "/HK_trip/hotel02.jpg"
      },
      timeline: [
        {
          type: "activity",
          data: {
            time: "10:00",
            title: "市區自由探索 (待排)",
            location: "香港市區",
            description: "建議行程：中環大館、中環街市，或搭乘山頂纜車前往太平山頂。",
            duration: "彈性",
          }
        }
      ] as TimelineItemType[],
      meals: { breakfast: "港式飲茶", lunch: "待安排", dinner: "待安排" },
    },
    {
      day: 5,
      date: "2026/01/31 星期六",
      weather: {
        day: "Saturday", date: "1/31", temp: 20, condition: "cloudy" as const, humidity: 55, wind: 12,
      },
      timeline: [
        {
          type: "activity",
          data: {
            time: "16:00",
            title: "前往機場",
            location: "香港國際機場",
            description: "辦理退稅、登機手續。",
            duration: "1小時",
          }
        },
        {
          type: "transport",
          data: {
            type: "plane" as const, 
            from: "香港",
            to: "高雄",
            time: "18:50",
            duration: "返程",
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
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-sm p-1.5 mb-8 sticky top-4 z-20 border border-gray-100">
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
              {/* Flight Information */}
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

              {/* Trip Summary */}
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

              {/* Travel Tips */}
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