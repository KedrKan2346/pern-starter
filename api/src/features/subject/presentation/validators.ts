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
