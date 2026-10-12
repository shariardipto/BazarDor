const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (value: number | string) =>
  String(value).replace(/[0-9]/g, (digit) => bnDigits[Number(digit)]);

export const bnToNumber = (value: string | number) => {
  if (typeof value === "number") return value;

  const latin = value
    .replace(/[০-৯]/g, (digit) => String(bnDigits.indexOf(digit)))
    .replace(/[^0-9.-]/g, "");

  return Number(latin);
};

export const formatPrice = (value: number) =>
  toBn(
    value.toLocaleString("en-IN", {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );

export const formatPct = (value: number) =>
  `${toBn(Math.abs(value).toFixed(1))}%`;

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitBn = (unit: string) => units[unit] ?? unit;