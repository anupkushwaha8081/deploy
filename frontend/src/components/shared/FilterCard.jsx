import React from "react";
import { RadioGroup } from "@radix-ui/react-radio-group";
// import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../../redux/jobSlice";
import { useEffect, useState } from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "pune", "Gorakhpur", "mumbai", "Noida"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend development",
      "backend development",
      "Data Science",
      "Graphic Designer",
      "FullStack developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5 lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue,setSelectedValue] = useState("");
   const dispatch = useDispatch();
    const changeHandler = (value) =>{
        setSelectedValue(value)
    }
    useEffect(()=>{
     dispatch(setSearchedQuery(selectedValue));
        
    },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 border-t-2 border-gray-600 " />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {

          return (
          <div className="" key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
           const itemId = `id${index}-${idx}`

              return (
                <div className="flex items-center gap-2 space-x-2 my-2" key={index}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
           
          </div> )
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
