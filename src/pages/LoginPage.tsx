import React from "react";
import useLoginForm from "../hooks/useLoginForm";

const KakaoLoginPage = () => {
  const {
    email,
    password,
    emailError, // 이제 파생값으로 받음
    passwordError, // 이제 파생값으로 받음
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    isFormValid, // 폼 유효성 상태
  } = useLoginForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제출 버튼 클릭 시, 아직 blur 되지 않은 필드들도 모두 touched 처리하여 에러 메시지 표시
    // (선택 사항: 사용자 경험에 따라 제출 시점에 모든 에러를 보여줄지 결정)
    handleEmailBlur();
    handlePasswordBlur();

    if (isFormValid) {
      alert(`로그인 시도\n이메일: ${email}\n비밀번호: ${password}`);
      console.log("로그인 성공!");
      // 실제 로그인 API 호출 등
    } else {
      console.log("유효성 검사 실패. 모든 필드를 올바르게 입력해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-5xl font-sans font-bold text-black mb-16 select-none cursor-default">
        kakao
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm px-6">
        <div className="mb-8">
          <input
            type="email"
            id="inputEmail"
            value={email === null ? "" : email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="이메일"
            className={`w-full py-3 border-b ${
              emailError ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-yellow-400 text-lg placeholder-gray-500 text-gray-800 transition duration-200`}
          />

          {/* emailError는 이미 isEmailTouched를 고려하여 계산되므로 별도 조건 추가 불필요 */}
          {emailError && (
            <p className="text-red-500 text-sm mt-2">{emailError}</p>
          )}
        </div>

        <div className="mb-12">
          <input
            type="password"
            id="inputPassword"
            value={password === null ? "" : password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="비밀번호"
            className={`w-full py-3 border-b ${
              passwordError ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-yellow-400 text-lg placeholder-gray-500 text-gray-800 transition duration-200`}
          />
          {/* passwordError는 이미 isPasswordTouched를 고려하여 계산되므로 별도 조건 추가 불필요 */}
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 ${
            isFormValid
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-gray-300 cursor-not-allowed"
          } text-black text-l rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default KakaoLoginPage;
