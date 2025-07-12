import { useState, useEffect, useCallback } from "react";
import { useInput } from "../hooks/useInput";

import giftOrderThanksData from "../data/giftOrderThanksData";

import ThanksCard from "./cards/ThanksCard";
import InputCard from "./cards/InputCard";
import { ERROR_MESSAGES } from "../constants/message";

const validateThankMessage = (value: string): string => {
  if (!value.trim()) {
    return ERROR_MESSAGES.REQUIRED_MESSAGE;
  }
  return "";
};

const ThanksCardSlide = () => {
  const [selectedId, setSelectedId] = useState<number | null>(
    giftOrderThanksData.length > 0 ? giftOrderThanksData[0].id : null
  );

  const thankMessageInput = useInput("", validateThankMessage);
  const { setValue, setTouched } = thankMessageInput;
  const handleSelect = useCallback(
    (id: number) => {
      setSelectedId(id);
      setTouched(false);
    },
    [setTouched]
  );

  useEffect(() => {
    if (selectedId !== null) {
      const selectedCard = giftOrderThanksData.find(
        (card) => card.id === selectedId
      );
      setValue(selectedCard?.defaultTextMessage || "");
    } else {
      setValue("");
      setTouched(false);
    }
  }, [selectedId, setValue, setTouched]);

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto h-auto mb-2">
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
        <div className="flex flex-col items-center justify-center w-full bg-black">
          <img
            id="selectedCardImage"
            src={
              giftOrderThanksData.find((card) => card.id === selectedId)
                ?.imageUrl
            }
            alt="선택된 카드"
            className="w-1/2 h-1/4 rounded-lg shadow-lg mb-6 mt-4"
          />
          <div className="w-full mx-auto rounded-lg">
            <InputCard
              key={selectedId}
              id="thankMessage"
              label="메시지를 입력해주세요."
              isTextArea={true}
              value={thankMessageInput.value}
              onChange={thankMessageInput.onChange}
              onBlur={thankMessageInput.onBlur}
              error={thankMessageInput.error}
              touched={thankMessageInput.touched}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThanksCardSlide;
