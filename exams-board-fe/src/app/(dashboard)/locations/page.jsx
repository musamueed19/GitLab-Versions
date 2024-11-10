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

const columns = ["Location"];
const actions = {
  actions: true,
  update: true,
  view: false,
  delete: true,
  all: false,
};

export default function LocationManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);  // State for records

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  useEffect(() => {
    // Fetch records inside useEffect
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://192.168.50.219:3000/locations");
        
        // Check if response.data is an array and set records
        if (response.data && Array.isArray(response.data)) {
          setRecords(response.data.map((item) => ({
            location: item.location,
            id: item.id,
          })));
        } else {
          console.error("Data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [records]); // Empty dependency array to fetch data only once

  return (
    <div className="container">
      <TitleHeader title="Locations Management" />

      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="locations" />
          {/* Add other filter components here if needed */}
        </div>
        <div className="actionsGroup">
          <BulkDelete ids={selectedIds} label="locations" path="locations" />
          <FormModal title="Add" type="create" table="locations" />
        </div>
      </div>

      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="locations"
        label="locations"
        count={1}
        onSelectedIdsChange={handleSelectedIdsChange}
      />
     { records.length > 0 && <Pagination />}
    </div>
  );
}
