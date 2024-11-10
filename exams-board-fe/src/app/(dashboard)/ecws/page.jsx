"use client";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import TitleHeader from "@/components/common/TitleHeader";
import Table from "@/components/common/Table";
import axios from "axios";
import { getSemesterTitle } from "@/components/Fetcher/getSemester";
import Searchbar from "@/components/common/Searchbar";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";

export default function ExamStrength() {
  const actions = {
    actions: "true",
    all: "true",
  };

  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };
  const columns = ["Semester", "Course", "Exam Type", "Students", "Exam Date"];
  // {  "id":"CS201P",  "title":"course454",  "student_enrollment":7,  "type":"Regular"}
  useEffect(() => {
    const fetchExamStrength = async () => {
      try {
        const response = await axios.get(
          "http://192.168.50.219:3000/exam-day-course-wise-strengths"
        );
        const formattedRecords = response.data.map((item) => ({
          semester: item.semesterId,
          course: item.courseId,
          exam: item.exam,
          num_of_students: item.num_of_students,
          date: new Date(item.date).toISOString().split("T")[0],
        }));
        setRecords(formattedRecords);
        console.log(records);
      } catch (error) {
        console.log("Error fetching Exam Strength:", error);
      }
    };
    fetchExamStrength();
  }, [records]);
  return (
    <div className="container">
      <TitleHeader title="Exam Course Wise Strength Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="semesters" />
        </div>
        <div className="actionsGroup">
          <BulkDelete ids={selectedIds} label="ecws" path="ecws" />
          <FormModal title="Add" type="create" table="ecws" />
        </div>
      </div>
      <Table
        columns={columns}
        actions={actions}
        records={records}
        table="ecws"
        count={columns.length}
        label="ECWS"
        onSelectedIdsChange={handleSelectedIdsChange}
      />

      <Pagination />
    </div>
  );
}

{
  /* <table>
      <thead>
        <tr>
          <td>Sr. #</td>
          <td>Exam ID</td>
          <td>Faculty</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          <tr>
          records.map(record =>  (
            <td>
              
            </td>
          ))
            </tr>
        }
      </tbody>
  </table> */
}
