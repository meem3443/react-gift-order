import { useInput } from "../hooks/useInput";
import InputCard from "./cards/InputCard";
import { ERROR_MESSAGES } from "../constants/message";

const validateSenderName = (value: string): string => {
  if (!value.trim()) {
    return ERROR_MESSAGES.REQUIRED_NAME;
  }
  return "";
};

const Sender = () => {
  const senderNameInput = useInput("", validateSenderName);

  return (
    <div className="">
      <InputCard
        title="보내는 사람"
        label="이름을 입력해주세요"
        category=""
        value={senderNameInput.value}
        onChange={senderNameInput.onChange}
        onBlur={senderNameInput.onBlur}
        error={senderNameInput.error}
        touched={senderNameInput.touched}
      />
    </div>
  );
};
export default Sender;
