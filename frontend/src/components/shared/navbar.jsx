
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { USER_API_END_POINT } from "../../../utills/constant";
import { LogOut, User2, Menu } from "lucide-react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500">
      <nav className="w-[90%] mx-auto shadow-sm px-6 md:px-10 h-16 flex items-center justify-between relative">
        <div className="ml-10 text-2xl font-bold">
          Job<span className="text-red-600">Portal</span>
        </div>
        
        <div className="hidden md:flex items-center gap-5 mr-12">
          <ul className="flex font-medium gap-8">
            {user && user.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>
          {!user ? (
            <>
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button variant="outline" className="bg-purple-500 hover:bg-purple-700">SignUp</Button></Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="absolute right-0 top-8 w-48 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col p-4 gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  {user.role === "Student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer" onClick={logoutHandler}>
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
  <Menu size={24} />
</button>

{isMenuOpen && (
  <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-5 gap-5 md:hidden z-50">
    {/* Show Links Based on User Role */}
    {user?.role === "Recruiter" ? (
      <>
        <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-blue-500">
          Company
        </Link>
        <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-blue-500">
          Jobs
        </Link>
      </>
    ) : (
      <>
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-blue-500">
          Home
        </Link>
        <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-blue-500">
          Jobs
        </Link>
        <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-blue-500">
          Browse
        </Link>
      </>
    )}

    {!user ? (
      <>
        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
          <Button variant="outline" className="w-full">Login</Button>
        </Link>
        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
          <Button variant="outline" className="bg-purple-500 hover:bg-purple-700 w-full">
            SignUp
          </Button>
        </Link>
      </>
    ) : (
      <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-md shadow-md w-full">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.profile?.profilePhoto} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h4 className="font-semibold text-lg">{user?.fullName}</h4>
        <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
        
        {user.role === "Student" && (
          <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
        )}

        <Button variant="outline" className="w-full" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    )}
  </div>
)}


      </nav>
    </div>
  );
};

export default Navbar;
