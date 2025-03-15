import { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya.png";

function AuthForm() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-400 to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <img src={Abhyudaya} alt="Abhyudaya" className="h-8 w-auto" />
          </div>

          <h1 className="text-2xl font-bold text-white text-center">
            {"LOG IN"}
          </h1>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
