import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setLoading } from "../../redux/authSlice";
import { RadioGroup } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utills/constant";

export default function SignUp() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const changeEventHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    // formData.append("profile", input.file);
    if (input.file) {
      formData.append("profile", input.file);
    }
    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json", // Important header
        // },
        headers: {
          "Content-Type": "multipart/form-data", // Do NOT use application/json
        },
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error or no response from server");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        onSubmit={submitHandler}
      >
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        <div className="mb-3">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandle}
            placeholder="Enter your Name"
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandle}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="Number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandle}
            placeholder="Enter your Phone Number"
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandle}
            placeholder="Enter your Password"
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center mb-3 gap-4">
          {/* Radio Group (Student & Recruiter) */}
          <RadioGroup
            value={input.role}
            onChange={changeEventHandle}
            className="flex  gap-2"
          >
            <div className="flex items-center space-x-2">
              <Input type="radio" name="role" value="Student" />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="radio" name="role" value="Recruiter" />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>

          {/* File Input (Profile Upload) */}
          <div className="w-full sm:w-auto">
            <Label htmlFor="profile">Profile</Label>
            <input
              id="profile"
              type="file"
              accept="image/*"
              className="cursor-pointer border border-gray-300 rounded p-2 w-full sm:w-[250px]"
              onChange={changeFileHandler}
            />
          </div>
        </div>

        <Button type="submit" className="w-full my-4">
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" />
              Please Wait ...
            </>
          ) : (
            "Sign Up"
          )}
          {/* "Signup" */}
        </Button>

        <span className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
