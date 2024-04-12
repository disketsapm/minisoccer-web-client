import { ISchedule } from "@/app/(root)/reservation/type/reservation.type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function getTokenFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    return await localStorage.getItem("token");
  } else {
    return null; // or handle the case where localStorage is not available
  }
}

export const deleteTokenFromLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export function formatCurrencyToIDR(amount: number | undefined): string {
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount ?? 0);
  return formattedAmount;
}

export function getTotalPriceInListOfPrice(
  scheduleData: ISchedule[] | undefined
): string {
  const total = scheduleData
    ?.map((item) => item.price ?? 0)
    .reduce((acc, curr) => acc + curr, 0);

  return total !== undefined ? formatCurrencyToIDR(total) : "";
}
