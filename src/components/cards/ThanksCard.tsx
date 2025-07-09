import React from "react";

interface ThanksCardProps {
  id: number;
  thumbUrl: string;
  defaultMessage: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const ThanksCard: React.FC<ThanksCardProps> = ({
  id,
  thumbUrl,
  // defaultMessage는 여기서는 렌더링에 사용되지 않으므로, 구조 분해 할당에서 제거해도 무방합니다.
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`relative
        w-24 h-16
        flex-none cursor-pointer transform overflow-hidden rounded-lg shadow-md transition-transform duration-200 ${
          isSelected
            ? "scale-105 border-4 border-yellow-400"
            : "border border-gray-200"
        }`}
      onClick={() => onSelect(id)}
    >
      {/* 이미지는 부모 div의 높이를 100% 채우도록 h-full 유지.
          이렇게 해야 이미지 아래 흰색 여백이 생기지 않습니다. */}
      <img src={thumbUrl} alt="썸네일" className="h-full w-full object-cover" />
    </div>
  );
};

export default ThanksCard;
