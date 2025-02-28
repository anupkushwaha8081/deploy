import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { Application_API_END_POINT } from "../../../utills/constant";

const shortListingStatus = ["Accepted", "Rejected"];
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(
        `${Application_API_END_POINT}/status/${id}/update`,
        { status }
      );
      

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
               
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="text-blue-600">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener norefrence"
                    >
                      {" "}
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody> */}
        <TableBody>
  {applicants &&
    applicants?.applications?.map((item) => (
      <TableRow key={item._id}> {/* ✅ Fix: Add key here */}
        <TableCell>{item?.applicant?.fullName}</TableCell>
        <TableCell>{item?.applicant?.email}</TableCell>
        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
        <TableCell className="text-blue-600">
          {item.applicant?.profile?.resume ? (
            <a
              className="text-blue-600 cursor-pointer"
              href={item?.applicant?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item?.applicant?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </TableCell>
        <TableCell>{item?.applicant?.createdAt}</TableCell>
        <TableCell className=" cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              {shortListingStatus.map((status, index) => (
                <div
                  key={`${item._id}-${status}`} // ✅ Fix: Ensure unique key
                  onClick={() => statusHandler(status, item._id)}
                  className="flex w-fit items-center my-2 cursor-pointer"
                >
                  <span>{status}</span>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

      </Table>
    </div>
  );
}
export default ApplicantsTable;
