import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";

const columns = [
  "Name",
  "Email",
  "Role",
  "Status",
  "Designation"
];
const records = [
  {
    name: "Asim Mehmood",
    email: "asimmehmood@vu.edu.pk",
    role: "Admin",
    status: "Active",
    designation: "Associate Professor",
  },
  {
    name: "Warda Faiz",
    email: "warda.faiz@vu.edu.pk",
    role: "Admin",
    status: "Active",
    designation: "Associate Professor",
  },
  {
    name: "Muhammad Rehan",
    email: "rehan@vu.edu.pk",
    role: "Faculty Member",
    status: "Active",
    designation: "Associate Professor",
  },
  {
    name: "Neelam Alam",
    email: "neelam.alam@vu.edu.pk",
    role: "Faculty Member",
    status: "Active",
    designation: "Associate Professor",
  },
  {
    name: "Saeed Nasir",
    email: "saeednasir@vu.edu.pk",
    role: "Faculty Member",
    status: "Active",
    designation: "Assistant Professor",
  },
  {
    name: "Adnan Asif",
    email: "adnanasif@vu.edu.pk",
    role: "HoD",
    status: "Active",
    designation: "Assistant Professor",
  },
  {
    name: "Muhammad Qamar",
    email: "qamar@vu.edu.pk",
    role: "HoD",
    status: "Active",
    designation: "Lecturer",
  },
  {
    name: "Tahir Jan",
    email: "tahir.jan@vu.edu.pk",
    role: "HoD",
    status: "Active",
    designation: "Tutor/Instructor",
  },
  {
    name: "Miss Noureen",
    email: "noureen@vu.edu.pk",
    role: "HoD",
    status: "Active",
    designation: "Tutor/Instructor",
  },
  {
    name: "Faiz Tahir",
    email: "faiztahir@vu.edu.pk",
    role: "HoD",
    status: "Inactive",
    designation: "Tutor/Instructor",
  },
];

const actions = {
  actions: true,
  all: true,
};

export default function FacultyManagementPage() {
  return (
    <div className="container">
      <TitleHeader title="Faculties Management" />

      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Faculty" />
        </div>

        <div className="actionsGroup">
          <BulkDelete />
          <FormModal title="Faculty" type="create" table="faculties" />
        </div>
      </div>

      <Table columns={columns} records={records} actions={actions} table="faculties" count={5} />

      <Pagination />
    </div>
  );
}
