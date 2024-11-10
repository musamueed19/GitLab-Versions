"use client";
import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import axios from "axios";
import { useState, useEffect } from "react";

const columns = ["Designation"];

const actions = {
  actions: true,
  update: true,
  view: false,
  delete: true,
  all: false,
};

export default function DesignationManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch designations based on search term
  useEffect(() => {
    const searchDesignations = async () => {
      try {
        if (inputValue.trim()) {
          // Only search if there's an input
          const searchResponse = await axios.get(
            `http://192.168.50.219:3000/designations/search?term=${inputValue}`
          );
          const formedRecords = searchResponse.data.map((item) => ({
            designation: item.designation,
            id: item.id,
          }));
          setRecords(formedRecords); // Update records with search results
        } else {
          fetchDesignations(); // Fallback to full list if no search term
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };
    searchDesignations();
  }, [inputValue]);

  // Fetch all designations (without search)
  const fetchDesignations = async () => {
    try {
      const response = await axios.get(
        "http://192.168.50.219:3000/designations"
      );
      const formattedRecords = response.data.map((item) => ({
        designation: item.designation,
        id: item.id,
      }));
      setRecords(formattedRecords);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  useEffect(() => {
    fetchDesignations(); // Initial load
  }, []);

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setInputValue(value); // This will trigger the search useEffect
  };

  return (
    <div className="container">
      <TitleHeader title="Designations Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          {/* Pass the handler to Searchbar so it can update inputValue */}
          <Searchbar label="Search" onChange={handleSearchChange} />
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="designations"
            path="designations"
          />
          <FormModal title="Add" type="create" table="designations" />
        </div>
      </div>
      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="designations"
        count={1}
        label="Designation"
        url={"http://192.168.50.219:3000/designations"}
        onSelectedIdsChange={handleSelectedIdsChange}
      />
      {records.length > 0 && <Pagination />}
    </div>
  );
}
