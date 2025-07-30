import React from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useAuthContext } from "@/hooks/useAuthContext";

const MainPage = () => {
  const location = useLocation();
  const url = location.pathname;
  return (
    <div className="h-full w-full bg-[url('./assets/money-tree.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-end h-full bg-black/30 pr-[15%]">
        <div className="flex flex-col p-8 bg-white rounded-2xl shadow-2xl w-full max-w-md items-center py-20">
          {/* Header and Tag Line */}
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-2xl font-bold mb-1">
              Welcome {url === "/" && "back"} to
              <Link to="/" className="text-3xl text-primary">
                {" "}
                ZenFunds
              </Link>
            </h1>
            <h2 className="text-base text-gray-600">
              Smart tools for Zen living.
            </h2>
          </div>
          {url === "/" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
