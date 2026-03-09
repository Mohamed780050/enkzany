"use client";

import { useActionState, useEffect, useState } from "react";
import { updateBedsAction, type BedUpdateState } from "../actions";
import { Hospital } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Loader2,
  BedDouble,
  HeartPulse,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

function NumberStepper({
  value,
  onChange,
  name,
  labelAr,
  labelEn,
  icon: Icon,
}: {
  value: number;
  onChange: (val: number) => void;
  name: string;
  labelAr: string;
  labelEn: string;
  icon: any;
}) {
  return (
    <div className="flex items-center justify-between py-4 sm:px-4">
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center text-primary">
          <Icon size={24} />
        </div>
        <div>
          <div className="font-bold text-lg">{labelAr}</div>
          <div className="text-sm text-muted-foreground">{labelEn}</div>
        </div>
      </div>

      <div className="flex items-center gap-3" dir="ltr">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors shrink-0"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
        >
          <Minus size={20} />
        </Button>

        <input
          type="number"
          name={name}
          value={value}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-16 h-12 text-center text-2xl font-bold bg-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
          readOnly // Makes it easier for touch devices to avoid triggering keyboard unexpectedly, use steppers primarily
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-2 hover:bg-success/10 hover:text-success hover:border-success transition-colors shrink-0"
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
      // Add a slight green flash visual effect to the card could be handled via state
    } else if (state && !state.success) {
      toast.error(state.message || "حدث خطأ");
    }
  }, [state]);

  const now = new Date();

  return (
    <Card className="w-full shadow-md border-r-4 border-r-primary overflow-hidden">
      <CardContent className="p-0">
        <form action={formAction} className="flex flex-col">
          <div className="divide-y divide-border">
            <NumberStepper
              name="bedsGeneral"
              value={bedsGeneral}
              onChange={setBedsGeneral}
              labelAr="أسرة عامة"
              labelEn="General Beds"
              icon={BedDouble}
            />
            <NumberStepper
              name="bedsIcu"
              value={bedsIcu}
              onChange={setBedsIcu}
              labelAr="عناية مركزة"
              labelEn="ICU Beds"
              icon={HeartPulse}
            />
            <NumberStepper
              name="bedsEmergency"
              value={bedsEmergency}
              onChange={setBedsEmergency}
              labelAr="طوارئ"
              labelEn="Emergency Beds"
              icon={Activity}
            />
          </div>

          <div className="bg-accent/30 p-6 flex flex-col sm:flex-row items-center justify-between border-t border-border mt-2 gap-4">
            <div className="text-xl font-bold text-primary flex items-center gap-2">
              <span>المجموع الكلي:</span>
              <span className="text-2xl">{total}</span>
              <span>سرير متاح</span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-1/3 h-14 text-xl font-bold shadow-lg"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                "تحديث الآن / Update Now"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
