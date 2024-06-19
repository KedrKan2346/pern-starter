import { DateTime } from "luxon";

/**
 * Check if value is numeric (int or decimal).
 * @param value Value of any type which is supposed to be valid number.
 * @returns true if value is valid number.
 */
export function isNumeric(value: string): boolean {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) && isFinite(parsedValue);
}

/**
 * Try converting value of any type to number.
 * @param value Value of any type which is supposed to be valid number.
 * @returns true if value is valid number otherwise returns undefined.
 */
export function tryGetNumericValue(value: string): number | undefined {
  try {
    return isNumeric(value) ? parseFloat(value) : undefined;
  } catch {
    return;
  }
}

/**
 * Return date string formatted as MMM dd, yyyy.
 * @param dateString String date representation in ISO format.
 * @returns String date in "MMM dd, yyyy" format.
 */
export function formatDateAsShort(dateString: string) {
  // TechDebt: Read timezone from user settings.
  return DateTime.fromISO(dateString)
    .setZone("America/New_York")
    .toFormat("MMM dd, yyyy");
}
