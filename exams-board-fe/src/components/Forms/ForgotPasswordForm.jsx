"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ForgotPasswordForm() {

  const [formData, setFormData] = useState({
    email: "",
  })

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "" || value === null) {
      setError(`email is required`);
    }
    // else if (!emailRegex.test(formData.email)) {
    //   setError("Invalid email!");
    // }
    else {
      setError("");
    }
  }

  function submitHandler(event) {
    event.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email!");
      return
    }
    if (error !== "" && error !== null) return;
    setError("");
    setSuccess("Success: " + formData.email)
    

    console.log(formData);
    setFormData({
      email: ""
    })

    setTimeout(() => {
      router.push('/auth/resetverification')
    }, 500);


    
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <label
              className="font-medium text-lg text-[#344054]"
              htmlFor="email"
            >
              Email
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="outline-none border-2 focus:ring-2 focus:ring-blue-200 rounded-md py-1 px-3"
              value={formData.email}
              tabIndex="1"
            />
            {error && <p className="text-red-500 text-sm lowercase">{error}</p>}
            {success && (
              <p className="text-green-500 font-medium text-sm lowercase">
                {success}
              </p>
            )}
        </div>
          
          <button type="submit" className="bg-[#226ffe] text-white w-full p-2 font-medium rounded-lg hover:bg-[#324cf3] text-lg">
            Sign in
          </button>
                </div>
    </form>
  );
}
