import { useAuth } from "../context/AuthContext";

const MyProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        내 프로필 페이지
      </h1>
      {user ? (
        <>
          <p className="text-lg mb-2 text-gray-700">
            환영합니다, <span className="font-semibold">{user.email}</span>님!
          </p>
          <p className="text-base mb-6 text-gray-600">
            이곳은 당신의 프로필 정보가 표시되는 공간입니다.
          </p>
        </>
      ) : (
        <p className="text-lg mb-6 text-gray-700">로그인 정보가 없습니다.</p>
      )}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-colors"
      >
        로그아웃
      </button>
      <p className="mt-4 text-sm text-gray-600">
        이 페이지는 로그인한 사용자만 접근할 수 있습니다.
      </p>
    </div>
  );
};

export default MyProfilePage;
