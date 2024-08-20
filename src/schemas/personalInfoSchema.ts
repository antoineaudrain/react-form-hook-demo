import { z } from 'zod';

export default z.object({
  fullName: z.string().min(1, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender is required' }),
  }),
  maritalStatus: z.enum(['single', 'married', 'other'], {
    errorMap: () => ({ message: 'Marital status is required' }),
  }),
  dependents: z
    .array(
      z.object({
        name: z.string().min(1, 'Dependent name is required'),
        dateOfBirth: z.string().min(1, 'Dependent date of birth is required'),
        relationship: z.string().min(1, 'Relationship is required'),
      })
    )
    .optional(),
});