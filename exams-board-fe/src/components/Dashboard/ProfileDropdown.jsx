"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("User's name - null");
  const router = useRouter();

  function profilePopupHandler(isOpen) {
    setIsOpen(isOpen);
  }

  function logoutHandler() {
    Cookies.remove("userData");
    // Optionally, clear any other related data (e.g., sessionStorage)
    //  sessionStorage.clear();
    router.push("/auth/login");
  }

  useEffect(() => {
    const userData = Cookies.get("userData");
    console.log(userData);
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);
      setUserName(parsedData.user.name); // Assuming parsedData has a 'name' property
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-2  transition-all">
      {isOpen && <p className="font-medium text-lg">{userName}</p>}
      <button
        onClick={() => {
          profilePopupHandler(!isOpen);
        }}
        className="bg-[#d2d2d2]/90 rounded-full w-fit py-2 px-[0.7rem] hover:bg-blue-400"
      >
        <Image src="/profile.svg" width={30} height={30} alt="profile icon" />
      </button>
      {isOpen && (
        <div className="w-fit h-fit flex flex-col absolute top-16 right-3 border border-black/40 rounded-md bg-white z-10">
          <Link
            href="/user/changepassword"
            className="p-2 border-b border-gray-800 hover:bg-blue-100"
          >
            Change Password
          </Link>
          <button
            type="button"
            className="p-2 hover:bg-red-100 text-red-600 font-medium"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
