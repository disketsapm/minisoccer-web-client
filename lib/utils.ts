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

export function formatDateToIndonesian(date: string): string {
  const days: string[] = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const months: string[] = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const utcDate: Date = new Date(date);
  const dayIndex: number = utcDate.getUTCDay();
  const day: string = days[dayIndex];
  const dateNumber: number = utcDate.getUTCDate();
  const monthIndex: number = utcDate.getUTCMonth();
  const month: string = months[monthIndex];
  const year: number = utcDate.getUTCFullYear();

  return `${day}, ${dateNumber} ${month} ${year}`;
}
