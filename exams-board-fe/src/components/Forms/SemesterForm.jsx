"use client";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';



const statusOptions = [
  { value: "Active", name: "Active" },
  { value: "InActive", name: "InActive" },
];

export default function SemesterForm({setRefresh, type, data, setOpen }) {
  const router = useRouter();
  console.log(setRefresh);
  console.log(data);
  const [formData, setFormData] = useState({
    semesterName: data?.title || "",
    status: data?.status || "",
    startDate: data?.start_date || "",
    endDate: data?.end_date || "",
    midStartDate: data?.mid_start_date || "",
    midEndDate: data?.mid_end_date || "",
    finalStartDate: data?.final_start_date || "",
    finalEndDate: data?.final_end_date || "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setOpen(false);

  };

  const handleDelete = async () => {
    if (!data?.id) {
      console.error('No ID provided for deletion');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/semesters?id=${data.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`${data.title} deleted successfully`);
        
        setRefresh(); 
        router.refresh('/semesters');
      } else {
        console.error('Failed to delete', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting', error);
    }
    setOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      title: capitalizeFirstLetter(formData.semesterName),
      start_date: formData.startDate,
      end_date: formData.endDate,
      mid_term_date: formData.midStartDate,
      mid_term_end_date: formData.midEndDate,
      final_term_date: formData.finalStartDate,
      final_term_end_date: formData.finalEndDate,
      is_Active: formData.status === "Active" ? true : false,
    };

    try {
      const response = await fetch('http://localhost:3000/semesters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();
      if (response.ok) {
        setRefresh();  

        router.refresh('/semesters')
      } else {
        console.error('Failed to create semester', response.statusText, responseData);
      }
    } catch (error) {
      console.error('Error creating semester', error);
    }
    setOpen(false);
  };

  if (type === "update" || type === "view") {
    useEffect(() => {
      router.push(`/semesters/${data.id}?type=${type}`);

    }, [type, data.id, router]);
  }



  return (

    <div className="w-full" >
      {type === "create" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full p-8 bg-white rounded-lg shadow-lg">
        <TitleHeader fontSize="2xl" title="Add New Semester" className="text-center font-semibold" />
        
        {/* Main Container */}
        <div className="flex flex-col gap-6 w-full">
          {/* Semester Name and Status */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <InputFields
                label="Semester Name"
                name="semesterName"
                placeholder="Enter the semester"
                value={formData.semesterName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="w-1/2">
              <InputFields
                label="Semester Status"
                required={true}
                input="dropdown"
                name="status"
                options={statusOptions}
                value={formData.status}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
      
          {/* Dates Section */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-4">
              <InputFields
                name="startDate"
                label="Start Date"
                input="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-1/2"
              />
              <InputFields
                name="endDate"
                label="End Date"
                input="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-1/2"
              />
            </div>
      
            <div className="flex gap-4">
              <InputFields
                name="midStartDate"
                label="MidTerm Date"
                input="date"
                value={formData.midStartDate}
                onChange={handleChange}
                className="w-1/2"
              />
              <InputFields
                name="midEndDate"
                label="MidTerm End Date"
                input="date"
                value={formData.midEndDate}
                onChange={handleChange}
                className="w-1/2"
              />
            </div>
      
            <div className="flex gap-4">
              <InputFields
                name="finalStartDate"
                label="FinalTerm Date"
                input="date"
                value={formData.finalStartDate}
                onChange={handleChange}
                className="w-1/2"
              />
              <InputFields
                name="finalEndDate"
                label="FinalTerm End Date"
                input="date"
                value={formData.finalEndDate}
                onChange={handleChange}
                className="w-1/2"
              />
            </div>
          </div>
        </div>
      
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Btns type="primary" title="Cancel" onClick={handleCancel} />
          <Btns type="secondary" title="Add" btnType="submit" />
        </div>
      </form>
      
      ) : (
        type === "delete" && (
          <form action={handleDelete}>
            <DeleteDialog title="Semester" object={data.title} type="submit"
              onCancel={(e) => {
                e.preventDefault();
                handleCancel();
              }}
            />
          </form>
        )
      )}
    </div>
  );
}
