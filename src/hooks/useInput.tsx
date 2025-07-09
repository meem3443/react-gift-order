// src/hooks/useInput.tsx
import { useState, useCallback } from "react";

// 유효성 검사 함수의 타입을 정의합니다.
type Validator = (value: string) => string;

// useInput 훅의 반환값 타입을 명확하게 정의합니다.
interface UseInputReturn {
  value: string;
  error: string;
  touched: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: () => void;
  forceValidate: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>; // 외부에서 value를 설정할 수 있는 setter
  setTouched: React.Dispatch<React.SetStateAction<boolean>>; // 외부에서 touched를 설정할 수 있는 setter
}

/**
 * 개별 입력 필드의 상태와 유효성 검사를 관리하는 커스텀 훅.
 * @param {string} initialValue - 입력 필드의 초기 값.
 * @param {Validator} validateFn - 유효성 검사 함수 (에러 메시지 반환).
 * @returns {UseInputReturn} 입력 필드 상태 및 핸들러.
 */
const useInput = (
  initialValue: string,
  validateFn: Validator
): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 값이 변경될 때 호출됩니다.
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const newValue: string = e.target.value;
      setValue(newValue);
      // 'touched' 상태일 때만 실시간으로 에러 메시지를 업데이트합니다.
      if (touched) {
        setError(validateFn(newValue));
      }
    },
    [validateFn, touched]
  );

  // 입력 필드에서 포커스를 잃을 때 호출됩니다.
  const handleBlur = useCallback((): void => {
    setTouched(true);
    setError(validateFn(value)); // blur 시점에 최종 유효성 검사 수행
  }, [value, validateFn]);

  // 외부에서 강제로 유효성 검사를 트리거할 때 사용됩니다 (예: 폼 제출 시).
  const forceValidate = useCallback((): void => {
    setTouched(true); // 강제 검사 시 'touched' 상태로 만듭니다.
    setError(validateFn(value));
  }, [value, validateFn]);

  return {
    value,
    error,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
    forceValidate,
    setValue,
    setTouched,
  };
};

export default useInput;
