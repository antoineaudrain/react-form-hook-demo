import React from 'react';
import { useHealthInsuranceForm, HealthInsuranceFormData } from '../../hooks/form/useHealthInsuranceForm';
import { FormControl } from './utils/FormControl';
import { TextInput } from './fields/TextInput';
import { Select } from './fields/Select';
import { TextArea } from './fields/TextArea';
import { Button } from '../shared/Button';

export const HealthInsuranceForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    dependents,
    addDependent,
    removeDependent,
    conditions,
    addCondition,
    removeCondition,
    medications,
    addMedication,
    removeMedication,
    watch,
    planTypeOptions,
    coverageLevelOptions
  } = useHealthInsuranceForm();

  const onSubmit = (data: HealthInsuranceFormData) => {
    console.log('Form submitted:', data);
  };

  const maritalStatus = watch('personalInfo.maritalStatus');
  const preExistingConditions = watch('healthInfo.preExistingConditions');
  const employmentStatus = watch('employmentInfo.employmentStatus');

  return (
    <form className="health-insurance-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="health-insurance-form__section">
        <div className="health-insurance-form__section-title">Personal Information</div>

        <FormControl error={errors.personalInfo?.fullName?.message}>
          <TextInput {...register("personalInfo.fullName")} placeholder="Full Name" />
        </FormControl>

        <FormControl error={errors.personalInfo?.dateOfBirth?.message}>
          <TextInput {...register("personalInfo.dateOfBirth")} placeholder="Date of Birth" />
        </FormControl>

        <FormControl error={errors.personalInfo?.gender?.message}>
          <Select {...register("personalInfo.gender")} options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" }
          ]} placeholder="Gender" />
        </FormControl>

        <FormControl error={errors.personalInfo?.maritalStatus?.message}>
          <Select {...register("personalInfo.maritalStatus")} options={[
            { value: "single", label: "Single" },
            { value: "married", label: "Married" },
            { value: "other", label: "Other" }
          ]} placeholder="Marital Status" />
        </FormControl>

        {maritalStatus === "married" && (
          <>
            {dependents.map((dependent, index) => (
              <div key={dependent.id} className="health-insurance-form__subsection">
                <FormControl error={errors.personalInfo?.dependents?.[index]?.name?.message}>
                  <TextInput {...register(`personalInfo.dependents.${index}.name`)} placeholder="Dependent Name" />
                </FormControl>

                <FormControl error={errors.personalInfo?.dependents?.[index]?.dateOfBirth?.message}>
                  <TextInput {...register(`personalInfo.dependents.${index}.dateOfBirth`)}
                             placeholder="Dependent Date of Birth" />
                </FormControl>

                <FormControl error={errors.personalInfo?.dependents?.[index]?.relationship?.message}>
                  <TextArea rows={2} {...register(`personalInfo.dependents.${index}.relationship`)} placeholder="Relationship" />
                </FormControl>

                <Button type="button" onClick={() => removeDependent(index)}
                        disabled={dependents.length === 1 && index === 0} className="button-secondary">🗑️</Button>
              </div>
            ))}

            <Button type="button" onClick={addDependent} className="button-secondary">Add Dependent</Button>
          </>
        )}
      </div>

      <div className="health-insurance-form__section">
        <div className="health-insurance-form__section-title">Employment Information</div>

        <FormControl error={errors.employmentInfo?.employmentStatus?.message}>
          <Select {...register('employmentInfo.employmentStatus')} options={[
            { value: 'employed', label: 'Employed' },
            { value: 'self-employed', label: 'Self-Employed' },
            { value: 'unemployed', label: 'Unemployed' },
            { value: 'retired', label: 'Retired' },
          ]} placeholder="Employment Status" />
        </FormControl>

        {employmentStatus === 'self-employed' && (
          <>
            <FormControl error={errors.employmentInfo?.businessName?.message}>
              <TextInput {...register('employmentInfo.businessName')} placeholder="Business Name" />
            </FormControl>

            <FormControl error={errors.employmentInfo?.yearsInBusiness?.message}>
              <TextInput {...register('employmentInfo.yearsInBusiness')} placeholder="Years in Business" />
            </FormControl>
          </>
        )}
      </div>

      <div className="health-insurance-form__section">
        <div className="health-insurance-form__section-title">Health Information</div>

        <FormControl error={errors.healthInfo?.preExistingConditions?.message}>
          <Select {...register('healthInfo.preExistingConditions')} options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]} placeholder="Pre-Existing Conditions" />
        </FormControl>

        {preExistingConditions === 'yes' && (
          <>
            {conditions.map((condition, index) => (
              <div key={condition.id} className="health-insurance-form__subsection">
                <FormControl error={errors.healthInfo?.conditions?.[index]?.conditionName?.message}>
                  <TextInput {...register(`healthInfo.conditions.${index}.conditionName`)}
                             placeholder="Condition Name" />
                </FormControl>

                <FormControl>
                  <TextInput {...register(`healthInfo.conditions.${index}.treatment`)} placeholder="Treatment" />
                </FormControl>

                <FormControl>
                  <TextInput {...register(`healthInfo.conditions.${index}.duration`)} placeholder="Duration" />
                </FormControl>

                <Button type="button" onClick={() => removeCondition(index)} className="button-secondary">🗑️</Button>
              </div>
            ))}

            <Button type="button" onClick={addCondition} className="button-secondary">Add Condition</Button>
          </>
        )}

        {preExistingConditions === "yes" && (
          <>
            {medications.map((medication, index) => (
              <div key={medication.id} className="health-insurance-form__subsection">
                <FormControl error={errors.healthInfo?.medications?.[index]?.name?.message}>
                  <TextInput {...register(`healthInfo.medications.${index}.name`)} placeholder="Medication Name" />
                </FormControl>

                <FormControl error={errors.healthInfo?.medications?.[index]?.dosage?.message}>
                  <TextInput {...register(`healthInfo.medications.${index}.dosage`)} placeholder="Dosage" />
                </FormControl>

                <FormControl>
                  <TextInput {...register(`healthInfo.medications.${index}.prescribingDoctor`)}
                             placeholder="Prescribing Doctor" />
                </FormControl>

                <Button type="button" onClick={() => removeMedication(index)} className="button-secondary">🗑️</Button>
              </div>
            ))}

            <Button type="button" onClick={addMedication} className="button-secondary">Add Medication</Button>
          </>
        )}
      </div>

      <div className="health-insurance-form__section">
        <div className="health-insurance-form__section-title">Insurance Plan Selection</div>

        <FormControl error={errors.insurancePlan?.planType?.message}>
          <Select {...register('insurancePlan.planType')} options={planTypeOptions} placeholder="Plan Type" />
        </FormControl>

        <FormControl error={errors.insurancePlan?.coverageLevel?.message}>
          <Select {...register('insurancePlan.coverageLevel')} options={coverageLevelOptions} placeholder="Coverage Level" />
        </FormControl>

        <Button type="submit" className="button-primary">Submit</Button>
      </div>
    </form>
  );
};
