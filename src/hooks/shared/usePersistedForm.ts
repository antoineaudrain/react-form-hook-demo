import { useForm, UseFormProps, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

type UsePersistedFormProps<T extends FieldValues> = UseFormProps<T> & {
  id: string;
};

function usePersistedForm<T extends FieldValues>(props: UsePersistedFormProps<T>): UseFormReturn<T> {
  const { id, defaultValues, ...formProps } = props;

  const persistedData = useMemo<DefaultValues<T> | undefined>(() => {
    const savedData = localStorage.getItem(id);
    return savedData ? (JSON.parse(savedData) as DefaultValues<T>) : undefined;
  }, [id]);

  const form = useForm<T>({
    ...formProps,
    defaultValues: persistedData || defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(id, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [id, form]);

  return form;
}

export default usePersistedForm;
