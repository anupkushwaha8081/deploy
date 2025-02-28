// import React, { useEffect } from 'react'
// import ApplicantsTable from '../../components/admin/ApplicantsTable'
// import axios from 'axios'
// import { Application_API_END_POINT } from '../../../utills/constant'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { setAllApplicants } from '../../../redux/applicationSlice'

// const Applicants = () => {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const {applicants} = useSelector(store=>store.application)
//   useEffect(()=>{
//     const fetchApplicants = async () =>{
//       try{
//    const res = await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
//    console.log(res.data)
//    if(res.data.success){
// dispatch(setAllApplicants(res.data.job))
//    }
//       }catch(error){
//         console.log(error);
        
//       }
//     }
//     fetchApplicants()
//   },[])
//   return (
//     <div>
//       <div className='max-w-6xl mx-auto'>
//         <h1 className='font-bold text-xl my-5'>Applicants {applicants.applications.length}</h1>
//         <ApplicantsTable/>
//       </div>
//     </div>
//   )
// }

// export default Applicants



import React, { useEffect } from 'react';
import ApplicantsTable from '../../components/admin/ApplicantsTable';
import axios from 'axios';
import { Application_API_END_POINT } from '../../../utills/constant';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAllApplicants } from '../../../redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);
  // console.log(applicants)

  // useEffect(() => {
  //   const fetchApplicants = async () => {
  //     try {
  //       const res = await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
  //       console.log(res.data);
  //       if (res.data.success) {
  //         console.log("i worked")
  //         dispatch(setAllApplicants(res.data.job));
  //         console.log("Dispatched Data:", res.data.job);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchApplicants();
  // }, [params.id, dispatch]);
  // useEffect(() => {
  //   const fetchApplicants = async () => {
  //     try {
  //       const res = await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
  //       console.log("Full API Response:", res.data);
        
  //       if (res.data.success) {
  //         console.log("Expected Applicants Data:", res.data.applicants);
  //         dispatch(setAllApplicants(res.data.applicants)); // Use correct key
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchApplicants();
  // }, [params.id, dispatch]);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        // console.log("Full API Response:", res.data);
        
        if (res.data.success) {
          // console.log("Expected Applicants Data:", res.data.data);  // Correct key
          dispatch(setAllApplicants(res.data.data));  // Use correct key
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [params.id, dispatch]);
  
  return (
    <div>
      <div className="max-w-6xl mx-auto my-10 px-6 md:px-12">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable applicants={applicants?.applications || []} />
      </div>
    </div>
  );
};

export default Applicants;
