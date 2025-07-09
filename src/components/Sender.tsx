import React from "react";
import InputCard from "./cards/InputCard";
import { ERROR_MESSAGES } from "../constants/message";

const Sender = () => {
  return (
    <div className="m-3">
      <InputCard
        title="보내는 사람"
        label="메시지를 입력해주세요"
        errorMessage={ERROR_MESSAGES.REQUIRED_NAME} // 이 에러 메시지는 단순히 예시로 사용됨.
      />
    </div>
  );
};
export default Sender;
