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

        {/* <div className=" flex items-center mb-3">
          

          <RadioGroup
            value={input.role} // This binds the radio group to input.role, so the selected radio button is controlled by state
            onChange={changeEventHandle} // Update the role when the radio button is changed
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="Student" // This is the value for the student option
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="Recruiter" // This is the value for the recruiter option
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>

          <div className="pl-4">
            <Label htmlFor="profile">Profile</Label>
            <input
              id="profile"
              type="file"
              accept="image/*"
              className="cursor-pointer border border-gray-300 rounded p-2"
              onChange={changeFileHandler}
            />
          </div>
        </div> */}
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

// import React, { useState } from "react";
// // import Navbar from "../shared/Navbar";
// import { Label } from "../../src/components/ui/label";
// import { Input } from "../../src/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "../../src/components/ui/radio-group";
// import { Button } from "../../src/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_END_POINT } from "../../utills/constant";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/authSlice";

// const Signup = () => {
//   const [input, setInput] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });
//   const {loading,user} = useSelector(store=>store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//     const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });

//   };
//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };
//   const submitHandler = async(e)=>{
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName",input.fullName)
//     formData.append("email",input.email)
//     formData.append("phoneNumber",input.phoneNumber)
//     formData.append("password",input.password)
//     formData.append("role",input.role)
// if(input.file){
//   formData.append("file",input.file)
// }
//     try{
//       dispatch(setLoading(true))
//       const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
//         headers:{
//           "Content-Type":"multipart/form-data"
//         },
//         withCredentials:true
//       });
//       if(res.data.success){
//         navigate("/login");
//         toast.success(res.data.message)
//       }
//     }catch(error){
//   console.log(error);
//   toast.error(error.response.data.message)

//     }finally{
//       dispatch(setLoading(false))
//     }

//   }
//    useEffect(()=>{
//       if(user){
//         navigate("/")
//       }
//     })
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Sign Up</h1>
//           <div>
//             <Label>FullName</Label>
//             <Input
//               type="text"
//               value={input.fullName}
//               name="fullName"
//               onChange={changeEventHandler}
//               placeholder="Aanchal mittal"
//             />
//           </div>
//           <div>
//             <Label>Email</Label>
//             <Input type="email" value={input.email} name="email"
//               onChange={changeEventHandler} placeholder="aanchalmittal123@gmail.com" />
//           </div>
//           <div>
//             <Label>Phone Number</Label>
//             <Input type="text" name="phoneNumber" value={input.phoneNumber}
//               onChange={changeEventHandler} placeholder="999999999" />
//           </div>
//           <div>
//             <Label>Password</Label>
//             <Input type="password" value={input.password} name="password"
//               onChange={changeEventHandler} placeholder="Enter password" />
//           </div>
//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-5">
//               <div className="flex items-center space-x-2">
//                 <Input
//                 type="radio"
//                 name="role"
//                 value="student"
//                 checked={input.role === "student"}
//                 onChange={changeEventHandler}
//                 className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//               <Input
//                 type="radio"
//                 name="role"
//                 value="recruiter"
//                 checked={input.role === "recruiter"}
//                 onChange={changeEventHandler}
//                 className="cursor-pointer"
//                 />
//                 <Label htmlFor="rr">Recruiter</Label>
//               </div>
//             </RadioGroup>
//             <div className="flex items-center gap-2">
//               <Label>Profile</Label>
//               <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
//             </div>
//           </div>
//           {
//             loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button>: <Button type="submit" className="w-full my-4">Signup</Button>
//           }
//           <span className="text-sm">
//             Already have an Account ?{" "}
//             <Link to="/login" className="text-blue-600 text-sm">
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
