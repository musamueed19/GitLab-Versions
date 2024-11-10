"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (value === "" || value === null) {
      setError(`both fields are required`);
    } else if (!passwordRegex.test(value)) {
      setError(
        `password must be atleast 8 characters long (must have one special, lowercase, uppercase)`
      );
    } else {
      setError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (error !== "" && error !== null) return;
    else if (formData.password !== formData.confirmPassword) {
      setError("unmatched Passwords");
      return;
    }

    
    console.log(formData.password);
    
    setError("")
    setSuccess("sucess: " + formData.password)

    setFormData({
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      router.push('/auth/login')
    }, 1000);
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-14">
        <div className="space-y-2">
          <div className="flex flex-col">
            <label
              className="font-medium text-lg text-[#344054]"
              htmlFor="password"
            >
              Password
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="group border-2 flex px-2 rounded-md focus-within:ring-2 focus-within:ring-blue-200">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                placeholder="Enter new password"
                required
                className="group outline-none py-1 w-full"
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((curr) => !curr)}
              >
                <Image
                  src={isPasswordVisible ? "/eyeOpen.svg" : "/eyeClose.svg"}
                  alt="hidePassword icon"
                  width={16}
                  height={16}
                  className="cursor-pointer transition-all"
                  key={isPasswordVisible ? "eyeOpen" : "eyeClose"}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              className="font-medium text-lg text-[#344054]"
              htmlFor="confirmPassword"
            >
              Confirm Password
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="group border-2 flex px-2 rounded-md focus-within:ring-2 focus-within:ring-blue-200">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                onChange={handleInputChange}
                placeholder="Confirm new password"
                required
                className="group outline-none py-1 w-full"
                value={formData.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((curr) => !curr)}
              >
                <Image
                  src={isPasswordVisible ? "/eyeOpen.svg" : "/eyeClose.svg"}
                  alt="hidePassword icon"
                  width={16}
                  height={16}
                  className="cursor-pointer transition-all"
                  key={isPasswordVisible ? "eyeOpenConfirm" : "eyeCloseConfirm"}
                />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm lowercase">{error}</p>}
            {success && (
              <p className="text-green-500 font-medium text-sm lowercase">
                {success}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#226ffe] text-white w-full p-2 font-medium rounded-lg hover:bg-[#324cf3] text-lg"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
