import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RankingPage from "./pages/RankingPage";
import MyGiftPage from "./pages/MyGiftPage";
import LoginPage from "./pages/LoginPage";
import GiftOrderPage from "./pages/GiftOrderPage";
import ProfilePage from "./pages/MyProfilePage";
import { PATHS } from "./constants/paths";

import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 pb-20 font-sans max-w-screen-md justify-center mx-auto">
          <Header />
          <nav className="bg-white shadow-md py-3 px-4 flex justify-center space-x-6 text-gray-700 border-b border-gray-200">
            <Link
              to={PATHS.HOME}
              className="hover:text-blue-600 font-semibold text-lg py-1 px-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              홈
            </Link>
            <Link
              to={PATHS.RANKING}
              className="hover:text-blue-600 font-semibold text-lg py-1 px-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              랭킹
            </Link>

            <Link
              to={PATHS.MY_GIFTS}
              className="hover:text-blue-600 font-semibold text-lg py-1 px-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              내 선물함
            </Link>
          </nav>
          <main>
            <Routes>
              <Route path={PATHS.HOME} element={<HomePage />} />
              <Route path={PATHS.RANKING} element={<RankingPage />} />
              <Route path={PATHS.LOGIN} element={<LoginPage />} />
              <Route path={PATHS.ORDER} element={<GiftOrderPage />} />

              <Route
                path={PATHS.MY_GIFTS}
                element={
                  <AuthGuard>
                    <MyGiftPage />
                  </AuthGuard>
                }
              />

              <Route
                path={PATHS.PROFILE}
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />

              <Route
                path={PATHS.NOT_FOUND}
                element={
                  <div className="container mx-auto py-10 text-center text-xl font-bold text-gray-700">
                    404 - 페이지를 찾을 수 없습니다!
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
