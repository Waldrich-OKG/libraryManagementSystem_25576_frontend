import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      await axios.post("http://localhost:8080/auth/login", { email, password });
      setOtpSent(true);
      toast.info("Check your email for OTP 📧");
    }catch(err){
      console.log("Login failed",err);
      toast.error("Invalid email or password ❌");
    }
  };

  const handleVerifyOtp = async () => {
    try{
      const res = await axios.post("http://localhost:8080/auth/verify-otp", null, {
        params: { email, otp }
      });
      login(res.data.accessToken, res.data.refreshToken);
      const decoded = jwtDecode(res.data.accessToken);
      if (decoded.role === "LIBRARIAN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
      toast.success("OTP verified successfully! 🎉");

    }catch(err){
      console.log("OTP verification failed",err);
      toast.error("Invalid OTP or session expired ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {!otpSent ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              placeholder="OTP"
              className="w-full p-2 border mb-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}