// src/components/cards/InputCard.tsx
import React from "react";

interface InputCardProps {
  title?: string; // 옵셔널
  label: string; // placeholder 역할
  category?: string; // id, name 등으로 활용 가능
  type?: React.HTMLInputTypeAttribute; // "text", "number", "tel" 등
  isTextArea?: boolean; // textarea로 렌더링할지 여부
  id?: string; // input의 id 속성

  // useInput 훅에서 전달받을 props를 명시적으로 타입 선언
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // FocusEvent 타입 명시
  error: string; // useInput 훅의 error 값을 직접 받음
  touched: boolean; // useInput 훅의 touched 값을 직접 받음
}

const InputCard: React.FC<InputCardProps> = ({
  title,
  label,
  category,
  type = "text",
  isTextArea = false,
  id,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  // touched 상태일 때만 에러 메시지를 표시합니다.
  const displayError: string = touched ? error : "";

  return (
    <div className="mb-4">
      {title && (
        <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      )}
      <label htmlFor={id || category} className="sr-only">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id || category}
          className={`w-full rounded-md border p-3 text-gray-800 placeholder-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            displayError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={3}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id || category}
          className={`w-full rounded-md border p-3 text-gray-800 placeholder-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            displayError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
};

export default InputCard;
