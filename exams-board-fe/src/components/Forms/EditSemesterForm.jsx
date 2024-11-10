"use client";

import { useState } from "react";
import Btns from "../common/Btns";
import InputFields from "../common/InputFields";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from 'swr';

export default function EditSemesterForm({ type, semester }) {
  const router = useRouter();
  const statusOptions = [
    {
      value: "Active",
      name: "Active",
    },
    {
      value: "InActive",
      name: "InActive",
    },
  ];

  const [formData, setFormData] = useState({
    semesterName: semester?.title || "",
    status: semester?.is_Active || "",
    startDate: semester?.start_date || "",
    endDate: semester?.end_date || "",
    midStartDate: semester?.mid_term_date || "",
    midEndDate: semester?.mid_term_end_date || "",
    finalStartDate: semester?.final_term_date || "",
    finalEndDate: semester?.final_term_end_date || "",
  });
  

    const handleChange = (name, value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const body = {
      title: formData.semesterName,
      start_date: formData.startDate,
      end_date: formData.endDate,
      mid_term_date: formData.midStartDate,
      mid_term_end_date: formData.midEndDate,
      final_term_date: formData.finalStartDate,
      final_term_end_date: formData.finalEndDate,
      is_Active: formData.status == "Active" ? true : false,
    };
    
    console.log('Request Body:', body); 
  
    try {
      const response = await fetch(`http://localhost:3000/semesters/${semester.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json(); 
      console.log(responseData);
      if (response.ok) { 
        router.push('/semesters');
        router.refresh('/semester');
        mutate(`/semesters/${semester.id}`);
      } else {
        console.error('Failed to update semester', response.statusText, responseData);
      }
    } catch (error) {
      console.error('Error updating semester', error);
    }

  };

  function handleCancel(event) {
    event.preventDefault();
    router.back();
  }



  return (
      <form onSubmit={handleSubmit}>
            {type === "update" ? (
              <div className="flex flex-col gap-8 w-full py-6">
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex w-4/5 justify-between">
                        <InputFields
                        type="view"
                        inline= {true}
                        label="Semester Name"
                        name="semesterName"
                        id="semesterName"
                        value={formData.semesterName}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex w-4/5 justify-between">
                    <InputFields
                      type="update"
                      label="Semester Status"
                      inline= {true}
                      required={true}
                      input="dropdown"
                      name="status"
                      options={statusOptions}
                      value={formData.status}
                      onChange={handleChange}
                  />
                    </div>

                    <div className="flex flex-col items-center gap-16 w-full">
                      <div className="flex justify-between w-4/5">
                        <InputFields
                          type="update"
                          inline={true}
                          name="startDate"
                          label="Start Date"
                          input="date"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                        <InputFields
                            type="update"
                            inline={true}
                            name="endDate"
                            label="End Date"
                            input="date"
                            value={formData.endDate}
                            onChange={handleChange}
                          />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-16 w-full">
                      <div className="flex justify-between w-4/5">
                        <InputFields
                          type="update"
                          inline={true}
                          name="midStartDate"
                          label="MidTerm Date"
                          input="date"
                          value={formData.midStartDate}
                          onChange={handleChange}
                        />
                        <InputFields
                            type="update"
                            inline={true}
                            name="midendDate"
                            label="MidTerm End Date"
                            input="date"
                            value={formData.midEndDate}
                            onChange={handleChange}
                          />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-16 w-full">
                      <div className="flex justify-between w-4/5">
                        <InputFields
                            type="update"
                            inline={true}
                            name="finalStartDate"
                            label="FinalTerm Date"
                            input="date"
                            value={formData.finalStartDate}
                            onChange={handleChange}              
                          />
                          <InputFields
                            type="update"
                            inline={true}
                            name="finalEndDate"
                            label="FinalTerm End Date"
                            input="date"
                            value={formData.finalEndDate}
                            onChange={handleChange}
                          />
                      </div>  
                    </div>
                  
                </div>
                <div className="flex items-center gap-8 justify-end w-[90%]">
                  <Btns type="primary" title="Cancel" onClick={handleCancel} />
                  <Btns type="secondary" title="Update" btnType="submit" />
                </div>
              </div>
            ) : type === "view" ? (
              <div className="flex flex-col gap-8 w-full py-6">
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex w-4/5 justify-between">
                        <InputFields
                        type="view"
                        inline= {true}
                        label="Semester Name"
                        name="semesterName"
                        id="semesterName"
                        value={formData.semesterName}
                        />
                    </div>
                    <div className="flex w-4/5 justify-between">
                      <InputFields
                        type="view"
                        label="Semester Status"
                        inline= {true}
                        name="status"
                        value={formData.status ? "Active" : "InActive"}

                      />
                    </div>
                    <div className="flex flex-col items-center gap-16 w-full">
                      <div className="flex justify-between w-4/5">
                        <InputFields
                          type="view"
                          inline={true}
                          name="startDate"
                          label="Start Date"
                          value={formData.startDate}

                        />
                        <InputFields
                            type="view"
                            inline={true}
                            name="endtDate"
                            label="End Date"
                            value={formData.endDate}
                          />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-16 w-full">
                      <div className="flex justify-between w-4/5">
                        <InputFields
                          type="view"
                          inline={true}
                          name="midStartDate"
                          label="MidTerm Date"
                          value={formData.midStartDate}
                        />
                        <InputFields
                            type="view"
                            inline={true}
                            name="midendtDate"
                            label="MidTerm End Date"
                            value={formData.midEndDate}
                          />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-16 w-full">
                      <div className="flex justify-between w-4/5">
                        <InputFields
                            type="view"
                            inline={true}
                            name="finalStartDate"
                            label="FinalTerm Date"
                            value={formData.finalStartDate}
                          />
                          <InputFields
                            type="view"
                            inline={true}
                            name="finalEndDate"
                            label="FinalTerm End Date"
                            value={formData.finalEndDate}
                          />
                      </div>  
                    </div>
                  
                </div>
                <div className="flex items-center gap-8 justify-end w-[90%]">
                  <Btns type="primary" title="Close" onClick={handleCancel} />
                </div>
              </div>
            ) : (
              type === "delete" && (
                <DeleteDialog title="Semester" object={data.semester} />
              )
            )}
          </form>
  );
}
