"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hospital as HospitalIcon, Phone, MapPin, Search, Activity, BedSingle, AlertCircle } from "lucide-react";

function formatDistanceToNowAr(date: Date | string) {
  const diffInSeconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) return "منذ لحظات";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `منذ ${diffInDays} يوم`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `منذ ${diffInMonths} شهر`;
  
  return `منذ ${Math.floor(diffInMonths / 12)} سنة`;
}

type Hospital = {
  id: string;
  nameAr: string;
  nameEn: string;
  address: string | null;
  phone: string | null;
  type: string | null;
  bedsGeneral: number;
  bedsIcu: number;
  bedsEmergency: number;
  lastUpdate: Date;
};

export function HospitalsClient({ initialHospitals }: { initialHospitals: Hospital[] }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredHospitals = initialHospitals.filter((hospital) => {
    const matchesSearch = hospital.nameAr.toLowerCase().includes(search.toLowerCase()) || 
                          hospital.nameEn.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || hospital.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-border/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            placeholder="ابحث باسم المستشفى..." 
            className="pr-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button 
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filterType === 'all' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilterType("public")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filterType === 'public' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
          >
            حكومي
          </button>
          <button 
            onClick={() => setFilterType("private")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filterType === 'private' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
          >
            خاص
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredHospitals.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
          <HospitalIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground">لا توجد مستشفيات مطابقة</h3>
          <p className="text-muted-foreground mt-2">حاول استخدام كلمات بحث مختلفة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-white flex flex-col justify-between">
              <div>
                <CardHeader className="bg-zinc-50 border-b border-border/50 pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-black text-foreground">{hospital.nameAr}</CardTitle>
                      <div className="text-sm text-muted-foreground font-medium">{hospital.nameEn}</div>
                    </div>
                    {hospital.type && (
                      <Badge variant="outline" className={`rounded-lg px-2.5 py-1 font-bold ${hospital.type === 'public' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}>
                        {hospital.type === 'public' ? 'حكومي' : 'خاص'}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4 text-sm text-muted-foreground">
                    {hospital.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="leading-snug">{hospital.address}</span>
                      </div>
                    )}
                    {hospital.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span dir="ltr">{hospital.phone}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <h4 className="text-sm font-bold text-muted-foreground mb-4">الأسرة المتاحة حالياً</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary/5 rounded-2xl p-3 text-center border border-primary/10">
                      <BedSingle className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-black text-primary">{hospital.bedsGeneral}</div>
                      <div className="text-xs font-bold text-primary/70 mt-1">عادي</div>
                    </div>
                    
                    <div className="bg-success/5 rounded-2xl p-3 text-center border border-success/10">
                      <Activity className="w-5 h-5 text-success mx-auto mb-2" />
                      <div className="text-2xl font-black text-success">{hospital.bedsIcu}</div>
                      <div className="text-xs font-bold text-success/70 mt-1">عناية</div>
                    </div>
                    
                    <div className="bg-warning/5 rounded-2xl p-3 text-center border border-warning/10">
                      <AlertCircle className="w-5 h-5 text-warning mx-auto mb-2" />
                      <div className="text-2xl font-black text-warning">{hospital.bedsEmergency}</div>
                      <div className="text-xs font-bold text-warning/70 mt-1">طوارئ</div>
                    </div>
                  </div>
                </CardContent>
              </div>
              
              <CardFooter className="bg-zinc-50 border-t border-border/50 py-3 text-xs text-muted-foreground flex justify-between items-center mt-auto">
                <span>آخر تحديث</span>
                <span className="font-medium text-foreground">
                  {formatDistanceToNowAr(hospital.lastUpdate)}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
