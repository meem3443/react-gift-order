import React from "react";
import useLoginForm from "../hooks/useLoginForm";

const KakaoLoginPage = () => {
  // useLoginForm 훅에서 필요한 값과 함수들을 가져옵니다.
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    isFormValid, // 폼 유효성 상태
  } = useLoginForm(); // useState 대신 커스텀 훅 사용

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // isFormValid가 true일 때만 로그인 로직 실행
    if (isFormValid) {
      alert(`로그인 시도\n이메일: ${email}\n비밀번호: ${password}`);
      console.log("로그인 성공!");
      // 실제 로그인 API 호출 등
    } else {
      // 폼이 유효하지 않을 경우, 에러 메시지 강제 업데이트 (선택 사항: 필요시 모든 필드에 대한 blur 처리)
      // 이메일 필드 에러 메시지 업데이트
      // 비밀번호 필드 에러 메시지 업데이트
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
            type="text" // 이메일 형식을 강제하기 위해 type="email" 대신 "text"를 사용하고, 유효성 검사를 직접 처리하는 것이 좋습니다.
            id="inputEmail"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur} // 포커스 아웃 시 유효성 검사
            placeholder="이메일"
            className={`w-full py-3 border-b ${
              emailError ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-yellow-400 text-lg placeholder-gray-500 text-gray-800 transition duration-200`}
            // required 속성은 React의 유효성 검사와 중복될 수 있으므로 제거하거나 조심해서 사용합니다.
          />
          {/* ID 에러 메시지 표시 */}
          {emailError && (
            <p className="text-red-500 text-sm mt-2">{emailError}</p>
          )}
        </div>

        <div className="mb-12">
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur} // 포커스 아웃 시 유효성 검사
            placeholder="비밀번호"
            className={`w-full py-3 border-b ${
              passwordError ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-yellow-400 text-lg placeholder-gray-500 text-gray-800 transition duration-200`}
            // required 속성은 React의 유효성 검사와 중복될 수 있으므로 제거하거나 조심해서 사용합니다.
          />
          {/* PW 에러 메시지 표시 */}
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid} // isFormValid 값에 따라 버튼 활성화/비활성화
          className={`w-full py-4 ${
            isFormValid
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-gray-300 cursor-not-allowed"
          } text-black text-l rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200`}
          // 활성화 상태에 따라 focus:ring-yellow-500을 조절할 수 있습니다.
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default KakaoLoginPage;
