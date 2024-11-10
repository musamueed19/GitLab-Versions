"use client";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SectionCoordinatorForm({
  type,
  setOpen,
  setIsVisible,
  setContent,
}) {
  const router = useRouter();
  const currentDate = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(currentDate.getMonth() + 1);

  const [facultyOptions, setFacultyOptions] = useState([]);

  // State for semester details (id and title)
  const [semesterDetails, setSemesterDetails] = useState({ id: "", title: "" });

  const [formData, setFormData] = useState({
    sectioncoordinatorTitle: "",
    coordinator_id: "",
  });
  // const [coordinator, setCoordinator] = useState("")
  // Function to handle form field changes
  const handleChange = (name, value) => {
    console.log(name, value);

    if (name === "coordinator_id") {
      // Find the selected option to get its id
      const selectedOption = facultyOptions.find(
        (option) => option.value === value
      );

      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.id : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.50.219:3000/sections/addsection")
      .then((response) => {
        console.log(response.data);

        // Store faculty options in state
        setFacultyOptions(
          response.data.facultyDetails.map((item) => ({
            id: item.id,
            value: item.name,
          }))
        );

        // Store active semester details in state
        if (response.data.activeSemester) {
          setSemesterDetails({
            id: response.data.activeSemester.id,
            title: response.data.activeSemester.title,
          });
          console.log(semesterDetails);
          // Optionally update formData if it needs the semester title
          setFormData((prev) => ({
            ...prev,
            Semester: response.data.activeSemester.title,
          }));
        }
      })
      .catch((error) =>
        console.error("Error fetching faculty and section options:", error)
      );
  }, []);

  useEffect(() => {
    if (formData.coordinator) {
      // This is where you should handle any side effect when coordinator changes
      console.log("Coordinator changed: ", formData.coordinator);
      // You can also set other state here if needed
    }
  }, [formData.coordinator]);

  const submitHandler = (event) => {
    console.log();

    event.preventDefault();
    const apiUrl = "http://192.168.50.219:3000/sections/addSection";

    const payload = {
      title: formData.sectioncoordinatorTitle,
      coordinator_id: formData.coordinator_id,
    };

    if (type === "create") {
      console.log(formData);

      axios
        .post(`${apiUrl}/${semesterDetails.id}`, {
          title: formData.sectioncoordinatorTitle,
          coordinator_id: formData.coordinator_id,
        })
        .then(() => handleSuccess("New section coordinator added successfully"))
        .catch((error) =>
          console.error("Error adding section coordinator:", error)
        );
    }

    if (type === "update") {
      axios
        .patch(`${apiUrl}/${data.id}`, payload)
        .then(() => handleSuccess("Section coordinator updated successfully"))
        .catch((error) =>
          console.error("Error updating section coordinator:", error)
        );
    }

    if (type === "delete") {
      axios
        .delete(`${apiUrl}?id=${data.id}`)
        .then(() => handleSuccess("Section coordinator deleted successfully"))
        .catch((error) =>
          console.error("Error deleting section coordinator:", error)
        );
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => {
      router.push("/sectioncoordinator");
    }, 2000);
  };

  useEffect(() => {
    if (type === "update" || type === "view") {
      router.push(`/sectioncoordinator/${data.id}?type=${type}`);
    }
  }, [type, router]);

  return (
    <form onSubmit={submitHandler} className="w-full px-8 lg:px-12">
      {type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add New Section" />
          <div className="flex flex-col justify-center w-full px-6">
            <div className="flex justify-between pb-5">
              <h2 className="font-bold">Semester:</h2>
              <p>{semesterDetails.title}</p>
            </div>
            <InputFields
              value={formData.sectioncoordinatorTitle}
              label="Section"
              input="text"
              name="sectioncoordinatorTitle"
              inline={true}
              placeholder="Enter Section name"
              onChange={handleChange}
            />
            <InputFields
              label="Section Coordinator"
              input="dropdown"
              name="coordinator_id"
              options={facultyOptions.map((item) => ({ value: item.value }))}
              inline={true}
              value={formData.coordinator_id}
              onChange={handleChange}
            />
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
      ) : type === "delete" ? (
        <DeleteDialog
          title="Section Coordinator"
          object={data.coordinator}
          onCancel={handleCancel}
        />
      ) : null}
    </form>
  );
}
