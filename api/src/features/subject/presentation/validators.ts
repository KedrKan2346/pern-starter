import { z } from 'zod';

/**
 * Subject's PUT and POST HTTP request body validation schema.
 */
export const subjectCreateOrUpdateDtoSchema = z.object({
  name: z.string().max(255),
  sex: z.string().max(6),
  status: z.string().max(50),
  diagnosisDate: z.string().max(50),
});
