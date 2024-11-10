"use client";
import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import Table from '@/components/common/Table';
import TitleHeader from '@/components/common/TitleHeader';
import Loading from './loading';
import Searchbar from '@/components/common/Searchbar';
import InputFields from '@/components/common/InputFields';
import BulkDelete from '@/components/common/BulkDelete';
import FormModal from '@/components/common/FormModal';

const columns = [
  "Semester",
  "Start Date",
  "End Date",
  "Active"
];

const actions = {
  actions: "true",
  all: "true",
};

const statusOptions = [
  { value: "All", name: "All" },
  { value: "Active", name: "Active" },
  { value: "InActive", name: "InActive" },
];

export default function SemesterManagementPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("All"); 
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchSemesters = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://192.168.50.219:3000/semesters?status=${status}&search=${searchTerm}`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch semesters');
        
        const data = await response.json();
        const formattedRecords = data.map(item => ({
          title: item.title,
          start_date: item.start_date,
          end_date: item.end_date,
          status: item.is_Active ? "Active" : "InActive",
          id: item.id,
          mid_start_date: item.mid_term_date,
          mid_end_date: item.mid_term_end_date,
          final_start_date: item.final_term_date,
          final_end_date: item.final_term_end_date,
        }));
        
        setRecords(formattedRecords);
      } catch (error) {
        console.error('Error fetching semesters:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();
  }, [searchTerm, status, refresh ]);

  const handleRefresh = () => {
    setRefresh(prev => prev + 1);
  };

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error loading semesters: {error.message}</div>;

  return (
    <div className="container">
      <TitleHeader title="Semesters Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" searchValue={searchTerm} setSearchValue={setSearchTerm} path="semesters" />
          <InputFields
            label="Semester Status"
            required={true}
            input="dropdown"
            name="status"
            options={statusOptions}
            value={status}
            onChange={(name, value) => setStatus(value)} 
          />
        </div>
        <div className="actionsGroup">
          <BulkDelete ids={selectedIds} label="semesters" path="semesters" />
          <FormModal title="Add" type="create" table="semesters" setRefresh={handleRefresh} />
        </div>
      </div>
      <Table
        columns={columns}
        records={records}
        statusOptions={statusOptions}
        actions={actions}
        table="semesters"
        count={4}
        label="Semester"
        setRefresh = {handleRefresh}
        onSelectedIdsChange={handleSelectedIdsChange}
      />
      {records.length > 0 && <Pagination />}
    </div>
  );
}
