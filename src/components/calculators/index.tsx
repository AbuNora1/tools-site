import type { ComponentType } from "react";
import AgeCalculator from "./AgeCalculator";
import PercentageCalculator from "./PercentageCalculator";
import ZakatCalculator from "./ZakatCalculator";
import BmiCalculator from "./BmiCalculator";
import TempCalculator from "./TempCalculator";
import CountdownCalculator from "./CountdownCalculator";

/**
 * خريطة: slug الأداة → مكوّن الحاسبة.
 * لإضافة حاسبة جديدة: أنشئ المكوّن هنا وأضف سطراً، ثم اضبط live:true في tools.ts.
 */
export const CALCULATORS: Record<string, ComponentType> = {
  age: AgeCalculator,
  percentage: PercentageCalculator,
  zakat: ZakatCalculator,
  bmi: BmiCalculator,
  temp: TempCalculator,
  countdown: CountdownCalculator,
};
