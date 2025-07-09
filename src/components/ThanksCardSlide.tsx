import { useState, useEffect } from "react";

import giftOrderThanksData from "../data/giftOrderThanksData";

import ThanksCard from "./cards/ThanksCard";

import InputCard from "./cards/InputCard";

import { ERROR_MESSAGES } from "../constants/message";

const ThanksCardSlide = () => {
  const [selectedId, setSelectedId] = useState<number | null>(
    giftOrderThanksData.length > 0 ? giftOrderThanksData[0].id : null
  );

  const [thankMessage, setThankMessage] = useState<string>("");

  const [thankMessageError, setThankMessageError] = useState<string>("");

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (selectedId !== null) {
      const selectedCard = giftOrderThanksData.find(
        (card) => card.id === selectedId
      );

      setThankMessage(selectedCard?.defaultTextMessage || ""); // 선택된 카드의 기본 메시지로 초기화

      setThankMessageError("");
    } else {
      setThankMessage("");

      setThankMessageError("");
    }
  }, [selectedId]);

  const handleThankMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newMessage = e.target.value;

    setThankMessage(newMessage);

    if (!newMessage.trim()) {
      setThankMessageError(ERROR_MESSAGES.REQUIRED_MESSAGE);
    } else {
      setThankMessageError("");
    }
  };

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto h-auto bg-white m-3">
      <div className="flex overflow-x-auto space-x-4 p-4 w-full ">
        {giftOrderThanksData.map(({ id, thumbUrl, defaultTextMessage }) => (
          <ThanksCard
            key={id}
            id={id}
            thumbUrl={thumbUrl}
            defaultMessage={defaultTextMessage}
            isSelected={selectedId === id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {selectedId && (
        <div className="flex flex-col items-center justify-center bg-black">
          <img
            src={
              giftOrderThanksData.find((card) => card.id === selectedId)
                ?.imageUrl
            }
            alt="선택된 카드"
            className="w-1/2 h-1/4 rounded-lg shadow-lg mb-6"
          />

          <InputCard
            id="thankMessage"
            label="메시지를 입력해주세요."
            value={thankMessage}
            onChange={handleThankMessageChange}
            errorMessage={thankMessageError}
          />
        </div>
      )}
    </div>
  );
};

export default ThanksCardSlide;
