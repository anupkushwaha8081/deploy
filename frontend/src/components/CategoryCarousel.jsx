// import React from "react";
// import { Button } from "./ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const CategoryCarousel = () => {
//   const category = [
//     "Frontend development",
//     "backend development",
//     "Data Science",
//     "Graphic Designer",
//     "FullStack developer",
//   ];
//   return (
//     <div>
//       <Carousel className="w-full max-w-xl mx-auto my-20">
//         <CarouselContent>
//           {category.map((cat, index) => {
//             return (
//                 <CarouselItem
//                 className="basis-1/2 flex justify-center" // Ensures two categories are shown per row
//                 key={index}
//               >
//                 <Button variant="outline" className="rounded-full">
//                   {cat}
//                 </Button>
                
//               </CarouselItem>
//             );
//           })}
//         </CarouselContent>
//         <CarouselPrevious className="bg-gray-200 " />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default CategoryCarousel;
import React from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";

const category = [
  "Frontend development",
  "Backend development",
  "Data Science",
  "Graphic Designer",
  "FullStack developer",
  "AI/ML developer",
  "Software Engineer"
];

const CategoryCarousel = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const searchJobHandler = (query)=>{
  dispatch(setSearchedQuery(query))
  navigate("/browse");
     }

  return (
    <div className="px-4">
      <Carousel className="w-full max-w-xl mx-auto my-10 sm:my-20  relative">
        <CarouselContent className="gap-2">
          {category.map((cat, index) => (
            <CarouselItem
              className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
              key={index}
            >
              <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200 absolute left-2 sm:left-[-2rem] md:left-[-3rem] top-1/2 transform -translate-y-1/2 flex" />
        <CarouselNext className="bg-gray-200 absolute right-2 sm:right-[-2rem] md:right-[-3rem] top-1/2 transform -translate-y-1/2 flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
