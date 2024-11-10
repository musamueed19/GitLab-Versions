import { useState, useEffect } from "react";
import axios from "axios"; 
import TitleHeader from "../common/TitleHeader";
import InputFields from "../common/InputFields";
import Btns from "../common/Btns";
import { useRouter } from "next/navigation";

export default function AddPaperPatternModal({ semester, type, setOpen, data }) {
  const [formData, setFormData] = useState({
    course_type: data?.courseType || "",
    exam_type: data?.examType || "",
    questions: [{ marks: data?.marks || '', noOfQuestions: data?.quantity || '' }],
  });


  const router = useRouter();

  const statusOptions = [
    { value: 'Regular' },
    { value: 'Practical' },
  ];

  const examType = [
    { value: 'MidTerm' },
    { value: 'FinalTerm' },
  ];

  const handleChange = (index, field, value) => {
    if (index === -1) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      const updatedQuestions = [...formData.questions];
      updatedQuestions[index][field] = field === 'marks' || field === 'noOfQuestions' ? parseFloat(value) : value;
      setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
    }
  };

  const handleAddField = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { marks: '', noOfQuestions: '' }],
    }));
  };

  const handleRemoveField = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
    const url = type === "update"
        ? `http://localhost:3000/examType/${data.id}`
        : `http://localhost:3000/examType/${semester.id}`;

    const method = type === "update" ? axios.patch : axios.post;

    // Create updateData as a single JSON object for update
    const updateData = type === "update"
        ? {
            exam_type: formData.exam_type,
            course_type: formData.course_type,
            marks: formData.questions[0].marks,
            noOfQuestions: formData.questions[0].noOfQuestions 
          }
        : formData;

    const response = await method(url, updateData);
    setOpen(false);
    router.refresh(`/semesters/${semester.id}?type=${type}`);
} catch (error) {
        console.error("Error posting data:", error.response ? error.response.data : error);
    }
};


  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/examType?id=${data.id}`
      );
      console.log("Delete Response:", response.data);
      setOpen(false);
      router.refresh(`/semesters/${semester.id}`);
    } catch (error) {
      console.error("Error deleting data:", error.response ? error.response.data : error);
    }
  };

  // Effect to set form data for editing
  useEffect(() => {
    if (type === "update" && data) {
      setFormData({
        course_type: data.course_type,
        exam_type: data.examType,
        questions: data.questions || [{ marks: '', noOfQuestions: '' }],
      });
    }
  }, [type, data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        {type === "create" ? (
          <>
            <TitleHeader fontSize="xl" title="Add Paper Pattern" />
            <div className="flex justify-between mb-6 mt-6">
              <label className="font-semibold">Semester</label>
              <span>{semester.title}</span>
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              <div className="flex gap-7 mb-4">
                <InputFields
                  label="Course Type"
                  name="course_type"
                  input="dropdown"
                  options={statusOptions}
                  value={formData.course_type}
                  onChange={(name, value) => handleChange(-1, 'course_type', value)}
                  className="flex-1"
                />
                <InputFields
                  label="Exam Type"
                  name="exam_type"
                  input="dropdown"
                  options={examType}
                  value={formData.exam_type}
                  onChange={(name, value) => handleChange(-1, 'exam_type', value)}
                  className="flex-1"
                />
              </div>

              <div className="overflow-y-auto max-h-60 mb-4">
                {formData.questions.map((question, index) => (
                  <div key={index} className="flex flex-col ">
                    {formData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveField(index)}
                        className="self-end text-red-300 hover:text-red-400"
                      >
                        ✖
                      </button>
                    )}
                    <div className="flex items-center gap-7">
                      <InputFields
                        label={`Marks ${index + 1}`}
                        name={`marks-${index}`}
                        input="number"
                        value={question.marks}
                        onChange={(name, value) => handleChange(index, 'marks', value)}
                        placeholder="Enter marks"
                        className="mr-2"
                      />
                      <InputFields
                        label={`No of Questions ${index + 1}`}
                        name={`noOfQuestions-${index}`}
                        input="number"
                        value={question.noOfQuestions}
                        onChange={(name, value) => handleChange(index, 'noOfQuestions', value)}
                        placeholder="Enter number of questions"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddField}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add More Questions
              </button>

              <div className="flex justify-end gap-4">
                <Btns type="primary" title="Cancel" onClick={handleCancel} />
                <Btns type="secondary" title="Add" btnType="submit" />
              </div>
            </form>
          </>
        ) : type === "update" ? (
          <>
            <TitleHeader fontSize="xl" title="Edit Paper Pattern" />
            <div className="flex justify-between mb-6 mt-6">
              <label className="font-semibold">Semester</label>
              <span>{semester.title}</span>
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              <div className="flex gap-7 mb-4">
                <label className="font-semibold">Course Type</label>
                <span>{data.courseType}</span>
                <label className="font-semibold">Exam Type</label>
                <span>{data.examType}</span>
              </div>

              <div className="overflow-y-auto max-h-60 mb-4">
                {formData.questions.map((question, index) => (
                  <div key={index} className="flex flex-col ">
                    <div className="flex items-center gap-7">
                      <InputFields
                        label={`Marks`}
                        name={`marks`}
                        input="number"
                        value={formData.questions[0].marks}
                        onChange={(name, value) => handleChange(index, 'marks', value)}
                        placeholder="Enter marks"
                        className="mr-2"
                      />
                      <InputFields
                        label={`No of Questions`}
                        name={`noOfQuestions`}
                        input="number"
                        value={formData.questions[0].noOfQuestions}
                        onChange={(name, value) => handleChange(index, 'noOfQuestions', value)}
                        placeholder="Enter number of questions"
                      />
                    </div>
                  </div>
                ))}
              </div>
 
              <div className="flex justify-end gap-4">
                <Btns type="primary" title="Cancel" onClick={handleCancel} />
                <Btns type="secondary" title="Update" btnType="submit" />
              </div>
            </form>
          </>
        ) : (
          <>
            <TitleHeader fontSize="xl" title="Delete Paper Pattern" />
            <p>Are you sure you want to delete this paper pattern?</p>
            <div className="flex justify-end gap-4">
              <Btns type="primary" title="Cancel" onClick={handleCancel} />
              <Btns type="danger" title="Delete" onClick={handleDelete} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
