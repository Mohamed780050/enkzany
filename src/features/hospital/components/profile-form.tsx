"use client";

import { useActionState, useEffect } from "react";
import { updateProfileAction } from "../actions";
import { Hospital } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-xl">معلومات المستشفى</CardTitle>
          <CardDescription>البيانات الأساسية التي تظهر للمرضى</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">اسم المستشفى (عربي)</Label>
                <Input
                  id="nameAr"
                  name="nameAr"
                  defaultValue={hospital.nameAr}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameEn">اسم المستشفى (English)</Label>
                <Input
                  id="nameEn"
                  name="nameEn"
                  defaultValue={hospital.nameEn}
                  dir="ltr"
                  className="text-left"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                defaultValue={hospital.address || ""}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={hospital.phone || ""}
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="space-y-2">
                <Label>نوع المستشفى</Label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="public"
                      defaultChecked={
                        hospital.type === "public" || !hospital.type
                      }
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span>حكومي / Public</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="private"
                      defaultChecked={hospital.type === "private"}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span>خاص / Private</span>
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto mt-4"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              حفظ التغييرات / Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">إعدادات الحساب</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-muted-foreground">
              البريد الإلكتروني الحالي
            </Label>
            <div className="p-3 bg-accent rounded-md border text-sm" dir="ltr">
              {hospital.email}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-bold mb-4">تغيير كلمة المرور</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>كلمة المرور الحالية</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور الجديدة</Label>
                <Input type="password" />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              تحديث كلمة المرور
            </Button>
          </div>

          <div className="pt-4 border-t border-destructive/20 mt-4">
            <Button variant="destructive" className="w-full" disabled>
              إلغاء تفعيل الحساب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
