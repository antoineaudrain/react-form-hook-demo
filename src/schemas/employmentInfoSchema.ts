import { z } from 'zod';

export default z.object({
  employmentStatus: z.enum(['employed', 'self-employed', 'unemployed', 'retired'], {
    errorMap: () => ({ message: 'Employment status is required' }),
  }),
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  annualIncome: z.number().optional(),
  businessName: z.string().optional(),
  yearsInBusiness: z.number().optional(),
});