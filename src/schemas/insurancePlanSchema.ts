import { z } from 'zod';

export default z.object({
  planType: z.enum(['individual', 'family', 'senior'], {
    errorMap: () => ({ message: 'Please select a plan type' }),
  }),
  coverageLevel: z.enum(['basic', 'standard', 'premium'], {
    errorMap: () => ({ message: 'Please select a coverage level' }),
  }),
  addOns: z.array(z.enum(['dental', 'vision', 'criticalIllness'])).optional(),
});