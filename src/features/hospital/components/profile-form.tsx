"use client";

import { useActionState, useEffect } from "react";
import { updateProfileAction } from "../actions";
import { Hospital } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Building2,
  MapPin,
  Phone,
  Mail,
  Lock,
  ShieldAlert,
  ChevronLeft,
  Settings2,
  Save,
  Map,
} from "lucide-react";
import { toast } from "sonner";
import { governorates } from "@/lib/governorates";

export function ProfileForm({ hospital }: { hospital: Hospital }) {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="max-w-3xl mx-auto items-start">
      <div className="space-y-8">
        <form action={formAction} className="space-y-8">
          <Card className="border-none ring-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <CardTitle className="text-2xl font-black text-foreground">
                  البيانات التعريفية
                </CardTitle>
              </div>
              <p className="text-muted-foreground font-medium">
                المعلومات الأساسية التي تظهر للعامة والجهات المختصة
              </p>
            </CardHeader>
            <CardContent className="px-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="nameAr"
                    className="text-foreground/80 font-bold mr-1"
                  >
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
                      defaultValue={hospital.nameAr}
                      required
                      className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="nameEn"
                    className="text-foreground/80 font-bold mr-1"
                  >
                    الإسم بالإنجليزية (English)
                  </Label>
                  <Input
                    id="nameEn"
                    name="nameEn"
                    defaultValue={hospital.nameEn}
                    dir="ltr"
                    className="h-14 px-6 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg font-bold text-left"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="governorate" className="text-foreground/80 font-bold mr-1">
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
                    defaultValue={hospital.governorate || ""}
                    className="h-14 w-full pl-4 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none font-bold"
                  >
                    <option value="" disabled>اختر المحافظة...</option>
                    {governorates.map((gov) => (
                      <option key={gov.value} value={gov.value}>
                        {gov.labelAr} - {gov.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-foreground/80 font-bold mr-1"
                >
                  العنوان الجغرافي
                </Label>
                <div className="relative group">
                  <MapPin
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <Input
                    id="address"
                    name="address"
                    defaultValue={hospital.address || ""}
                    className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg font-bold"
                    placeholder="مثال: شارع الجمهورية، دمنهور، البحيرة"
                  />
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="latitude" className="text-foreground/80 font-bold mr-1">
                    خط العرض (Latitude)
                  </Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    dir="ltr"
                    defaultValue={hospital.latitude || ""}
                    placeholder="30.0444"
                    className="h-14 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg font-bold text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude" className="text-foreground/80 font-bold mr-1">
                    خط الطول (Longitude)
                  </Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    dir="ltr"
                    defaultValue={hospital.longitude || ""}
                    placeholder="31.2357"
                    className="h-14 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg font-bold text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-foreground/80 font-bold mr-1"
                  >
                    رقم الهاتف للتواصل
                  </Label>
                  <div className="relative group">
                    <Phone
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={hospital.phone || ""}
                      dir="ltr"
                      className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg font-bold text-left"
                      placeholder="+20 1XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground/80 font-bold mr-1">
                    نوع الجهة
                  </Label>
                  <div className="flex items-center gap-3 h-14 bg-zinc-50 rounded-2xl p-1.5 border-none">
                    <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer h-full rounded-xl transition-all has-checked:bg-white has-checked:shadow-sm has-checked:text-primary text-muted-foreground font-bold hover:text-foreground">
                      <input
                        type="radio"
                        name="type"
                        value="public"
                        defaultChecked={
                          hospital.type === "public" || !hospital.type
                        }
                        className="sr-only"
                      />
                      <span>حكومي / General</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer h-full rounded-xl transition-all has-checked:bg-white has-checked:shadow-sm has-checked:text-primary text-muted-foreground font-bold hover:text-foreground">
                      <input
                        type="radio"
                        name="type"
                        value="private"
                        defaultChecked={hospital.type === "private"}
                        className="sr-only"
                      />
                      <span>خاص / Private</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/10">
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-10 w-full sm:w-auto rounded-2xl text-lg font-black bg-gradient-to-r from-secondary to-primary text-white hover:scale-[1.02] active:scale-95 transition-all gap-2"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 size={24} className="ml-2 animate-spin" />
                  ) : (
                    <Save size={20} className="ml-2" />
                  )}
                  حفظ البيانات المحدثة
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
