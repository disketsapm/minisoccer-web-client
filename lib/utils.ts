import { ISchedule } from "@/app/(root)/reservation/type/reservation.type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

interface Week {
  weekNo: number;
  startingDate: string;
  endingDate: string;
  days: number;
}

interface Schedule {
  startDate: Date;
  endDate: Date;
  id: string;
}

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

export function getUserFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("user");
  } else {
    return null;
  }
}

export const getFirstLetterAndLastName = (fullName: string) => {
  const name = fullName?.split(" ");
  return `${name?.[0]?.charAt(0)}${name?.[name?.length - 1].charAt(0)}`;
};

export function getItemFromLocalStorage<T>(key: string): T | null {
  const itemString = localStorage.getItem(key);
  if (itemString) {
    try {
      return JSON.parse(itemString) as T;
    } catch (error) {
      console.error(`Error parsing item from localStorage with key '${key}':`, error);
      return null;
    }
  } else {
    return null;
  }
}

export const deleteTokenFromLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export function checkWeeksHaveOneDay(schedules: Schedule[]): boolean {
  // Group schedules by week
  const schedulesByWeek: Record<number, Schedule[]> = schedules.reduce(
    (acc, schedule) => {
      const weekStart = moment(schedule.startDate).startOf("week").valueOf();

      if (!acc[weekStart]) {
        acc[weekStart] = [];
      }
      acc[weekStart].push(schedule);
      return acc;
    },
    {} as Record<number, Schedule[]> // Specify the initial type of `acc`
  );

  // Check if each week has exactly one day
  for (const week in schedulesByWeek) {
    if (Object.hasOwnProperty.call(schedulesByWeek, week)) {
      const schedulesInWeek = schedulesByWeek[parseInt(week)];
      if (schedulesInWeek.length !== 1) {
        return false;
      }
    }
  }
  return true;
}

export function getWeeksOfMonth(year: number, month: number): Week[] {
  const weeks: Week[] = [];
  const firstDayOfMonth = moment(`${year}-${month}-01`);
  const lastDayOfMonth = moment(firstDayOfMonth).endOf("month");
  let currentWeekStart = firstDayOfMonth.startOf("week");

  while (currentWeekStart.isBefore(lastDayOfMonth)) {
    const currentWeekEnd = moment(currentWeekStart).endOf("week");
    const daysInWeek = currentWeekEnd.diff(currentWeekStart, "days") + 1;
    const weekNo = currentWeekStart.week();
    const week: Week = {
      weekNo,
      startingDate: currentWeekStart.format("YYYY-MM-DD"),
      endingDate: currentWeekEnd.format("YYYY-MM-DD"),
      days: daysInWeek
    };
    weeks.push(week);
    currentWeekStart = moment(currentWeekEnd).add(1, "day");
  }

  return weeks;
}

export const getDiffDays = (date: string) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = date1.getTime() - date2.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function formatCurrencyToIDR(amount: number | undefined): string {
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(amount ?? 0);
  return formattedAmount;
}

export function getTotalPriceInListOfPrice(scheduleData: ISchedule[] | undefined): string {
  const total = scheduleData?.map((item) => item.price ?? 0).reduce((acc, curr) => acc + curr, 0);

  return total !== undefined ? formatCurrencyToIDR(total) : "";
}

export function formatDateToIndonesian(date: string): string {
  const days: string[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
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
    "Desember"
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

export function extractSrcFromEmbedUrl(embedUrl: any) {
  console.log(embedUrl);
  const regex = /src=["']([^"']+)["']/;
  const match = embedUrl?.match(regex);
  return match ? match[1] : "";
}
