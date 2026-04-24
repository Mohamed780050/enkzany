"use client";

import { useActionState, useEffect, useState } from "react";
import { updateBedsAction } from "../actions";
import { Hospital } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Loader2,
  BedDouble,
  HeartPulse,
  Activity,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { SlideUp } from "@/components/animations/slide-up";

function NumberStepper({
  value,
  onChange,
  name,
  labelAr,
  labelEn,
  icon: Icon,
  colorClass,
}: {
  value: number;
  onChange: (val: number) => void;
  name: string;
  labelAr: string;
  labelEn: string;
  icon: any;
  colorClass: string;
}) {
  return (
    <div className="flex items-center justify-between py-6 px-4 first:pt-4 last:pb-4 transition-colors hover:bg-zinc-50/50 group/item">
      <div className="flex items-center gap-5">
        <div
          className={`w-14 h-14 rounded-2xl ${colorClass} bg-opacity-10 flex items-center justify-center ${colorClass.replace("bg-", "text-")} shadow-inner group-hover/item:scale-105 transition-transform`}
        >
          <Icon size={28} className="text-white"/>
        </div>
        <div>
          <div className="font-black text-xl text-foreground">{labelAr}</div>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {labelEn}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4" dir="ltr">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-xl border-border bg-white hover:bg-destructive hover:text-white hover:border-destructive transition-all shrink-0 active:scale-90"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
        >
          <Minus size={20} />
        </Button>

        <div className="relative">
          <input
            type="number"
            name={name}
            value={value}
            onChange={(e) =>
              onChange(Math.max(0, parseInt(e.target.value) || 0))
            }
            className="w-20 h-14 text-center text-3xl font-black bg-zinc-100/50 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none"
            readOnly
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-xl border-border bg-white hover:bg-success hover:text-white hover:border-success transition-all shrink-0 active:scale-90"
          onClick={() => onChange(value + 1)}
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
}

export function BedUpdatePanel({ hospital }: { hospital: Hospital }) {
  const [state, formAction, isPending] = useActionState(updateBedsAction, null);

  const [bedsGeneral, setBedsGeneral] = useState(hospital.bedsGeneral);
  const [bedsIcu, setBedsIcu] = useState(hospital.bedsIcu);
  const [bedsEmergency, setBedsEmergency] = useState(hospital.bedsEmergency);

  const total = bedsGeneral + bedsIcu + bedsEmergency;

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "تم تحديث البيانات بنجاح");
    } else if (state && !state.success) {
      toast.error(state.message || "حدث خطأ");
    }
  }, [state]);

  return (
    <SlideUp delay={0.1}>
      <Card className="w-full shadow-2xl shadow-primary/5 border-none rounded-[2.5rem] overflow-hidden bg-white ring-1 ring-border/50">
        <CardContent className="p-0">
          <div className="p-8 border-b border-border/50 bg-zinc-50/50 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-foreground">
                تحديث القدرة الاستيعابية
              </h3>
              <p className="text-muted-foreground font-medium">
                قم بتعديل أعداد الأسرة المتاحة الآن
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <Activity size={16} />
              تحديث حي
            </div>
          </div>

          <form action={formAction} className="flex flex-col">
            <div className="px-4 py-2">
              <NumberStepper
                name="bedsGeneral"
                value={bedsGeneral}
                onChange={setBedsGeneral}
                labelAr="الأسرة العامة"
                labelEn="General Ward"
                icon={BedDouble}
                colorClass="bg-blue-500"
              />
              <div className="h-px bg-linear-to-r from-transparent via-border/50 to-transparent mx-8" />
              <NumberStepper
                name="bedsIcu"
                value={bedsIcu}
                onChange={setBedsIcu}
                labelAr="العناية المركزة"
                labelEn="ICU / CCU"
                icon={HeartPulse}
                colorClass="bg-purple-500"
              />
              <div className="h-px bg-linear-to-r from-transparent via-border/50 to-transparent mx-8" />
              <NumberStepper
                name="bedsEmergency"
                value={bedsEmergency}
                onChange={setBedsEmergency}
                labelAr="قسم الطوارئ"
                labelEn="Emergency / ER"
                icon={Activity}
                colorClass="bg-red-500"
              />
            </div>

            <div className="bg-zinc-100/50 p-8 flex flex-col lg:flex-row items-center justify-between border-t border-border/50 gap-6 mt-4">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-black text-primary leading-none">
                      {total}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-4 border-white" />
                </div>
                <div>
                  <div className="text-xl font-black text-foreground leading-tight">
                    إجمالي الأسرة
                  </div>
                  <div className="text-muted-foreground font-bold">
                    المتاحة في كافة الأقسام
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="h-16 rounded-2xl bg-linear-to-r from-secondary to-primary font-black text-xl text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    جاري التحديث...
                  </>
                ) : (
                  <>
                    تحديث البيانات
                    <ArrowRight size={20} className="rotate-180" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </SlideUp>
  );
}
