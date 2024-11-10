"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import { useRouter } from "next/navigation";
import setId from "./IdExtractorFromOptions";
import InputFields from "../common/InputFields";
import CourseAllocationPage from "@/app/(dashboard)/ManageCourseAllocation/page";
import ManageCourseallocationForm from "./ManageCourseAllocationForm";
import ManageCourseAllocationForm from "./ManageCourseAllocationForm";

let records = [{ semester: "summer 2024", section: "Core Courses" }];

export default function CourseAllocationForm({ type, id, data = ""  }) {
  const [facultyOptions, setfacultyOptions] = useState([]);
  const [formData, setFormData] = useState({
    coordinator: data?.coordinator || "",})

  const router = useRouter();
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const [records, setRecords] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://192.168.50.219:3000/sections/addSection");
  //       setRecords(
  //         response.data.activeSemester.map((item) => ({
  //           id: item.id,
  //           value: item.title,
  //           start_date: item.start_date,
  //           end_date: item.end_date,
  //         }))
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(()=>{ axios
    .get("http://192.168.50.219:3000/sections/addSection")
    .then((response) => {
      // console.log(response);
  
      setfacultyOptions(
        response.data.facultyDetails.map((item) => ({
          id : item.id,
          value: item.name,
        }))
      );})},[])
  
      
     
        useEffect(() => {
          setId(formData.coordinator,setfacultyOptions, facultyOptions);
        
        }, [formData.coordinator]);
  const handleSubmit = async (event) => {
    event.preventDefault();}

    // const handleChange = (name, value) => {
    //   setFormData((prev) => ({ ...prev, [name]: value }));
    // };
    function handleCancel(event) {
      event.preventDefault();
      router.push(`/sectioncoordinator`);
    }

  return (
    <div onSubmit={handleSubmit}>
    {type === "view" ? (
      records.map((record, index) => (
        <div className="flex flex-col gap-8 w-full py-6" key={index}>
          <div className="flex flex-col gap-5 items-center">
         <div className="flex gap-5">
          <h1 className="font-medium ">Semester :</h1>
         <p>{record.semester}</p>
         <h1 className="font-medium">Section :</h1>
         <p>{record.section}</p></div>
         <div className="flex gap-5">
         <h1 className="font-medium">Coordinator :</h1>
         <p>{record.semester}</p></div>
         </div>
             <div className="flex items-center gap-8 justify-center w-[90%]">
            <Btns type="primary" title="Close" onClick={handleCancel} />
        
          </div>
        </div>
      ))
    ) : type === "update" ? (
      records.map((record, index) => (
        <div className="flex flex-col gap-8 w-full py-6" key={index}>
          <div className="grid grid-cols-2 gap-5">
          
          <h1 className="font-medium ">Semester :</h1>
         <p>{record.semester}</p>
         <h1 className="font-medium">Section :</h1>
         <p>{record.section}</p>
         <div className="flex"> <InputFields
          label="Section Coordinator"
          input="dropdown"
          name="sectioncoordinatorTitle"
          options= {facultyOptions}
          inline={true}
          onChange={handleChange}
        /></div>
          </div>
          <div className="flex items-center gap-8 justify-end w-[90%]">
            <Btns type="primary" title="Cancel" onClick={handleCancel} />
            <Btns type="secondary" title="Update" btnType="submit" />
          </div>
        </div>
      ))
    ) : null}
    <CourseAllocationPage />
  </div>
  
  
  );
}
