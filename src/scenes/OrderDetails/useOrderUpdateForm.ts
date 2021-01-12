import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isValidDate, validateDate } from "../../core/utils/date";
import { OrderDto } from "../../types/api";
import { OrderFormData } from "./OrderDetailsForm";
import { useCheckIsDirty } from "./useCheckIsDirty";

export const useOrderUpdateForm = (order: OrderDto | null) => {
  const defaultValues: OrderFormData = {
    title: order?.title || "",
    bookingDate: validateDate(order?.bookingDate),
  };
  const { dirty, setValueToCheck, setIsDirty } = useCheckIsDirty(defaultValues);

  useEffect(() => {
    if (!order?.bookingDate) {
      return;
    }
    if (!isValidDate(order.bookingDate)) {
      setIsDirty(true);
    }

    // We can disable this check for setIsDirty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.bookingDate]);

  const {
    handleSubmit,
    register,
    errors,
    getValues,
    control,
  } = useForm<OrderFormData>({
    defaultValues,
    mode: "onChange",
  });

  const checkOnChange = () => {
    setValueToCheck(getValues());
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    checkOnChange,
    dirty,
  };
};
