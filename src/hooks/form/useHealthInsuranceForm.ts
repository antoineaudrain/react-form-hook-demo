import { z } from 'zod';
import { useEffect, useMemo } from "react";
import { useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import usePersistedForm from "../shared/usePersistedForm.ts";
import personalInfoSchema from "../../schemas/personalInfoSchema.ts";
import employmentInfoSchema from "../../schemas/employmentInfoSchema.ts";
import healthInfoSchema from "../../schemas/healthInfoSchema.ts";
import insurancePlanSchema from "../../schemas/insurancePlanSchema.ts";

export const healthInsuranceFormSchema = z.object({
  personalInfo: personalInfoSchema,
  employmentInfo: employmentInfoSchema,
  healthInfo: healthInfoSchema,
  insurancePlan: insurancePlanSchema,
});

export type HealthInsuranceFormData = z.infer<typeof healthInsuranceFormSchema>;

export const useHealthInsuranceForm = (initialData?: Partial<HealthInsuranceFormData>) => {
  const form = usePersistedForm<HealthInsuranceFormData>({
    id: 'health-insurance-form',
    resolver: zodResolver(healthInsuranceFormSchema),
    defaultValues: initialData || {
      personalInfo: {
        fullName: '',
        dateOfBirth: '',
        gender: undefined,
        maritalStatus: undefined,
      },
      employmentInfo: {
        employmentStatus: 'employed',
      },
      healthInfo: {
        preExistingConditions: 'no',
        smokingStatus: 'never',
      },
      insurancePlan: {
        planType: 'individual',
        coverageLevel: 'basic',
      },
    },
  });

  const { fields: dependents, append: addDependent, remove: removeDependent } = useFieldArray({
    control: form.control,
    name: 'personalInfo.dependents',
  });

  const { fields: conditions, append: addCondition, remove: removeCondition } = useFieldArray({
    control: form.control,
    name: 'healthInfo.conditions',
  });

  const { fields: medications, append: addMedication, remove: removeMedication } = useFieldArray({
    control: form.control,
    name: 'healthInfo.medications',
  });

  const planType = form.watch('insurancePlan.planType');
  const coverageLevel = form.watch('insurancePlan.coverageLevel');

  useEffect(() => {
    if (planType === 'family' && dependents.length === 0) {
      form.setValue('insurancePlan.planType', 'individual');
    } else if (planType === 'individual') {
      form.setValue('insurancePlan.coverageLevel', 'basic');
    } else if (planType === 'family') {
      form.setValue('insurancePlan.coverageLevel', 'standard');
    } else if (planType === 'senior') {
      form.setValue('insurancePlan.coverageLevel', 'premium');
    }
  }, [form, planType]);

  useEffect(() => {
    if (coverageLevel === 'basic') {
      form.setValue('insurancePlan.planType', 'individual');
    } else if (coverageLevel === 'standard') {
      form.setValue('insurancePlan.planType', 'family');
    } else if (coverageLevel === 'premium') {
      form.setValue('insurancePlan.planType', 'senior');
    }
  }, [form, coverageLevel]);

  const planTypeOptions = useMemo(() => [
    { value: 'individual', label: 'Individual' },
    { value: 'family', label: 'Family', disabled: dependents.length === 0 },
    { value: 'senior', label: 'Senior' },
  ], [dependents.length]);

  const coverageLevelOptions = useMemo(() => {
    const planType = form.watch('insurancePlan.planType');
    return [
      { value: 'basic', label: 'Basic' },
      { value: 'standard', label: 'Standard', disabled: planType !== 'family' },
      { value: 'premium', label: 'Premium', disabled: planType !== 'senior' },
    ];
  }, [form]);

  return {
    ...form,
    dependents,
    addDependent,
    removeDependent,
    conditions,
    addCondition,
    removeCondition,
    medications,
    addMedication,
    removeMedication,
    planTypeOptions,
    coverageLevelOptions,
  };
};