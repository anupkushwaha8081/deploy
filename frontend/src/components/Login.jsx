
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "../../utills/constant";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "../../redux/authSlice";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);

  const changeEventHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Login unsuccessful. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-xl border border-gray-200 rounded-md p-6 shadow-md bg-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandle}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded p-2 mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandle}
            placeholder="Enter your Password"
            className="w-full border border-gray-300 rounded p-2 mt-1"
            required
          />
        </div>

        {/* Student and Recruiter in Column Layout */}
        <div className="flex flex-row gap-5 mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="Student"
              checked={input.role === "Student"}
              onChange={changeEventHandle}
              className="cursor-pointer"
              required
            />
            <span>Student</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="Recruiter"
              checked={input.role === "Recruiter"}
              onChange={changeEventHandle}
              className="cursor-pointer"
              required
            />
            <span>Recruiter</span>
          </label>
        </div>

        <Button type="submit" className="w-full my-4" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please Wait...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
