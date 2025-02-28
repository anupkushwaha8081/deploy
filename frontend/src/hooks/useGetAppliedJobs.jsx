import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Application_API_END_POINT } from "../../utills/constant";
import { setAllAppliedJobs } from "../../redux/jobSlice";
const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${Application_API_END_POINT}/getAppliedJobs`, {
          withCredentials: true,
        });
        console.log("data :",res.data);

        if (res.data.success) {
            console.log(" worked")
          // dispatch(setAllAppliedJobs(res.data.application));
          dispatch(setAllAppliedJobs(res.data.data));


        //   dispatch(setAllAppliedJobs(res.data.application));
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};
export default useGetAppliedJobs;
