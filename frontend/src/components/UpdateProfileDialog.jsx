

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,DialogFooter
// } from "../components/ui/dialog";
// // import store from "redux/store";
// import { Button } from "./ui/button";
// import axios from "axios";

// import { useState } from "react";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "../components/ui/input"; // ✅ Import Input
// import { toast } from "sonner";
// // import { setUser } from "redux/authSlice";
// import { Loader2 } from "lucide-react";
// import {USER_API_END_POINT} from '../../utills/constant'

// import { useDispatch, useSelector } from "react-redux";


// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const {user}= useSelector(store=>store.auth)


//   const [input, setInput] = useState({
//     fullName: user?.fullName,
//     email: user?.email,
//     phoneNumber: user?.phoneNumber,
//     bio: user?.bio,
//     skills: user?.profile?.skills?.map(skill => skill) || [],
//     file: user?.profile?.resume, // Fixed typo here
//   });


//   const changeEventHandler =(e)=>{
//     setInput({...input,[e.target.name]:e.target.value})
//   }


//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
    
//     // Convert skills to a comma-separated string (if needed)
//     formData.append("skills", input.skills.join(",")); 
  
//     if (input.file) {
//       formData.append("file", input.file);
//     }
  
//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/profileUpdate`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });
  
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//     setOpen(false);
//   };
  
//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput((prev) => ({ ...prev, file }));
//   };
  
//   return (
//     <Dialog open={open} onOpenChange={setOpen}> {/* ✅ Controlled state */}
//       <DialogContent className="sm:max-w-[425px]"
//        onInteractOutside={()=>setOpen(false)}>
        
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle> {/* ✅ Fixed typo */}
//         </DialogHeader>
//         <form onSubmit={submitHandler}>

//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right font-semibold">
//                 Name:
//               </Label>
//               <Input id="name" name="fullName" onChange={changeEventHandler} value={input.fullName} placeholder="enter new name" className='col-span-3' /> {/* ✅ Fixed casing */}
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right font-semibold">
//                 Bio:
//               </Label>
//               <Input id="name" value={input.bio} onChange={changeEventHandler}  name="bio" placeholder="enter description" className='col-span-3' /> {/* ✅ Fixed casing */}
//             </div><div className="grid grid-cols-4 items-center gap-4 ">
//               <Label htmlFor="name" className="text-right font-semibold">
//                 email:
//               </Label>
//               <Input id="name" value={input.email} onChange={changeEventHandler}  name="email" placeholder="enter new email" className="col-span-3"  /> {/* ✅ Fixed casing */}
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right font-semibold">
//                Contact:
//               </Label>
//               <Input id="name" value={input.phoneNumber} onChange={changeEventHandler} name="phoneNumber" placeholder="enter new contact" className='col-span-3' /> {/* ✅ Fixed casing */}
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-right font-semibold">
//                Skills:
//               </Label>
//               <Input id="name" value={input.skills} onChange={changeEventHandler} name="skills" placeholder="enter new contact" className='col-span-3' /> {/* ✅ Fixed casing */}
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right font-semibold">Logo</Label>
//               <Input id="file" value={input.logo}  onChange={fileChangeHandler} name="logo" type="file" className="col-span-3"></Input>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right font-semibold">Resume</Label>
//               <Input id="file" value={input.file}  onChange={fileChangeHandler} name="file" type="file" className="col-span-3"></Input>
//             </div>
//             <DialogFooter >
//               {
//                 loading ? <Button className="w-full my-4"><Loader2/> Please wait</Button>:<Button >Update</Button>
//               }
//             </DialogFooter>
//           </div>
//         </form>
//         {/* <Button>Update</Button> */}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;




// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter
// } from "../components/ui/dialog";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "../components/ui/input";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { USER_API_END_POINT } from "../../utills/constant";
// import { useDispatch, useSelector } from "react-redux";
// // import { setUser } from "../"; // Ensure this is correctly imported
// import { setUser } from "../../redux/authSlice";
// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const { user } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.bio || "",
//     skills: user?.profile?.skills?.map(skill => skill) || [],
//     file: user?.profile?.resume || null,
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput((prev) => ({ ...prev, file }));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills.join(",")); 

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token"); // Get token from localStorage
//       console.log("tokenupdate",token)
//       console.log(localStorage.getItem("token"));


//       const res = await axios.post(`${USER_API_END_POINT}/profileUpdate`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`, // ✅ Added Authorization header
//         },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="fullName" className="text-right font-semibold">
//                 Name:
//               </Label>
//               <Input id="fullName" name="fullName" onChange={changeEventHandler} value={input.fullName} placeholder="Enter new name" className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-right font-semibold">
//                 Bio:
//               </Label>
//               <Input id="bio" name="bio" onChange={changeEventHandler} value={input.bio} placeholder="Enter description" className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right font-semibold">
//                 Email:
//               </Label>
//               <Input id="email" name="email" onChange={changeEventHandler} value={input.email} placeholder="Enter new email" className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="phoneNumber" className="text-right font-semibold">
//                 Contact:
//               </Label>
//               <Input id="phoneNumber" name="phoneNumber" onChange={changeEventHandler} value={input.phoneNumber} placeholder="Enter new contact" className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-right font-semibold">
//                 Skills:
//               </Label>
//               <Input id="skills" name="skills" onChange={changeEventHandler} value={input.skills} placeholder="Enter skills (comma-separated)" className="col-span-3" />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right font-semibold">Resume:</Label>
//               <Input id="file" name="file" type="file" onChange={fileChangeHandler} className="col-span-3" />
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   <Loader2 className="mr-2 animate-spin" /> Please wait
//                 </Button>
//               ) : (
//                 <Button type="submit">Update</Button>
//               )}
//             </DialogFooter>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;













// ye phle usee kiya gya tha 


// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "../components/ui/dialog";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "../components/ui/input";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { USER_API_END_POINT } from "../../utills/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../redux/authSlice"; // Ensure this import is correct

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     fullName: user?.fullName,
//     email: user?.email,
//     phoneNumber: user?.phoneNumber,
//     bio: user?.bio,
//     skills: user?.profile?.skills?.join(",") || "", // Convert array to string for input
//     file: user?.profile?.resume || "", // Use null for file input
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     // setInput((prev) => ({ ...prev, file }));
//     setInput({...input,file});

//   };

//   // const submitHandler = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData();
//   //   formData.append("fullName", input.fullName);
//   //   formData.append("email", input.email);
//   //   formData.append("phoneNumber", input.phoneNumber);
//   //   formData.append("bio", input.bio);
//   //   formData.append("skills", input.skills); // Send skills as a string

//   //   if (input.file) {
//   //     formData.append("file", input.file);
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     console.log(formData);
//   //     const res = await axios.post(`${USER_API_END_POINT}/profileUpdate`, formData, {
//   //       headers: {
//   //         // "Content-Type": "multipart/form-data", 
//   //         "Content-Type": "application/json", // Ensure correct Content-Type
//   //       },
//   //       withCredentials: true,
//   //     });

//   //     if (res.data.success) {
//   //       dispatch(setUser(res.data.user));
//   //       toast.success(res.data.message);
//   //     } else {
//   //       toast.error("An unexpected error occurred");
//   //     }
//   //   } catch (error) {
//   //     console.log("error",error);
//   //     toast.error(error.response?.data?.message || "Error updating profile");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   //   setOpen(false);
//   // };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills); // Ensure skills are a string
  
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     if (input.profilePhoto) {
//       formData.append("profilePhoto", input.profilePhoto);
      
//     }
  
//     // Log form data
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }
  
//     try {
//       setLoading(true);
  
//       const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Let Axios handle the boundary
//           // "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
  
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error.response?.data?.message || "Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//     setOpen(false);
//   };
  
//   // return (
//   //   <Dialog open={open} onOpenChange={setOpen}>
//   //     <DialogContent className="sm:max-w-a  rounded-md" onInteractOutside={() => setOpen(false)}>
//   //       <DialogHeader>
//   //         <DialogTitle>Update Profile</DialogTitle>
//   //       </DialogHeader>
//   //       <form onSubmit={submitHandler}>
//   //         <div className="grid gap-4 py-4">
//   //           <div className="grid grid-cols-4 items-center gap-4">
//   //             <Label htmlFor="name" className="text-right font-semibold">
//   //               Name:
//   //             </Label>
//   //             <Input
//   //               id="name"
//   //               name="fullName"
//   //               onChange={changeEventHandler}
//   //               value={input.fullName}
//   //               placeholder="Enter new name"
//   //               className="col-span-3"
//   //             />
//   //           </div>
//   //           <div className="grid grid-cols-4 items-center gap-4">
//   //             <Label htmlFor="bio" className="text-right font-semibold">
//   //               Bio:
//   //             </Label>
//   //             <Input
//   //               id="bio"
//   //               value={input.bio}
//   //               onChange={changeEventHandler}
//   //               name="bio"
//   //               placeholder="Enter description"
//   //               className="col-span-3"
//   //             />
//   //           </div>
//   //           <div className="grid grid-cols-4 items-center gap-4">
//   //             <Label htmlFor="email" className="text-right font-semibold">
//   //               Email:
//   //             </Label>
//   //             <Input
//   //               id="email"
//   //               value={input.email}
//   //               onChange={changeEventHandler}
//   //               name="email"
//   //               placeholder="Enter new email"
//   //               className="col-span-3"
//   //             />
//   //           </div>
//   //           <div className="grid grid-cols-4 items-center gap-4">
//   //             <Label htmlFor="phoneNumber" className="text-right font-semibold">
//   //               Contact:
//   //             </Label>
//   //             <Input
//   //               id="phoneNumber"
//   //               value={input.phoneNumber}
//   //               onChange={changeEventHandler}
//   //               name="phoneNumber"
//   //               placeholder="Enter new contact"
//   //               className="col-span-3"
//   //             />
//   //           </div>
//   //           <div className="grid grid-cols-4 items-center gap-4">
//   //             <Label htmlFor="skills" className="text-right font-semibold">
//   //               Skills:
//   //             </Label>
//   //             <Input
//   //               id="skills"
//   //               value={input.skills}
//   //               onChange={changeEventHandler}
//   //               name="skills"
//   //               placeholder="Enter skills (comma-separated)"
//   //               className="col-span-3"
//   //             />
//   //           </div>
//   //           <div className="grid grid-cols-4 items-center gap-4">
//   //             <Label htmlFor="file" className="text-right font-semibold">
//   //               Resume:
//   //             </Label>
//   //             <Input
//   //               id="file"
//   //               onChange={ fileChangeHandler }
//   //               name="file"
//   //               type="file"
//   //               className="col-span-3"
//   //             />
//   //           </div>
//   //           <DialogFooter>
//   //             {loading ? (
//   //               <Button className="w-full my-4" disabled>
//   //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//   //                 Please wait
//   //               </Button>
//   //             ) : (
//   //               <Button type="submit">Update</Button>
//   //             )}
//   //           </DialogFooter>
//   //         </div>
//   //       </form>
//   //     </DialogContent>
//   //   </Dialog>
//   // );
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent
//         className="sm:max-w-[425px] rounded-md p-4 sm:p-6"
//         onInteractOutside={() => setOpen(false)}
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right font-semibold">Name:</Label>
//               <Input
//                 id="name"
//                 name="fullName"
//                 onChange={changeEventHandler}
//                 value={input.fullName}
//                 placeholder="Enter new name"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-right font-semibold">Bio:</Label>
//               <Input
//                 id="bio"
//                 value={input.bio}
//                 onChange={changeEventHandler}
//                 name="bio"
//                 placeholder="Enter description"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right font-semibold">Email:</Label>
//               <Input
//                 id="email"
//                 value={input.email}
//                 onChange={changeEventHandler}
//                 name="email"
//                 placeholder="Enter new email"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="phoneNumber" className="text-right font-semibold">Contact:</Label>
//               <Input
//                 id="phoneNumber"
//                 value={input.phoneNumber}
//                 onChange={changeEventHandler}
//                 name="phoneNumber"
//                 placeholder="Enter new contact"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-right font-semibold">Skills:</Label>
//               <Input
//                 id="skills"
//                 value={input.skills}
//                 onChange={changeEventHandler}
//                 name="skills"
//                 placeholder="Enter skills (comma-separated)"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right font-semibold">Resume:</Label>
//               <Input
//                 id="file"
//                 onChange={fileChangeHandler}
//                 name="file"
//                 type="file"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right font-semibold">ProfilePhoto:</Label>
//               <Input
//                 id="profilePhoto"
//                 onChange={fileChangeHandler}
//                 name="profilePhoto"
//                 type="file"
//                 className="col-span-3"
//               />
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4" disabled>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </Button>
//               ) : (
//                 <Button type="submit">Update</Button>
//               )}
//             </DialogFooter>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
  
// };

// export default UpdateProfileDialog;

// 



import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "../../utills/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    resume: null,
    profilePhoto: null,
  });

  // Sync state with user data when modal opens
  useEffect(() => {
    if (user) {
      setInput({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        resume: null,
        profilePhoto: null,
      });
    }
  }, [user, open]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const { name, files } = e.target;
    setInput((prev) => ({ ...prev, [name]: files.length > 0 ? files[0] : null }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    if (input.fullName) formData.append("fullName", input.fullName);
    if (input.email) formData.append("email", input.email);
    if (input.phoneNumber) formData.append("phoneNumber", input.phoneNumber);
    if (input.bio) formData.append("bio", input.bio);
    if (input.skills) formData.append("skills", input.skills);
  
    if (input.resume) {
      formData.append("resume", input.resume);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
  
    try {
      setLoading(true);
  
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { id: "name", label: "Name", name: "fullName", type: "text", placeholder: "Enter new name" },
              { id: "bio", label: "Bio", name: "bio", type: "text", placeholder: "Enter description" },
              { id: "email", label: "Email", name: "email", type: "email", placeholder: "Enter new email" },
              { id: "phoneNumber", label: "Contact", name: "phoneNumber", type: "text", placeholder: "Enter new contact" },
              { id: "skills", label: "Skills", name: "skills", type: "text", placeholder: "Enter skills (comma-separated)" },
            ].map(({ id, label, name, type, placeholder }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right font-semibold">{label}:</Label>
                <Input id={id} name={name} type={type} value={input[name]} onChange={changeEventHandler} placeholder={placeholder} className="col-span-3" />
              </div>
            ))}

            {[
              { id: "resume", label: "Resume", name: "resume" },
              { id: "profilePhoto", label: "Profile Photo", name: "profilePhoto" },
            ].map(({ id, label, name }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right font-semibold">{label}:</Label>
                <Input id={id} name={name} type="file" onChange={fileChangeHandler} className="col-span-3" />
              </div>
            ))}

            <DialogFooter>
              <Button type="submit" className="w-full my-4" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
