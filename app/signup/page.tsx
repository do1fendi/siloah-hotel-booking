"use client";
import { useState } from "react";
import useLangStore from "@/store/lang";

type iFormProps = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  rePassword: string;
  platform: string;
};

export default function page({}: {}) {
  const { lang } = useLangStore((state) => state);
  const [form, setForm] = useState<iFormProps>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    rePassword: "",
    platform: "",
  });
  return (
    <div className="flex justify-center items-center p-5 lg:p-0 mt-8">
      <div className="shadow-xl p-5 border rounded w-full lg:w-auto lg:min-w-[500px]">
        <p className="text-lg">{lang === "TW" ? "免費入會" : "Sign Up"}</p>
        <form className="mt-5">
          <div className="flex flex-col mb-5">
            <label htmlFor="firstName" className="mb-2">
              {lang === "TW" ? "護照英文名" : "First Name"}
            </label> 
            <input
              className="border rounded-lg p-2"
              type="text"
              name="firstName"
              id="firstName"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="lastName" className="mb-2">
              {lang === "TW" ? "護照英文姓" : "Last Name"}
            </label>
            <input
              className="border rounded-lg p-2"
              type="text"
              name="lastName"
              id="lastName"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="mb-2">
              {lang === "TW" ? "電子信箱" : "Email"}
            </label>
            <input
              className="border rounded-lg p-2"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="mb-2">
              {lang === "TW" ? "密碼" : "Password"}
            </label>
            <input
              className="border rounded-lg p-2"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="rePassword" className="mb-2">
              {lang === "TW" ? "確認密碼" : "Confirm Password"}
            </label>
            <input
              className="border rounded-lg p-2"
              type="rePassword"
              name="rePassword"
              id="rePassword"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
