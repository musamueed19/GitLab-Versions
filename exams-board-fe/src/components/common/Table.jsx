"use client";

import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import Searchbar from "./Searchbar";
import BulkDelete from "./BulkDelete";
import InputFields from "./InputFields";
import axios from "axios";

export default function Table({
  checkboxes = true,
  columns,
  actions,
  records,
  table,
  count,
  semester,
  onSelectedIdsChange,
  setRefresh
}) {
  let i = 1;
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState(
    new Array(records.length).fill(false)
  );
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    // Reset selections and checked records when records change
    setCheckedRecords(new Array(records.length).fill(false));
    setIsAllChecked(false);
    setSelectedIds([]);
  }, [records.length]);

  useEffect(() => {
    if (onSelectedIdsChange) {
      onSelectedIdsChange(selectedIds);
    }
  }, [selectedIds, onSelectedIdsChange]);

  const handleHeaderCheckboxChange = () => {
    const newValue = !isAllChecked;
    setIsAllChecked(newValue);
    setCheckedRecords(new Array(records.length).fill(newValue));

    if (newValue) {
      const allIds = records.map((record) => record.id);
      setSelectedIds(allIds);
      console.log("All selected IDs:", allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowCheckboxChange = (index) => {
    const updatedCheckedRecords = [...checkedRecords];
    updatedCheckedRecords[index] = !updatedCheckedRecords[index];
    setCheckedRecords(updatedCheckedRecords);

    const updatedSelectedIds = [...selectedIds];
    if (updatedCheckedRecords[index]) {
      updatedSelectedIds.push(records[index].id);
    } else {
      const recordId = records[index].id;
      const idIndex = updatedSelectedIds.indexOf(recordId);
      if (idIndex > -1) {
        updatedSelectedIds.splice(idIndex, 1);
      }
    }
    setSelectedIds(updatedSelectedIds);
    console.log("Selected IDs:", updatedSelectedIds);

    setIsAllChecked(updatedCheckedRecords.every((checked) => checked));
  };

  return (
    <>
      {records.length === 0 ? (
        <div className="flex justify-center font-bold items-center h-64">
          <p>No record found.</p>
        </div>
      ) : (
        <table className="w-[94%] mx-auto overflow-hidden shadow-sm mt-2 rounded-md border-[1.5px] border-gray-300">
          <thead>
            <tr className="bg-slate-300">
              {
                checkboxes && (
                  <th className="hidden md:table-cell h-full py-2 px-[0.2rem]">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer scale-150"
                    checked={isAllChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                </div>
              </th>
                )
              }
              <th className="border-y-2 pl-2 py-2 rounded-sm text-left">
                <div className="flex items-center">
                  <span>Sr.#</span>
                  <svg
                    className="w-3 h-3 ml-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>

              {columns.map((th) => (
                <th
                  key={th}
                  className="border-y-2 pl-2 py-2 rounded-sm text-left"
                >
                  {th}
                </th>
              ))}
              {actions.actions && (
                <th className="border-y-2 pl-2 py-2 rounded-sm">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id || i++} // Use record ID if available
                className="border-y-2 hover:bg-gray-200/80 hover:cursor-pointer odd:bg-[#f2f2f2]"
              >
                {checkboxes && (
                  <td className="hidden md:table-cell border-y-2 py-2 px-1 rounded-sm text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="text-center cursor-pointer scale-150"
                      checked={checkedRecords[index]}
                      onChange={() => handleRowCheckboxChange(index)}
                    />
                  </div>
                </td>
                )}
                <td className="border-y-2 pl-2 py-2 rounded-sm">{i}</td>
                {Object.values(record).map(
                  (value, index) =>
                    index < count && (
                      <td
                        key={index}
                        className="border-y-2 pl-2 py-2 rounded-sm text-ellipsis text-nowrap overflow-hidden text-[0.8rem] lg:text-[0.95rem]"
                      >
                        {value}
                      </td>
                    )
                )}
                {actions.actions && (
                  <td className="py-2 flex items-center justify-center rounded-sm">
                    <div
                      className={`${
                        actions.all
                          ? "gap-[0.45rem] lg:gap-[0.8rem]"
                          : "gap-[0.7rem] lg:gap-[3rem]"
                      } flex items-center justify-evenly`}
                    >
                      {(actions.update || actions.all) && (
                        <FormModal
                          type="update"
                          table={table}
                          id={record.id}
                          data={record}
                          semester={semester}
                        />
                      )}
                      {(actions.view || actions.all) && (
                        <FormModal
                          type="view"
                          table={table}
                          id={record.id}
                          data={record}
                          semester={semester}
                        />
                      )}
                      {(actions.delete || actions.all) && (
                        <FormModal
                          type="delete"
                          table={table}
                          id={record.id}
                          data={record}
                          semester={semester}
                          setRefresh= {setRefresh}
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
