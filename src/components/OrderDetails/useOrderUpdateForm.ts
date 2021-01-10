import { useForm } from "react-hook-form";
import { OrderDto } from "../../types/api";
import { OrderFormData } from "./OrderDetailsForm";
import { useCheckIsDirty } from "./useCheckIsDirty";

export const useOrderUpdateForm = (order: OrderDto | null) => {
  const defaultValues: OrderFormData = {
    title: order?.title || "",
    bookingDate: order ? order.bookingDate : Date.now(),
  };
  const { dirty, setValueToCheck } = useCheckIsDirty(defaultValues);

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
