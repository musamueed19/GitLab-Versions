"use client";

import Menubar from "@/components/Dashboard/Menubar";
import Navbar from "@/components/Dashboard/Navbar";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isHide, setIsHide] = useState(false);
  // const router = useRouter();

  function hideTitleHandler() {
    setIsHide(!isHide);
    console.log("function", isHide);
  }

  // useEffect(() => {
  //   let userData = sessionStorage.getItem("userData");
  //   if (userData === null || userData.email === '' || userData.email === null) {
  //     router.push('/auth/login')
  //   }
  //   else {}
  // }, []);

  return (
    <div className="flex w-full h-full gap-2">
      {/* LEFT */}
      {/* p-[0.5rem] sm:p-[0.7rem] md:p-4 lg:p-3 */}
      <div
        className={`${
          isHide ? "w-[5%]" : "w-[15%] md:w-[10%] lg:w-[18%] xl:w-[14%]"
        } bg-white rounded-xl flex flex-col gap-2 pt-4`}
      >
        <div
          className={`justify-center lg:pl-2 flex w-full items-center ${
            isHide ? "justify-center" : "lg:justify-start"
          }
          }`}
        >
          <Link href="/home" className="flex gap-2">
            <div className="w-8 h-8 relative">
              {" "}
              <Image src="/logo.png" alt="logo" width={30} height={30} />
            </div>
            <span
              className={`hidden ${
                isHide ? "hidden" : "lg:block"
              } text-[#00214f] font-bold text-[1.4rem] xl:text-2xl`}
            >
              ExamBoard
            </span>
          </Link>
        </div>
        <Menubar isHide={isHide} />
      </div>
      {/* RIGHT */}
      <div
        className={`${
          isHide ? "w-[95%]" : "w-[85%] md:w-[90%] lg:w-[84%] xl:w-[86%]"
        } flex flex-col gap-2 bg-white rounded-s-2xl`}
      >
        <Navbar hideMenu={hideTitleHandler} />

        {children}
      </div>
    </div>
  );
}
