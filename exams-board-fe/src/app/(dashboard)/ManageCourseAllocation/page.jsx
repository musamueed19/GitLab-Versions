"use client"
import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import axios from "axios";
import { useState } from "react"

const columns = ["Course","Faculty", "Contribution", "Role"];
let records = [{
  Course: "CS001",
  Faculty: "Anam Naveed",
  Contribution:"Regular",
  Role: "Member"
  
}];
const actions = {
  actions: true,
  all: true,
};
let statusOptions = [1,2,3]

export default  function CourseAllocationPage() {
  const [selectedIds, setSelectedIds] = useState([]); 
  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };
  // let records = [];

  // try {
  //   const response = await fetch('http://192.168.50.219:3000/sections', {cache: 'no-store'}, { next: { tags: ['sections'] } });
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch sections');
  //   }
  //   const data = await response.json();
    

  //   records = data.map(item => ({
  //     section: item.section.title,
  //     coordinator: item.faculty.name,
  //     semester: item.semester.title,
  //     from: new Date(item.from_date).toISOString().split('T')[0],
  //     to: item.to_date === null ? "-" : new Date(item.to_date).toISOString().split('T')[0],
  //     id: item.id
  //   }));
  // } catch (error) {
  //   console.error('Error fetching sections:', error);
  //   records = []; 
  // }

  return (
    <div className="container">
      <TitleHeader title="Manage Course Allocation:"  />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="sectioncoordinator" />
          {/* <InputFields
            label="Semester Status"
            required={true}
            input="dropdown"
            name="status"
            options={statusOptions}
          /> */}
        </div>
        <div className="actionsGroup">
          <BulkDelete ids={selectedIds} label=" Course Allocation" path="managecourseallocationForm" />
          <FormModal title="Add" type="create" table="managecourseallocationForm" />
        </div>
      </div>
      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="managecourseallocationForm"
        label="Section Coordinator"
        count={5}
        onSelectedIdsChange={handleSelectedIdsChange}
      />
    {records.length > 0 && <Pagination />}
    </div>
  );
}

// const records = [
