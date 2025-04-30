import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import Message from "./pages/Messages/MessagePage";
import CreatePost from "./components/Post/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, []);
  return (
    <div>
      <div className="w-full bg-white px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
      </div>
      <div className=" bg-slate-100 px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Routes>
          <Route
            path="/*"
            element={auth.user ? <HomePage /> : <Authentication />}
          />
          <Route path="/message" element={<Message />} />
          <Route path="profile/:id" element={<ProfilePage />} />

          <Route path="/*" element={<Authentication />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
