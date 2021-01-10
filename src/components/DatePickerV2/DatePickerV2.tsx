import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";

const DatePickerV2 = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePickerV2;
