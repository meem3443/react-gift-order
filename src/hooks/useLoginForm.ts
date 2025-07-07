import { useReducer, useCallback, useMemo } from "react";

// 1. 상태를 관리할 Initial State 정의
const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  isEmailTouched: false,
  isPasswordTouched: false,
};

// 2. 상태 업데이트 로직을 담을 Reducer 함수 정의
// 액션 타입들을 정의하여 요청
type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_EMAIL_ERROR"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: string }
  | { type: "SET_EMAIL_TOUCHED"; payload: boolean }
  | { type: "SET_PASSWORD_TOUCHED"; payload: boolean };

// 액션 타입들 별로 값 처리.
const formReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.payload };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
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
  const {
    email,
    password,
    emailError,
    passwordError,
    isEmailTouched,
    isPasswordTouched,
  } = state;

  // 이메일 유효성 검사 (useCallback으로 메모이제이션)
  const validateEmail = useCallback((emailValue: string) => {
    if (!emailValue) {
      return "ID를 입력해주세요.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "ID는 이메일 형식으로 입력해주세요.";
    }
    return "";
  }, []);

  // 비밀번호 유효성 검사 (useCallback으로 메모이제이션)
  const validatePassword = useCallback((passwordValue: string) => {
    if (!passwordValue) {
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
      // 이미 터치된 상태라면, 입력과 동시에 에러 메시지 업데이트
      if (isEmailTouched) {
        dispatch({
          type: "SET_EMAIL_ERROR",
          payload: validateEmail(e.target.value),
        });
      }
    },
    [isEmailTouched, validateEmail]
  );

  // 이메일 필드 blur 핸들러
  const handleEmailBlur = useCallback(() => {
    dispatch({ type: "SET_EMAIL_TOUCHED", payload: true });
    dispatch({ type: "SET_EMAIL_ERROR", payload: validateEmail(email) });
  }, [email, validateEmail]);

  // 비밀번호 변경 핸들러
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_PASSWORD", payload: e.target.value });
      // 이미 터치된 상태라면, 입력과 동시에 에러 메시지 업데이트
      if (isPasswordTouched) {
        dispatch({
          type: "SET_PASSWORD_ERROR",
          payload: validatePassword(e.target.value),
        });
      }
    },
    [isPasswordTouched, validatePassword]
  );

  // 비밀번호 필드 blur 핸들러
  const handlePasswordBlur = useCallback(() => {
    dispatch({ type: "SET_PASSWORD_TOUCHED", payload: true });
    dispatch({
      type: "SET_PASSWORD_ERROR",
      payload: validatePassword(password),
    });
  }, [password, validatePassword]);

  // 로그인 버튼 활성화 조건 (useMemo로 메모이제이션)
  const isFormValid = useMemo(() => {
    // 모든 필드가 터치되었고, 유효성 검사를 통과해야 함
    const emailValid = validateEmail(email) === "";
    const passwordValid = validatePassword(password) === "";
    return emailValid && passwordValid;
  }, [email, password, validateEmail, validatePassword]);

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
