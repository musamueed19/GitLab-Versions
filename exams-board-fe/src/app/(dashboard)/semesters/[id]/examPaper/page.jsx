"use client"
import Pagination from "@/components/common/Pagination";

import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import { useState } from "react";

export default function ExamPaper({semester}) {

  let records = [];
  console.log(semester.semester.title);
  const [selectedIds, setSelectedIds] = useState([]); 
  const columns = ["Exam Type", "Marks", "No. of Questions", "Course Type"];

  const actions =
    semester.type === "update"
      ? { actions: true,
        update: true,
        view: false,
        delete: true,
        all: false, }
      : { actions: false, all: false};

      
    records = semester.examPaper.map(item => ({
      examType: item.exam_type,
      marks: item.question_marks,
      quantity: item.question_quantity,
      courseType: item.courseType,
      id: item.id,

    }));

    const handleSelectedIdsChange = (ids) => {
      setSelectedIds(ids);
    };
  

  // Fetch data from the backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`http://localhost:3000/examType/${semester.id}`);
  //       console.log(response);
  //       setRecords(response.data); 
  //     } catch (err) {
  //       setError(err.message || "An error occurred while fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, [semester]);
  
  // if (loading) return <Loading></Loading>; 
  // if (error) return <p>{error}</p>; 

  return (
    <div className="container">
      <TitleHeader
        fontSize="xl"
        alignment="start"
        margin="ml-8"
        title="Manage Exam Paper Settings"
      />
      <Table
        columns={columns}
        records={records} 
        actions={actions}
        table="examType"
        count={4} 
        label={"Exam Type"}
        semester={semester.semester}
        onSelectedIdsChange={handleSelectedIdsChange}
      />
      {semester.examPaper.length > 0 && <Pagination />}
    </div>
  );
}
