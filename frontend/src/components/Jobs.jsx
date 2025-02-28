

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./shared/FilterCard";
import Job from "./Job";
import { Menu, X } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false); // Toggle filter for small screens

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) =>
        [job.title, job.description, job.location].some((field) =>
          field.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-6xl mx-auto mt-5 px-4 relative">
      <div className="flex gap-5 items-start">
        {/* Filter Toggle Button (Small Screens) */}
        <button
          className="md:hidden flex items-center gap-2 text-lg font-semibold bg-gray-200 px-4 py-2 rounded-md"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Menu size={20} />
          Filter
        </button>

        {/* Small Screen Filter Popup */}
        {showFilter && (
          <div className="absolute top-0 left-0 w-60 bg-white shadow-lg rounded-md p-4 border z-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Filter</h3>
              <button onClick={() => setShowFilter(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterCard />
          </div>
        )}

        {/* Filter Section (Medium & Large Screens) */}
        <div className="hidden md:block md:w-1/4 lg:w-1/4 border p-4 bg-white shadow-sm rounded-md">
          <FilterCard />
        </div>

        {/* Job Listings */}
        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
          {filterJobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <div key={job?._id}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
