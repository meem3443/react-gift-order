import { useReducer, useCallback, useMemo } from "react";

// 1. 상태를 관리할 Initial State 정의
const initialState = {
  email: null,
  password: null,
  isEmailTouched: false, // 사용자 상호작용 여부
  isPasswordTouched: false, // 사용자 상호작용 여부
};

// 2. 상태 업데이트 로직을 담을 Reducer 함수 정의
type Action =
  | { type: "SET_EMAIL"; payload: string | null }
  | { type: "SET_PASSWORD"; payload: string | null }
  | { type: "SET_EMAIL_TOUCHED"; payload: boolean }
  | { type: "SET_PASSWORD_TOUCHED"; payload: boolean };

const formReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_EMAIL_TOUCHED":
      return { ...state, isEmailTouched: action.payload };
    case "SET_PASSWORD_TOUCHED":
      return { ...state, isPasswordTouched: action.payload };
    default:
      return state;
  }
};

// 3. useLoginForm 커스텀 훅 정의
const useLoginForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, password, isEmailTouched, isPasswordTouched } = state;

  // 이메일 유효성 검사 (useCallback으로 메모이제이션)
  const validateEmail = useCallback((emailValue: string | null) => {
    if (emailValue === null || emailValue === "") {
      return "ID를 입력해주세요.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "ID는 이메일 형식으로 입력해주세요.";
    }
    return "";
  }, []);

  // 비밀번호 유효성 검사 (useCallback으로 메모이제이션)
  const validatePassword = useCallback((passwordValue: string | null) => {
    if (passwordValue === null || passwordValue === "") {
      return "PW를 입력해주세요.";
    }
    if (passwordValue.length < 8) {
      return "PW는 최소 8글자 이상이어야 합니다.";
    }
    return "";
  }, []);

  // 이메일 변경 핸들러
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_EMAIL", payload: e.target.value });
      // 입력 즉시 touched 상태가 되도록 설정 (선택 사항: blur와 동시에 설정할 수도 있음)
      if (!isEmailTouched) {
        dispatch({ type: "SET_EMAIL_TOUCHED", payload: true });
      }
    },
    [isEmailTouched]
  );

  // 이메일 필드 blur 핸들러
  const handleEmailBlur = useCallback(() => {
    dispatch({ type: "SET_EMAIL_TOUCHED", payload: true });
  }, []);

  // 비밀번호 변경 핸들러
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_PASSWORD", payload: e.target.value });
      // 입력 즉시 touched 상태가 되도록 설정
      if (!isPasswordTouched) {
        dispatch({ type: "SET_PASSWORD_TOUCHED", payload: true });
      }
    },
    [isPasswordTouched]
  );

  const handlePasswordBlur = useCallback(() => {
    dispatch({ type: "SET_PASSWORD_TOUCHED", payload: true });
  }, []);

  const emailError = isEmailTouched ? validateEmail(email) : "";

  const passwordError = isPasswordTouched ? validatePassword(password) : "";

  // 로그인 버튼 활성화 조건 (useMemo로 메모이제이션)
  const isFormValid = useMemo(() => {
    // 모든 필드가 최소한 한 번은 유효성 검사되었고, 에러가 없어야 유효함
    const emailValid = validateEmail(email) === "";
    const passwordValid = validatePassword(password) === "";

    // 폼이 유효하려면 모든 필드가 터치되었고, 유효성 검사를 통과해야 함
    return isEmailTouched && isPasswordTouched && emailValid && passwordValid;
  }, [
    email,
    password,
    isEmailTouched,
    isPasswordTouched,
    validateEmail,
    validatePassword,
  ]);

  return {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    isFormValid,
  };
};

export default useLoginForm;
