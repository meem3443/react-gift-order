import InputCard from "./cards/InputCard";
import { ERROR_MESSAGES } from "../constants/message";

const Receiver = () => {
  return (
    <div className="m-3">
      <InputCard
        title="받는 사람"
        label="이름을 입력해주세요"
        category="이름"
        errorMessage={ERROR_MESSAGES.REQUIRED_NAME} // 이 에러 메시지는 단순히 예시로 사용됨. 실제 유효성 검사 로직은 별도 구현 필요.
      />
      <InputCard
        label="이름을 입력해주세요"
        category="전화번호"
        errorMessage={ERROR_MESSAGES.INVALID_PHONE_NUMBER} // 이 에러 메시지는 단순히 예시로 사용됨.
      />
      <InputCard
        label="구매 수량을 입력하세요"
        category="수량"
        errorMessage={ERROR_MESSAGES.MIN_QUANTITY} // 이 에러 메시지는 단순히 예시로 사용됨.
      />
    </div>
  );
};
export default Receiver;
