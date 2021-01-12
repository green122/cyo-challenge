import { useEffect, useRef, useState } from "react";

type FormFieldsType = Record<string, string | number>;

const shallowCompare = <T extends FormFieldsType>(a: T, b: T) => {
  for (const key in a) {
    if (a[key] !== b[key]) return true;
  }
  return false;
};

export const useCheckIsDirty = <T extends FormFieldsType>(
  defaultValues: T | null
) => {
  const prev = useRef(defaultValues);
  const [dirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (defaultValues !== prev.current) {
      prev.current = defaultValues;
    }
  }, [defaultValues]);

  const setValueToCheck = (newValue: T) => {
    if (!prev.current) {
      return;
    }
    const isDirty = shallowCompare(prev.current, newValue);
    if (dirty !== isDirty) setIsDirty(isDirty);
  };

  return { dirty, setValueToCheck, setIsDirty };
};
