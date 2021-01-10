import { useForm } from "react-hook-form";
import { convertMillisecondsToDate } from "../../core/utils/date";
import { OrderDto } from "../../types/api";
import { useCheckIsDirty } from "./useCheckIsDirty";

type FormData = {
  title: string;
  bookingDate: string;
};

export const useOrderUpdateForm = (order: OrderDto | null) => {
  const defaultValues: FormData = {
    title: order?.title || "",
    bookingDate: order ? convertMillisecondsToDate(order.bookingDate) : "",
  };
  const { dirty, setValueToCheck } = useCheckIsDirty(defaultValues);

  const {
    handleSubmit,
    register,
    errors,
    getValues,
    control,
  } = useForm<FormData>({
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
