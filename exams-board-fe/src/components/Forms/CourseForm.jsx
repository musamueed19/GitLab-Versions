import { useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

const courseTypeOptions = [
  { value: "Regular", name: "Regular" },
  { value: "Practical", name: "Practical" },
];
export default function CourseForm({
  type,
  data,
  setOpen,
  setIsVisible,
  setContent,
}) {
  const [formData, setFormData] = useState({
    courseTitle: data?.title || "",
    courseCode: data?.course || "",
    courseType: data?.courseType || "",
    studentEnrolled: data?.studentEnrollment || 0,
  });

  // const [courseType, setCourseType] = useState(data?.courseType);
  // const [courseCode, setCourseCode] = useState(data?.course);
  // const [studentEnrollment, setStudentEnrollment] = useState(
  //   +(data?.studentEnrollment ?? 0)
  // );

  function submitHandler(event) {
    event.preventDefault();
    const bodyData = {
      id: formData.courseCode,
      course_code: formData.courseCode,
      course_title: formData.courseTitle,
      course_type: formData.courseType,
      enrolled_students: +formData.studentEnrolled,
    };
    console.log(bodyData);

    if (type === "create") {
      axios
        .post("http://192.168.50.219:3000/courses/addCourse", bodyData)
        .then((response) => {
          // console.log(response);
          // showMessageStrip(true, "New Course Added successfully");
          handleSuccess("New Course Added successfully");
        })
        .catch((error) => {
          console.error("Error Adding Course:" + error);
        });
    } else if (type === "update") {
      axios
        .patch("http://192.168.50.219:3000/courses/editCourse", bodyData)
        .then((response) => {
          // console.log(response);
          handleSuccess("Course has Updated successfully");
        })
        .catch((error) => {
          console.error("Error Adding Course:" + error);
        });
    } else if (type === "delete") {
      axios
        .delete(`http://192.168.50.219:3000/courses/${data.course}`)
        .then((response) => {
          // console.log(response);
          handleSuccess("Course has Deleted successfully");
        })
        .catch((error) => {
          console.error("Error Adding Course:" + error);
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
          <TitleHeader fontSize="xl" title="Edit Course" />
          <div className="space-y-3">
            <InputFields
              type="view"
              inline={true}
              label="Course Code"
              input="text"
              name="courseCode"
              placeholder="Enter course code"
              value={formData.courseCode}
            />
            <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between">
                <InputFields
                  type={type}
                  label="Course Title"
                  input="text"
                  name="courseTitle"
                  placeholder="Enter course title"
                  value={formData.courseTitle}
                  onChange={handleChange}
                />
                <InputFields
                  type={type}
                  label="Students Enrolled"
                  input="number"
                  name="studentEnrolled"
                  placeholder="Enter no. of students"
                  value={formData.studentEnrolled}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  type={type}
                  label="Course Type"
                  input="dropdown"
                  name="courseType"
                  value={formData.courseType}
                  options={courseTypeOptions}
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
                type={type}
                label="Course Code"
                input="text"
                name="courseCode"
                placeholder="Enter course code"
                value={formData.courseCode}
              />
              <InputFields
                type={type}
                label="Course Type"
                input="dropdown"
                name="courseType"
                value={formData.courseType}
                options={courseTypeOptions}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                label="Course Title"
                input="text"
                name="courseTitle"
                placeholder="Enter course title"
                value={formData.courseTitle}
              />

              <InputFields
                type={type}
                label="Students Enrolled"
                input="number"
                name="studentEnrolled"
                placeholder="Enter no. of students"
                value={formData.studentEnrolled}
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
          <TitleHeader fontSize="xl" title="Add Course" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Course Code"
                input="text"
                name="courseCode"
                placeholder="Enter course code"
                onChange={handleChange}
              />
              <InputFields
                label="Course Type"
                input="dropdown"
                name="courseType"
                options={courseTypeOptions}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Course Title"
                input="text"
                name="courseTitle"
                placeholder="Enter course title"
                onChange={handleChange}
              />
              <InputFields
                label="Students Enrolled"
                input="number"
                name="studentEnrolled"
                placeholder="Enter no. of students"
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
