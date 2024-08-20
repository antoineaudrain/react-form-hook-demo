import { z } from 'zod';

export default z.object({
  preExistingConditions: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Please select yes or no' }),
  }),
  smokingStatus: z.enum(['current', 'former', 'never'], {
    errorMap: () => ({ message: 'Please select your smoking status' }),
  }),
  conditions: z.array(
    z.object({
      conditionName: z.string().min(1, 'Condition name is required'),
      treatment: z.string().optional(),
      duration: z.string().optional(),
    }))
    .optional(),
  medications: z.array(
    z.object({
      name: z.string().min(1, 'Medication name is required'),
      dosage: z.string().min(1, 'Dosage is required'),
      prescribingDoctor: z.string().optional(),
    }))
    .optional(),
});