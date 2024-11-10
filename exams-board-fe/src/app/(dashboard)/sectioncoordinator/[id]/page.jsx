// "use client"
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import CourseAllocationForm from "@/components/Forms/CourseAllocationForm";
import React from "react";

const records = [];
const columns = [];
const actions = {
  actions: true,
  update: true,
  view: true,
  delete: true,
  all: true,
};

export default async function CourseAllocation({ params, searchParams }) {
  console.log(params);
  const { id } = await params;
  const {type} = await searchParams || null;

  if (!id) {
    return <p>Invalid semester ID.</p>;
  }

  return (
    <div className="container">
      <div>
        <CourseAllocationForm type={type} id={id}/>
      </div>

      <div className="container">
        {/* <Table
          columns={columns}
          records={records}
          actions={actions}
          table="sectioncoordinator"
          label="Section Coordinator"
          count={5}
        /> */}
        
      </div>
    </div>
  );
}
