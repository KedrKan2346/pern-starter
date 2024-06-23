import { DateTime } from 'luxon';

/**
 * Check if value is numeric (int or decimal).
 * @param value Value of any type which is supposed to be valid number.
 * @returns true if value is valid number.
 */
export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Try converting value of any type to number.
 * @param value Value of any type which is supposed to be valid number.
 * @returns true if value is valid number otherwise returns undefined.
 */
export function tryGetNumericValue(value?: any): number | undefined {
  if (!value) {
    return;
  }
  try {
    return isNumeric(value) ? parseFloat(value) : undefined;
  } catch {
    return;
  }
}

export function tryGetStringArrayFromQueryString(value?: string): string[] {
  if (!value) {
    return [];
  }
  try {
    return decodeURIComponent(value).split(',');
  } catch {
    return [];
  }
}

export function tryGetJsDateFromQueryString(value?: string): Date | undefined {
  if (!value) {
    return;
  }
  try {
    const decodedString = decodeURIComponent(value);
    return DateTime.fromFormat(decodedString, 'yyyy-MM-dd').toJSDate();
  } catch {
    return;
  }
}

export function tryGetLuxonDateFromQueryString(value?: string): DateTime | undefined {
  if (!value) {
    return;
  }
  try {
    const decodedString = decodeURIComponent(value);
    return DateTime.fromFormat(decodedString, 'yyyy-MM-dd');
  } catch {
    return;
  }
}

export function getInclusiveJsEndDateFilterValue(value?: DateTime): Date | undefined {
  if (!value) {
    return;
  }
  return value.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toJSDate();
}
