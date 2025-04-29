import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Navbar from "./components/Navbar";
import Message from "./pages/Messages/MessagePage";

function App() {
  return (
    <div>
      <div className="w-full bg-white px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
      </div>
      <div className=" bg-slate-100 px-1 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/message" element={<Message />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/*" element={<Authentication />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
