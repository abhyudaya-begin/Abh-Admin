import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {setUser} from "../Redux/UserSlice";
import toast from "react-hot-toast";
import {
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  University,
  User,
  Lock,
  Eye,
  EyeOff,
  Check,
  Rocket,
} from "lucide-react";
import Otp from "./Otp";
import { useRef } from "react";

import Abhyudaya from "../../assets/Logo-images/Abhyudaya.png";
import { useDispatch } from "react-redux";

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(30, "Name must be at most 30 characters"),

  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  year: z.string().nonempty("Year is required"),
  rollNumber: z
    .string()
    .nonempty("Roll Number is required")
    .min(10, "Roll Numner must be of 10 characters")
    .max(10, "Roll Numner must be of 10 characters"),
});

function SignUpForm({ setIsSignUp }) {
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [verified, setVerified] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [clickedForEmail, setClickedForEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });
  const fullName = watch("fullName", "");

  const onSubmit = async (data) => {
    try {
      setClicked(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}admin/user`,
        data,
        {
          withCredentials: true,
        }
      );

      dispatch(setUser(res.data.data.user));
      
      toast.success(`Welcome ${fullName}`);
    
    } catch (error) {
      console.log(error);
      toast.error("Sign up Failed");
    } finally {
      setClicked(false);
    }
  };

  const handleFormError = (errors) => {
    // Display the first error as a toast message
    const errorValues = Object.values(errors);
    if (errorValues.length > 0) {
      toast.error(errorValues[0].message);
    }
    return false;
  };

  const sendMail = async () => {
    try {
      setClickedForEmail(true);
      if (!fullName) {
        toast.error("Please enter your full Name first");
        return;
      }
    

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}admin/send-email`,
        { fullName },
        {
          withCredentials: true,
        }
      );
      if (res.status) {
        setIsOTPOpen(true);
        toast.success("OTP sent successfully");
      }
    } catch (err) {
      console.log(err)
    
        toast.error("Server down !!");
    }
    finally{
      setClickedForEmail(false)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, handleFormError)}
      className="space-y-4"
    >
      <div className="space-y-1">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div
            className={`relative w-full flex rounded-lg ${
              verified &&
              "bg-gradient-to-r from-transparent to-green-500/80 opacity-75"
            } `}
          >
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <div className="group flex w-full pl-10 pr-3 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white focus-within:ring-2 focus-within:ring-pink-400">
              <input
                {...register("email")}
                type="email"
                defaultValue={"Admin email"}
                placeholder="Admin Email"
                disabled={true}
                className={`text-white w-full placeholder:text-white/60 rounded-lg focus:outline-none bg-transparent disabled:bg-transparent hover:bg-transparent `}
              />
              <button
                type="button"
                onClick={sendMail}
                disabled={verified}
                className={`ml-auto px-4 py-2 rounded-lg transition ${
                  verified
                    ? "text-white cursor-default"
                    : "hover:text-gray-800 cursor-pointer text-gray-300"
                }`}
              >
                {verified ? <Check size={25} color="white" /> : "Permission?"}
              </button>
            </div>
          </div>
        </div>
        {isOTPOpen && (
          <Otp
            props={{ fullName, setVerified }}
            onClose={() => setIsOTPOpen(false)}
          />
        )}
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        <input
          {...register("phoneNumber")}
          placeholder="Phone Number"
          className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        <input
          type="number"
          {...register("year")}
          placeholder="Year - 1, 2,3, 4"
          className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="relative">
        <Rocket className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        <input
          type="number"
          {...register("rollNumber")}
          placeholder="Roll Number"
          className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <button
        type="submit"
        disabled={!verified || clicked}
        className={`cursor-pointer w-full p-2 rounded-lg text-white transition-all 
        ${
          verified
            ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
