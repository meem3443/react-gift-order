import { useAuth } from "../context/AuthContext";

const SelectFriends = () => {
  const { isLoggedIn, user } = useAuth();

  const displayMessage =
    isLoggedIn && user
      ? `${user.email.split("@")[0]}님, 선물할 친구를 골라주세요.`
      : "로그인해주세요.";

  return (
    <section className="mb-8 p-4 bg-white rounded-lg shadow-sm flex items-center cursor-pointer hover:bg-gray-50">
      <span className="text-2xl font-bold text-blue-500 mr-3">+</span>
      <span className="text-lg font-semibold text-gray-700">
        {displayMessage}
      </span>
    </section>
  );
};

export default SelectFriends;
