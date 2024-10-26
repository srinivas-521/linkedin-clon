import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";
import NetworkPage from "./pages/NetworkPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
function App() {
  const { data: authUser, isError, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null; // Unauthorized
        }
        toast.error(err.response.data.message || "You are not authenticated");
      }
    },
    retry: false,
  });
  if (isLoading) return null;

  // Debug logs
  //console.log("authUser", authUser);

  // Prevent rendering while loading
 

  return (
    <Layout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signUp' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to="/login" />} />
        <Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to="/login" />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
