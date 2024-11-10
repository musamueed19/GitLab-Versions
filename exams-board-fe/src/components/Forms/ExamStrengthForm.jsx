import { useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

const ExamTypeOptions = [
  { value: "Midterm", name: "Midterm" },
  { value: "Finalterm", name: "Finalterm" },
];
export default function ExamStrengthForm({
  type,
  data,
  setOpen,
  setIsVisible,
  setContent,
}) {
  const [formData, setFormData] = useState({
    id: data?.id || "",
    Semester: data?.semester || "",
    Course: data?.courseId || "",
    ExamType: data?.exam || "",
    Students: data?.num_of_students || "",
    ExamDate: data?.date || "",
    courseFile: "",
  });

  function submitHandler(event) {
    event.preventDefault();
    const bodyData = {
      id: formData.id,
      semester: formData.Semester,
      courseId: formData.Course,
      exam: formData.ExamType,
      num_of_students: formData.studentEnrolled,
      date: formData.ExamDate,
      // courseFile: data?.file,
    };
    const ExcelFile = {
      courseFile: "",
    };
    console.log(bodyData);

    if (type === "create") {
      axios
        .post(
          "http://192.168.50.219:3000/exam-day-course-wise-strengths/787f5ef7-9636-4410-a4b4-70f2c4edb747/upload?file",
          bodyData
        )
        .then((response) => {
          //   console.log(response);
          //   showMessageStrip(true, "New Exam Strength Added successfully");
          handleSuccess("New Exam Strength Added successfully");
        })
        .catch((error) => {
          console.error("Error Adding Exam Strength:" + error);
        });
    } else if (type === "update") {
      axios
        .patch(
          `http://192.168.50.219:3000/exam-day-course-wise-strengths/${data.id}`,
          bodyData
        )
        .then((response) => {
          // console.log(response);
          handleSuccess("Exam Strnegth has Updated successfully");
        })
        .catch((error) => {
          console.error("Error Adding Exam Strength:" + error);
        });
    } else if (type === "delete") {
      axios
        .delete(
          `http://192.168.50.219:3000/exam-day-course-wise-strengths/${id}`
        )
        .then((response) => {
          // console.log(response);
          handleSuccess("Exam Strength has Deleted successfully");
        })
        .catch((error) => {
          console.error("Error Deleting Exam Strength:" + error);
        });
    }
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleCancel() {
    setOpen(false);
  }
  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <form className="w-full px-8 lg:px-16" onSubmit={submitHandler}>
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Edit Exam Strength" />
          <div className="space-y-3">
            <InputFields
              type="view"
              inline={true}
              label="Semester"
              input="text"
              name="Semester"
              value={formData.Semester}
            />

            <InputFields
              type="view"
              inline={true}
              label="Course"
              input="text"
              name="Course"
              value={formData.Course}
            />

            <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between">
                <InputFields
                  type={type}
                  label="Exam Type"
                  input="dropdown"
                  name="ExamType"
                  placeholder="Select Exam Type"
                  value={formData.ExamType}
                  onChange={handleChange}
                  options={ExamTypeOptions}
                />
                <InputFields
                  type={type}
                  label="Students Enrolled"
                  input="number"
                  name="Students"
                  placeholder="Enter no. of students"
                  value={formData.Students}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  type={type}
                  label="Exam Date"
                  input="date"
                  name="ExamDate"
                  value={formData.ExamDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Update" btnType="submit" />
          </div>
        </div>
      ) : type === "view" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="View Course" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type="view"
                inline={true}
                label="Semester"
                input="text"
                name="Semester"
                value={formData.Semester}
              />

              <InputFields
                type="view"
                inline={true}
                label="Course"
                input="text"
                name="Course"
                value={formData.Course}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                inline={true}
                label="Exam Type"
                input="dropdown"
                name="ExamType"
                placeholder="Select Exam Type"
                value={formData.ExamType}
                onChange={handleChange}
                options={ExamTypeOptions}
              />
              <InputFields
                type={type}
                inline={true}
                label="Students Enrolled"
                input="number"
                name="Students"
                placeholder="Enter no. of students"
                value={formData.Students}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                inline={true}
                label="Exam Date"
                input="date"
                name="ExamDate"
                value={formData.ExamDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Close"
              btnType="button"
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add Exam Strength" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Semester"
                input="text"
                name="Semester"
                placeholder="Enter Semester Title"
                value={formData.Semester}
                onChange={handleChange}
              />
              <InputFields
                label="Exam Type"
                input="dropdown"
                name="ExamType"
                options={ExamTypeOptions}
                value={formData.ExamType}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Upldaod Course File"
                input="file"
                name="courseFile"
                accept=".xlsx, .xls"
                placeholder="Enter course title"
                value={formData.courseFile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : (
        type === "delete" && (
          <DeleteDialog
            title="course"
            object={data.course}
            onCancel={handleCancel}
          />
        )
      )}
    </form>
  );
}
