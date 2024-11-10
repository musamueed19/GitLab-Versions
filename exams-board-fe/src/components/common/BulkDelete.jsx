"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import DeleteDialog from './DeleteDialog';

export default function BulkDelete({ ids, label, path }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleBulkDelete = async (event) => {
    event.preventDefault();

    if (!ids || ids.length === 0) {
      alert('No ID provided for deletion');
      return;
    }

    const queryString = ids.map(id => `id=${id}`).join('&');
    try {
      const response = await fetch(`http://192.168.50.219:3000/${path}?${queryString}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.refresh(path);
        setIsOpen(false);
      } else {
        console.error('Failed to delete items', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting items', error);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleBulkDelete} className="bg-white p-6 rounded-lg">
            <DeleteDialog title={`selected ${label}(s)`} onCancel={() => setIsOpen(false)} />
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="scale-[0.65] md:scale-[0.7] lg:scale-100 hover:bg-[#ffc5c5] p-2 rounded-md">
          <Image src="/delete.svg" width={30} height={30} alt="delete icon" />
        </button>
      )}
    </>
  );
}

