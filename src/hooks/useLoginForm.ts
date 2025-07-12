import { useReducer, useCallback, useMemo } from "react";

// 1. 상태를 관리할 Initial State 정의
const initialState = {
  // ✨ email과 password의 초기 타입을 string | null 로 변경하거나, 아예 빈 문자열로 시작하는 것이 좋습니다.
  // 여기서는 빈 문자열로 시작하도록 수정하여 타입 안정성을 높입니다.
  email: "" as string | null, // 초기에는 빈 문자열로 시작하지만, null도 허용함을 명시
  password: "" as string | null, // 초기에는 빈 문자열로 시작하지만, null도 허용함을 명시
  isEmailTouched: false, // 사용자 상호작용 여부
  isPasswordTouched: false, // 사용자 상호작용 여부
};

// 2. 상태 업데이트 로직을 담을 Reducer 함수 정의
type Action =
  | { type: "SET_EMAIL"; payload: string | null }
  | { type: "SET_PASSWORD"; payload: string | null }
  | { type: "SET_EMAIL_TOUCHED"; payload: boolean }
  | { type: "SET_PASSWORD_TOUCHED"; payload: boolean };

// Reducer 함수는 `state`의 타입과 `action`의 타입을 명시적으로 지정해야 합니다.
const formReducer = (
  state: typeof initialState,
  action: Action
): typeof initialState => {
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
  // useReducer의 두 번째 인자인 initialState의 타입이 명확해야 합니다.
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

  // 에러 메시지 계산
  // email과 password는 string | null 타입이므로, validateEmail/Password에 직접 넘겨도 괜찮습니다.
  const emailError = isEmailTouched ? validateEmail(email) : "";
  const passwordError = isPasswordTouched ? validatePassword(password) : "";

  // 로그인 버튼 활성화 조건 (useMemo로 메모이제이션)
  const isFormValid = useMemo(() => {
    // 모든 필드가 최소한 한 번은 유효성 검사되었고, 에러가 없어야 유효함
    // email과 password가 null이 아닌 경우에만 validate 함수를 호출하도록 변경
    const emailValid = email !== null && validateEmail(email) === "";
    const passwordValid =
      password !== null && validatePassword(password) === "";

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
