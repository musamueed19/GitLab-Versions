"use client";

import Cookies from "js-cookie";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginUser } from "../../lib/Fetcher/getAuth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible((prev) => !prev);
  // };

  // Regular expression to match the password requirements
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate password
    if (name === "email" || name === "password") {
      // if (!passwordRegex.test(value)) {
      if (value === "" || value === null) {
        setError(`${name} is required`);
      } else {
        setError("");
      }
    }
  }

  // async function handleLogin() {
  //   const res = await loginUser(formData);
  //   if (!res.success) {
  //     setError(res.data.message);
  //     return;
  //   }
  // }

  async function submitHandler(event) {
    event.preventDefault();
    if (error) {
      alert("Please enter a valid password.");
      return;
    }
    console.log(formData);
    const res = await loginUser(formData);
    if (!res.success) {
      setError(res.error);
      setFormData({
        email: "",
        password: "",
      });
      return;
    }
    console.log(res.data);

    // const now = new Date();
    const expiryDate = new Date(now.getTime() + 30 * 60 * 1000);

    // sessionStorage.setItem("userData", res.data);
    // setCookie("userData", JSON.stringify(res.data), { maxAge: 60 * 60 * 24 });
    Cookies.set("userData", JSON.stringify(res.data), {
      expires: expiryDate,
      path: "/",
      sameSite: "strict",
    });
    setSuccess("Login Successfull");
    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-10">
        <div className="space-y-2">
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
          </div>
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
                placeholder="Enter your password"
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
          <div className="flex justify-end items-center">
            <Link
              className="text-[#3fa2f7] text-sm hover:underline"
              href="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
          <button type="submit" className="bg-[#226ffe] text-white w-full p-2 font-medium rounded-lg hover:bg-[#324cf3] text-lg">
            Sign in
          </button>
      </div>
    </form>
  );
}
