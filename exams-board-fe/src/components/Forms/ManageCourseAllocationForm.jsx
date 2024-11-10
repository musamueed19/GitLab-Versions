import { useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

export default function ManageCourseAllocationForm({
  type,
  data = "",
  setOpen,
  setIsVisible,
  setContent,
}) {
  const [formData, setFormData] = useState({
    CourseTitle: data?.Course || "",
    faculty: data?.Faculty || "",
    Contribution: data?.Contribution || "",
    Role: data?.Role || "",
   
  });
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function saveHandler() {
  //   console.log(location);

  //   axios
  //     .post("http://192.168.50.219:3000/locations/addLocation", {location})
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching locations:", error);
  //     });
  // }

  function submitHandler(event) {
    event.preventDefault();

    if (type === "create") {
      console.log(location);

      axios
        .post("http://192.168.50.219:3000/locations/addLocation", {
          location: formData.CourseTitle,
        })
        .then((response) => {
          handleSuccess("New Course Added successfully");
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }

    if (type === "update") {
      console.log(location, data.id);
      axios
        .patch(`http://192.168.50.219:3000/locations/${data.id}`, {
          location: formData.CourseTitle,
        })
        .then((response) => {
          handleSuccess("Course has Updated successfully");
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }
    if (type === "delete") {
      console.log(location, data.id);
      axios
        .delete(`http://192.168.50.219:3000/locations?id=${data.id}`)
        .then((response) => {
          handleSuccess("Course has Deleted successfully");
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }

    // router.push('/locations')
  }
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
    <form onSubmit={submitHandler} className="w-full px-8 lg:px-16">
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Edit Course Allocation" />
          <div className="flex flex-col justify-center w-full px-26">
            <div className="grid col-span-2 justify-center">
              <div className="flex gap-3">
                <h1 className="font-medium">Semester:</h1>
                <p>Summer Semester 2024</p>
              </div>
              <div className="flex gap-3">
                {" "}
                <h1 className="font-medium">Section:</h1>
                <p>Core Courses</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 p-4">
              <div className="flex flex-col gap-3">
                {" "}
                <InputFields
                  value={formData.CourseTitle}
                  label="Courses "
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Contribution"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label=" Teacher’s Share (%) "
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="MidTerm Target "
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                {" "}
                <InputFields
                  value={formData.CourseTitle}
                  label="Faculty"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Role"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Allocated Students"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="FinalTerm Target"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
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
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Allocate Course" />
          <div className="flex flex-col justify-center w-full px-26">
            <div className="grid col-span-2 justify-center">
              <div className="flex gap-3">
                <h1 className="font-medium">Semester:</h1>
                <p>Summer Semester 2024</p>
              </div>
              <div className="flex gap-3">
                {" "}
                <h1 className="font-medium">Section:</h1>
                <p>Core Courses</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 p-4">
              <div className="flex flex-col gap-3">
                {" "}
                <InputFields
                  value={formData.CourseTitle}
                  label="Courses "
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Contribution"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label=" Teacher’s Share (%) "
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Exam Type "
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                {" "}
                <InputFields
                  value={formData.CourseTitle}
                  label="Faculty"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Role"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="Allocated Students"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
                  onChange={handleChange}
                />
                <InputFields
                  value={formData.CourseTitle}
                  label="No. of Papers"
                  input="text"
                  name="CourseTitle"
                  placeholder="Enter location name"
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
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : type === "view" ? (
        <div className="flex flex-col gap-3 py-6">
          <TitleHeader fontSize="xl" title="View Course Allocation" />
          <div className="flex flex-col justify-center w-full px-26">
            <div className="grid grid-cols-2 gap-8 py-4 justify-center">
              <div className="flex gap-3">
                <h1 className="font-medium">Semester Name:</h1>
                <p>Summer Semester 2024</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Section</h1>
                <p>Core courses</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Courses:</h1>
                <p>{formData.CourseTitle}</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Faculty</h1>
                <p>{formData.faculty}</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Contribution</h1>
                <p>{formData.Contribution}</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Role</h1>
                <p>{formData.Role}</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Teacher’s Share (%)</h1>
                <p>0.0</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">AllocatedStudents</h1>
                <p>0</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">MidtermTarget</h1>
                <p>38</p>
              </div>
              <div className="flex gap-3">
                <h1 className="font-medium">Finalterm Target</h1>
                <p>60</p>
              </div>
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="CLose"
              btnType="button"
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : (
        type === "delete" && (
          <DeleteDialog
            Coursetitle="Course Allocation."
            object={
              <div className="text-black font-normal">
                Course{" "}
                <span className="text-red-500 font-semibold">
                  ({data.Course})
                </span>{" "}
                Allocated to{" "}
                <span className="text-red-500 font-semibold">
                  "{data.Faculty}"
                </span>
              </div>
            }
            onCancel={handleCancel}
          />
        )
      )}
    </form>
  );
}
