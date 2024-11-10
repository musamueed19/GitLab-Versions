"use client";
import BulkDelete from "@/components/common/BulkDelete";
import Filter from "@/components/common/Filter";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import { useEffect, useState } from "react";
import Loading from "../semesters/loading";

const columns = ["Name", "Email", "Role", "Status", "Designation"];
const actions = {
  actions: "true",
  all: "true",
  update: "true",
  view: "true",
  edit: "true",
};

const statusOptions = [
  { value: "all", name: "all" },
  { value: "active", name: "active" },
  { value: "inactive", name: "inactive" },
];

export default function UserManagementPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  async function getUsers() {
    let data = await getAll("http://192.168.50.219:3000/users");
    if (data.success) {
      setRecords(
        data.data.map((item) => ({
          name: item.name === "" || item.name === null ? "Null" : item.name,
          email: item.email,
          role: item.UserRole_id[0]?.name || "N/A",
          status: item.is_active ? "Active" : "Inactive",
          designation: item.designation?.name ?? "Null",
          designationId: item.designation?.name ?? "Null",
          id: item.id,
          roleId: item.UserRole_id[0]?.id || "Null",
          contact: item.contact_number,
          location: item.location?.name ?? "Null",
          locationId: item.location?.id ?? "Null",
          statusId: item.is_active,
        }))
      );
    } else {
      setError(data.error);
    }
  }

  useEffect(() => {
    getUsers();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <TitleHeader title="Users Management" />

      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="User name" path="users" />
          <Filter
            label="User Status"
            name="userStatus"
            options={statusOptions}
          />
        </div>
        <div className="actionsGroup">
          <BulkDelete ids={selectedIds} label="users" path="users" />
          <FormModal title="Add" type="create" table="users" />
        </div>
      </div>

      <Table
        columns={columns}
        records={records}
        actions={actions}
        count={5}
        table="users"
        onSelectedIdsChange={handleSelectedIdsChange}
      />

      {records.length > 10 && <Pagination />}
    </div>
  );
}

// const records = [
//   {
//     name: "Asim Mehmood",
//     email: "asimmehmood@vu.edu.pk",
//     role: "Admin",
//     status: "Active",
//     designation: "Associate Professor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Warda Faiz",
//     email: "warda.faiz@vu.edu.pk",
//     role: "Admin",
//     status: "Active",
//     designation: "Associate Professor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Muhammad Rehan",
//     email: "rehan@vu.edu.pk",
//     role: "Faculty Member",
//     status: "Active",
//     designation: "Associate Professor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Neelam Alam",
//     email: "neelam.alam@vu.edu.pk",
//     role: "Faculty Member",
//     status: "Active",
//     designation: "Associate Professor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Saeed Nasir",
//     email: "saeednasir@vu.edu.pk",
//     role: "Faculty Member",
//     status: "Active",
//     designation: "Assistant Professor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Adnan Asif",
//     email: "adnanasif@vu.edu.pk",
//     role: "HoD",
//     status: "Active",
//     designation: "Assistant Professor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Muhammad Qamar",
//     email: "qamar@vu.edu.pk",
//     role: "HoD",
//     status: "Active",
//     designation: "Lecturer",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Tahir Jan",
//     email: "tahir.jan@vu.edu.pk",
//     role: "HoD",
//     status: "Active",
//     designation: "Tutor/Instructor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Miss Noureen",
//     email: "noureen@vu.edu.pk",
//     role: "HoD",
//     status: "Active",
//     designation: "Tutor/Instructor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
//   {
//     name: "Faiz Tahir",
//     email: "faiztahir@vu.edu.pk",
//     role: "HoD",
//     status: "Inactive",
//     designation: "Tutor/Instructor",
//     contact: "+92-257897-98",
//     location: "Lawrence Road Campus",
//   },
// ];

// try {
//   const response = await axios.get("http://192.168.50.219:3000/users");
//   records = response.data.map((item) => ({
//     name: item.name,
//     email: item.email,
//     role: item.UserRole_id[0]?.name || "N/A",
//     status: item.is_active ? "Active" : "Inactive",
//     designation: item.designation.name,
//     designationId: item.designation.id,
//     id: item.id,
//     roleId: item.UserRole_id[0]?.id || null,
//     contact: item.contact_number,
//     location: item.location.name,
//     locationId: item.location.id,
//     statusId: item.is_active,
//   }));
// } catch (error) {
//   console.error("Error fetching users:", error);
// }
