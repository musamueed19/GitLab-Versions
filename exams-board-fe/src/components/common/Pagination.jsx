"use client";
import React, { useEffect, useState } from "react";

export default function Pagination() {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(`rows are: ${rows}, and page is ${page}`);
  }, [rows, page]);

  return (
    <div className="scale-75 lg:scale-100 flex items-center justify-between my-2 md:my-4 lg:my-6 w-[94%] mx-auto">
      {/* LEFT */}
      <div className="font-medium">
        Showing
        <select
          onChange={(event) => setRows(event.target.value)}
          name="rows"
          id="rows"
          className="border-2 border-[#ddd] rounded-md p-2 mx-2"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        rows per page
      </div>

      {/* RIGHT */}
      <div className="font-medium">
        Page
        <select
          onChange={(event) => setPage(event.target.value)}
          name="page"
          id="page"
          className="border-2 border-[#ddd] rounded-md p-2 mx-2"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        of 3
      </div>
    </div>
  );
}
