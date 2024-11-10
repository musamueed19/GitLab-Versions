"use client";
import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import { useState, useEffect } from "react";

const columns = ["Section", "Coordinator", "Semester", "from", "to"];
const actions = {
  actions: true,
  all: true,
};
let statusOptions = [1, 2, 3];

export default function SectionCoordinatorManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          "http://192.168.50.219:3000/sections",
          { cache: "no-store" },
          { next: { tags: ["sections"] } }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await response.json();

        setRecords(
          data.map((item) => ({
            section: item.section.title,
            coordinator: item.faculty.name,
            coordinator_id: item.faculty.id,
            semester: item.semester.title,
            from: new Date(item.from_date).toISOString().split("T")[0],
            to:
              item.to_date === null
                ? "-"
                : new Date(item.to_date).toISOString().split("T")[0],
            id: item.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching sections:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchSections();
  }, []);

  return (
    <div className="container">
      <TitleHeader title="Section & Coordinator Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="sectioncoordinator" />
          {/* Uncomment when adding dropdown
          <InputFields
            label="Semester Status"
            required={true}
            input="dropdown"
            name="status"
            options={statusOptions}
          /> */}
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="Section coordinator"
            path="sectioncoordinator"
          />
          <FormModal title="Add" type="create" table="sectioncoordinator" />
        </div>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <Table
          columns={columns}
          records={records}
          actions={actions}
          table="sectioncoordinator"
          label="Section Coordinator"
          count={5}
          onSelectedIdsChange={handleSelectedIdsChange}
        />
      )}
      {records.length > 0 && <Pagination />}
    </div>
  );
}
