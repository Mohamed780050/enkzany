"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Hospital,
  Loader2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Map,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { governorates } from "@/lib/governorates";

export default function AddHospitalPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nameAr: formData.get("nameAr") as string,
      nameEn: formData.get("nameEn") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      address: (formData.get("address") as string) || undefined,
      governorate: formData.get("governorate") as string,
      type: formData.get("type") as string,
      latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : undefined,
      longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : undefined,
    };

    try {
      const res = await fetch("/api/hospitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "حدث خطأ أثناء إضافة المستشفى");
        return;
      }

      toast.success("تم إضافة المستشفى بنجاح!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="my-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Hospital size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">
              إضافة مستشفى جديد
            </h1>
            <p className="text-muted-foreground text-sm">
              أدخل بيانات المستشفى لبدء إدارة توفر الأسرة
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-border/50 shadow-sm p-8 space-y-6"
      >
        {/* Hospital Name (Arabic) */}
        <div className="space-y-2">
          <Label htmlFor="nameAr" className="font-bold text-foreground/80">
            اسم المستشفى (عربي)
          </Label>
          <div className="relative group">
            <Building2
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="nameAr"
              name="nameAr"
              placeholder="مستشفى القاهرة العام"
              required
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Hospital Name (English) */}
        <div className="space-y-2">
          <Label htmlFor="nameEn" className="font-bold text-foreground/80">
            اسم المستشفى (إنجليزي)
          </Label>
          <div className="relative group">
            <Building2
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="nameEn"
              name="nameEn"
              placeholder="Cairo General Hospital"
              required
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-bold text-foreground/80">
            البريد الإلكتروني للمستشفى
          </Label>
          <div className="relative group">
            <Mail
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="info@hospital.com"
              required
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-bold text-foreground/80">
            رقم الهاتف (اختياري)
          </Label>
          <div className="relative group">
            <Phone
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+20 123 456 7890"
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Governorate */}
        <div className="space-y-2">
          <Label htmlFor="governorate" className="font-bold text-foreground/80">
            المحافظة
          </Label>
          <div className="relative group">
            <Map
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <select
              id="governorate"
              name="governorate"
              required
              className="h-14 w-full pl-4 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
            >
              <option value="" disabled selected>اختر المحافظة...</option>
              {governorates.map((gov) => (
                <option key={gov.value} value={gov.value}>
                  {gov.labelAr} - {gov.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="font-bold text-foreground/80">
            العنوان (اختياري)
          </Label>
          <div className="relative group">
            <MapPin
              className="absolute right-4 top-4 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="address"
              name="address"
              placeholder="شارع التحرير، القاهرة"
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude" className="font-bold text-foreground/80">
              خط العرض (Latitude)
            </Label>
            <Input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              dir="ltr"
              placeholder="30.0444"
              className="h-14 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude" className="font-bold text-foreground/80">
              خط الطول (Longitude)
            </Label>
            <Input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              dir="ltr"
              placeholder="31.2357"
              className="h-14 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label className="font-bold text-foreground/80">نوع المستشفى</Label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="type"
                value="public"
                defaultChecked
                className="peer sr-only"
              />
              <div className="p-4 rounded-2xl border-2 border-border bg-zinc-50 text-center peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                <div className="text-lg font-bold peer-checked:text-primary">
                  🏥
                </div>
                <div className="text-sm font-bold mt-1">حكومي</div>
              </div>
            </label>
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="type"
                value="private"
                className="peer sr-only"
              />
              <div className="p-4 rounded-2xl border-2 border-border bg-zinc-50 text-center peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                <div className="text-lg font-bold">🏨</div>
                <div className="text-sm font-bold mt-1">خاص</div>
              </div>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-14 w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          {isPending ? (
            <>
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
              جاري الإضافة...
            </>
          ) : (
            "إضافة المستشفى"
          )}
        </Button>
      </form>
    </div>
  );
}
