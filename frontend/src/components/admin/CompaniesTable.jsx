import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CompaniesTable = () => {
  const { companies = [], searchCompanyByText = "" } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(companies) || companies.length === 0) {
      setFilteredCompanies([]); // Ensure no undefined state
      return;
    }

    const filteredData = companies.filter((company) => {
      return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });

    setFilteredCompanies(filteredData);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No matching companies found
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    
                    <AvatarImage src={company?.logo}></AvatarImage>
                    
                  </Avatar>
                </TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{company.location}</TableCell>

                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/create/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};



// ye mai liklha hu
// export const CompaniesTable = () => {
//   const { companies = [] } = useSelector((store) => store.company);

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         {/* <TableBody>
//             {
//               companies?.map((company)=>(
//                 <tr key = {company._id}>
//                   <TableCell>
//             <Avatar>
//               <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOu3ya_bI8x6G8REm8A7OnQEHLIDtSdNK9mA&s"></AvatarImage>
//             </Avatar>
//           </TableCell>
//           <TableCell>{company.name}</TableCell>
//           <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//           <TableCell>
//             <Popover>
//               <PopoverTrigger>
//                 <MoreHorizontal />
//               </PopoverTrigger>
//               <PopoverContent className="w-32">
//                 <div
//                   onClick={() => navigate(`/admin/companies/${company._id}`)}
//                   className="flex items-center gap-2 w-fit cursor-pointer"
//                 >
//                   <Edit2 className="w-4" />
//                   <span>Edit</span>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </TableCell>
//           </tr>
//               ))
//             }
            
          
          
//         </TableBody> */}

// <TableBody>
//   {companies?.map((company) => (
//     <TableRow key={company._id}>
//       <TableCell>
//         <Avatar>
//           <AvatarImage src={company.logo || "https://via.placeholder.com/100"} />
//         </Avatar>
//       </TableCell>
//       <TableCell>{company.name}</TableCell>
//       <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//       <TableCell>
//         <Popover>
//           <PopoverTrigger>
//             <MoreHorizontal />
//           </PopoverTrigger>
//           <PopoverContent className="w-32">
//             <div
//               onClick={() => navigate(`/admin/companies/${company._id}`)}
//               className="flex items-center gap-2 w-fit cursor-pointer"
//             >
//               <Edit2 className="w-4" />
//               <span>Edit</span>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>


//       </Table>
//     </div>
//   );
// };


// export const CompaniesTable = () => {
//   const { companies,searchCompanyByText } = useSelector((store) => store.company);
//   const [filterCompany,setFilterCompany] = useState(companies);
// const navigate = useNavigate();
//   useEffect(()=>{
//     const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
//       if(!searchCompanyByText){
//         return true
//       };
//       return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
//     })
//     setFilterCompany(filteredCompany);
//   },[companies,searchCompanyByText])
  
//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
        
//           {companies.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">
//                 No company registered yet
//               </TableCell>
//             </TableRow>
//           ) : (
//             companies.map((company) => (
//               <TableRow key={company._id}>
//                 <TableCell>
//                   <Avatar>
//                   <AvatarImage src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOu3ya_bI8x6G8REm8A7OnQEHLIDtSdNK9mA&s" />

//                     {/* <AvatarImage src={company.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOu3ya_bI8x6G8REm8A7OnQEHLIDtSdNK9mA&s"} /> */}
//                   </Avatar>
//                 </TableCell>
//                 <TableCell>{company.companyName}</TableCell>
//                 <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//                 <TableCell>
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div
//                         onClick={() => navigate(`/admin/companies/${company._id}`)}
//                         className="flex items-center gap-2 w-fit cursor-pointer"
//                       >
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

