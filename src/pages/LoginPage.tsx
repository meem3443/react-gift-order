import React, { useEffect } from "react";
import useLoginForm from "../hooks/useLoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { PATHS } from "../constants/paths";

const LoginPage = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    isFormValid,
  } = useLoginForm();

  useEffect(() => {
    if (isLoggedIn) {
      const from = location.state?.from?.pathname || PATHS.MY_GIFTS;
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleEmailBlur();
    handlePasswordBlur();

    if (isFormValid) {
      const isEmailFormatValid = !emailError;
      const isPasswordLengthValid = password.length >= 8;

      const simulateLoginSuccess = isEmailFormatValid && isPasswordLengthValid;

      if (simulateLoginSuccess) {
        alert(`로그인 성공! 이메일: ${email}`);
        console.log("로그인 성공!");
        login(email ?? "");
      } else {
        alert(
          "로그인 실패: 이메일 형식을 확인하거나 비밀번호를 8자리 이상 입력해주세요."
        );
        console.log("로그인 실패: 테스트 조건 불충족.");
      }
    } else {
      console.log("유효성 검사 실패. 모든 필드를 올바르게 입력해주세요.");

      alert("입력 양식을 올바르게 작성해주세요.");
    }
  };

  if (isLoggedIn) {
    return null;
  }

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

export default LoginPage;
