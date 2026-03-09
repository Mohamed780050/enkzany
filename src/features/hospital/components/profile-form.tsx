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
} from "lucide-react";
import { toast } from "sonner";

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
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
                  className="h-14 px-10 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-2"
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

      <div className="space-y-8">
        <Card className="border-none ring-0 shadow-xl shadow-zinc-200/50 rounded-[2.5rem] bg-zinc-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest mb-2">
              <Settings2 size={16} />
              أمان الحساب
            </div>
            <CardTitle className="text-xl font-black">إعدادات الدخول</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground font-bold text-xs px-1">
                البريد الإلكتروني الحالي
              </Label>
              <div
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border-none shadow-sm"
                dir="ltr"
              >
                <Mail className="text-primary" size={18} />
                <span className="font-bold text-foreground overflow-hidden text-ellipsis">
                  {hospital.email}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-border/10">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} className="text-muted-foreground" />
                <h4 className="font-black text-foreground">
                  تغيير كلمة المرور
                </h4>
              </div>
              <div className="space-y-4">
                <div className="space-y-2 text-right">
                  <Label className="text-xs font-bold text-muted-foreground px-1">
                    كلمة المرور الحالية
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-border bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label className="text-xs font-bold text-muted-foreground px-1">
                    كلمة المرور الجديدة
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-border bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-12 mt-6 rounded-xl font-black border-2 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary transition-all"
              >
                تحديث أمان الحساب
              </Button>
            </div>

            <div className="pt-6 border-t border-destructive/10">
              <div className="p-4 rounded-2xl bg-destructive/3 border border-destructive/10">
                <div className="flex items-center gap-2 text-destructive font-black text-xs mb-2">
                  <ShieldAlert size={14} />
                  منطقة الخطر
                </div>
                <Button
                  variant="destructive"
                  className="w-full h-11 rounded-xl font-black shadow-lg shadow-destructive/10 opacity-50 cursor-not-allowed"
                  disabled
                >
                  تعطيل حساب المستشفى
                </Button>
                <p className="text-[10px] text-muted-foreground mt-2 text-center leading-relaxed font-medium">
                  يرجى التواصل مع الإدارة الفنية لإتمام عملية الحذف النهائي
                  للبيانات.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
