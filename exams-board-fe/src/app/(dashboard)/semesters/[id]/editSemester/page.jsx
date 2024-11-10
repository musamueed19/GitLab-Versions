import EditSemesterForm from "@/components/Forms/EditSemesterForm";
import TitleHeader from "@/components/common/TitleHeader";


export default function EditSemester({semester}) {


    return (
      // console.log(semester.semester, semester.type)
        <div className="container">
        <TitleHeader title= {`${semester.type} Semester`} />
        
        <EditSemesterForm semester={semester.semester} type={semester.type}></EditSemesterForm>
      </div>
    );
}
