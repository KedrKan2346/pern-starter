import { z } from 'zod';
import { filterXSS } from 'xss';

/**
 * Subject's PUT and POST HTTP request body validation schema.
 */
export const subjectCreateOrUpdateDtoSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => {
      return filterXSS(data) === data;
    }),
  sex: z.string().min(1).max(6),
  status: z.string().min(1).max(50),
  diagnosisDate: z.string().min(1).max(50),
});

export const subjectsFilterQueryParamsSchema = z.object({
  sortorder: z.string().max(4).optional(),
  sortby: z.string().max(14).optional(),
  name: z
    .string()
    .max(255)
    .optional()
    .refine((data) => {
      if (!data) {
        return true;
      }
      return filterXSS(data) === data;
    }),
  sex: z
    .string()
    .max(15)
    .optional()
    .refine((data) => {
      if (!data) {
        return true;
      }
      return filterXSS(data) === data;
    }),
  status: z
    .string()
    .max(255)
    .optional()
    .refine((data) => {
      if (!data) {
        return true;
      }
      return filterXSS(data) === data;
    }),
});
