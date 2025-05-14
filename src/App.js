import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import Message from "./pages/Messages/MessagePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full bg-white px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64 sticky top-0 z-50 shadow">
        <Navbar />
      </div>

      <div className="bg-slate-100 px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Routes>
          <Route
            path="/"
            element={
              auth.user ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/home"
            element={auth.user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:id"
            element={auth.user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/message"
            element={auth.user ? <Message /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!auth.user ? <Authentication page="login" /> : <Navigate to="/home" />}
          />
          <Route
            path="/register"
            element={!auth.user ? <Authentication page="register" /> : <Navigate to="/home" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;