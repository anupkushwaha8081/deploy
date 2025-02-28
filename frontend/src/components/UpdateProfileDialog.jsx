



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
