import { z } from 'zod';
import { filterXSS } from 'xss';

function createOptionsStringXssValidator(maxLength: number) {
  return z
    .string()
    .max(maxLength)
    .optional()
    .refine((data) => {
      if (!data) {
        return true;
      }
      return filterXSS(data) === data;
    });
}

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
  name: createOptionsStringXssValidator(255),
  sex: z.string().max(15).optional(),
  status: createOptionsStringXssValidator(255),
  start_diag_date: z.string().max(10).optional(),
  end_diag_date: z.string().max(10).optional(),
});
