import EditSectionCoordinatorForm from "@/components/Forms/EditSectionCoordinatorForm";
import TitleHeader from "@/components/common/TitleHeader";


export default function EditSectionCoordinator({semester}) {


    return (
      // console.log(semester.semester, semester.type)
        <div className="container">
        <TitleHeader title= {`${semester.type} Semester `} />
        
        <EditSectionCoordinatorForm semester={semester.semester} type={semester.type} />
      </div>
    );
}
