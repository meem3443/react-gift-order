import InputCard from "./cards/InputCard";
import { useInput } from "../hooks/useInput";
import { ERROR_MESSAGES } from "../constants/message";

interface ReceiverProps {
  quantityValue: string;
  onQuantityChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onQuantityBlur: () => void;
  quantityError: string;
  quantityTouched: boolean;
}

const validateReceiverName = (value: string): string => {
  if (!value.trim()) {
    return ERROR_MESSAGES.REQUIRED_NAME;
  }
  return "";
};

const validateReceiverPhone = (value: string): string => {
  const phoneRegex = /^\d{10,11}$/;
  if (!value.trim()) {
    return ERROR_MESSAGES.INVALID_PHONE_NUMBER;
  }
  if (!phoneRegex.test(value)) {
    return ERROR_MESSAGES.INVALID_PHONE_NUMBER;
  }
  return "";
};

const Receiver = ({
  quantityValue,
  onQuantityChange,
  onQuantityBlur,
  quantityError,
  quantityTouched,
}: ReceiverProps) => {
  const receiverNameInput = useInput("", validateReceiverName);
  const receiverPhoneInput = useInput("", validateReceiverPhone);

  return (
    <div className="">
      <InputCard
        title="받는 사람"
        label="이름을 입력해주세요"
        category="이름"
        value={receiverNameInput.value}
        onChange={receiverNameInput.onChange}
        onBlur={receiverNameInput.onBlur}
        error={receiverNameInput.error}
        touched={receiverNameInput.touched}
      />
      <InputCard
        label="전화번호를 입력해주세요"
        category="전화번호"
        type="tel"
        value={receiverPhoneInput.value}
        onChange={receiverPhoneInput.onChange}
        onBlur={receiverPhoneInput.onBlur}
        error={receiverPhoneInput.error}
        touched={receiverPhoneInput.touched}
      />
      <InputCard
        label="구매 수량을 입력하세요"
        category="수량"
        type="number"
        value={quantityValue}
        onChange={onQuantityChange}
        onBlur={onQuantityBlur}
        error={quantityError}
        touched={quantityTouched}
      />
    </div>
  );
};
export default Receiver;
