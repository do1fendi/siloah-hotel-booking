"use client";
import { FormEvent, useState } from "react";
import useLangStore from "@/store/lang";

type iFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  platform: string;
};

type iFormErrProps = {
  firstName: {
    error: boolean;
  };
  lastName?: {
    error: boolean;
  };
  email: {
    error: boolean;
  };
  password: {
    error: boolean;
  };
  rePassword: {
    error: boolean;
  };
};

export default function page({}: {}) {
  const { lang } = useLangStore((state) => state);
  const [form, setForm] = useState<iFormProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    platform: "",
  });
  const [formErr, setFormErr] = useState<iFormErrProps>({
    firstName: {
      error: false,
    },
    // lastName: {
    //   hasTyped: false,
    //   error: false,
    //   label:
    //     lang === "TW"
    //       ? "請輸入有效的姓氏(限英文)。"
    //       : "Please enter a valid last name (English only).",
    // },
    email: {
      error: false,
    },
    password: {
      error: false,
    },
    rePassword: {
      error: false,
    },
  });

  const onChange = (inpt: HTMLInputElement) => {
    setForm({ ...form, [inpt.name]: inpt.value });
    const key: keyof iFormProps = inpt.name as keyof iFormProps;
    if (form[key] !== "") setFormErr({ ...formErr, [key]: { error: false } });
  };

  const onSubmit = (e: FormEvent) => {
    // form.firstName === ""
    //   ? setFormErr({
    //       ...formErr,
    //       firstName: { ...formErr.firstName, error: true },
    //     })
    //   : setFormErr({
    //       ...formErr,
    //       firstName: { ...formErr.firstName, error: false },
    //     });

    // form.email === ""
    //   ? setFormErr({
    //       ...formErr,
    //       email: { ...formErr.email, error: true },
    //     })
    //   : setFormErr({
    //       ...formErr,
    //       email: { ...formErr.email, error: false },
    //     });

    // form.password === ""
    //   ? setFormErr({
    //       ...formErr,
    //       password: { ...formErr.password, error: true },
    //     })
    //   : setFormErr({
    //       ...formErr,
    //       password: { ...formErr.password, error: false },
    //     });

    // form.rePassword === ""
    //   ? setFormErr({
    //       ...formErr,
    //       rePassword: { ...formErr.rePassword, error: true },
    //     })
    //   : setFormErr({
    //       ...formErr,
    //       rePassword: { ...formErr.rePassword, error: false },
    //     });
    
    e.preventDefault();
    setFormErr({
      firstName: { error: form.firstName != "" ? false : true },
      email: { error: form.email != "" ? false : true },
      password: { error: form.password != "" ? false : true },
      rePassword: { error: form.rePassword != "" ? false : true },
    });
  };
  return (
    <div className="flex justify-center items-center p-2 lg:p-5 lg:p-0 mt-2 lg:mt-8 text-md lg:text-lg">
      <div className="shadow-xl p-5 border rounded-lg w-full lg:w-auto lg:min-w-[500px]">
        <p className="text-lg font-bold hidden lg:block">
          {lang === "TW" ? "免費入會" : "Sign Up"}
        </p>
        <form className="mt-0 lg:mt-5">
          <div className="flex flex-col mb-2 lg:mb-5">
            <label htmlFor="firstName" className="mb-[2px]">
              {lang === "TW" ? "護照英文名" : "First Name"}
            </label>
            <input
              className={`border rounded-lg p-2 ${
                formErr.firstName.error === true && "border-pink-800"
              }`}
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => onChange(e.target)}
            />
            {formErr.firstName.error === true && (
              <label className="text-sm text-pink-800">
                {lang === "TW"
                  ? "請輸入有效的名字(限英文)。"
                  : "Please enter a valid first name (English only)."}
              </label>
            )}
          </div>
          <div className="flex flex-col mb-2 lg:mb-5">
            <label htmlFor="lastName" className="mb-[2px]">
              {lang === "TW" ? "護照英文姓" : "Last Name"}
            </label>
            <input
              className="border rounded-lg p-2"
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => onChange(e.target)}
            />
          </div>
          <div className="flex flex-col mb-2 lg:mb-5">
            <label htmlFor="email" className="mb-[2px]">
              {lang === "TW" ? "電子信箱" : "Email"}
            </label>
            <input
              className={`border rounded-lg p-2 ${
                formErr.email.error === true && "border-pink-800"
              }`}
              type="email"
              name="email"
              id="email"
              onChange={(e) => onChange(e.target)}
            />
            {formErr.email.error === true && (
              <label className="text-sm text-pink-800">
                {lang === "TW"
                  ? "請輸入有效的電子信箱。"
                  : "Please enter a valid email address."}
              </label>
            )}
          </div>
          <div className="flex flex-col mb-2 lg:mb-5">
            <label htmlFor="password" className="mb-[2px]">
              {lang === "TW" ? "密碼" : "Password"}
            </label>
            <input
              className={`border rounded-lg p-2 ${
                formErr.password.error === true && "border-pink-800"
              }`}
              type="password"
              name="password"
              id="password"
              onChange={(e) => onChange(e.target)}
            />
            {formErr.password.error === true && (
              <label className="text-sm text-pink-800">
                {lang === "TW"
                  ? "請輸入有效的密碼。"
                  : "Please enter a valid password."}
              </label>
            )}
          </div>
          <div className="flex flex-col mb-2 lg:mb-5">
            <label htmlFor="rePassword" className="mb-[2px]">
              {lang === "TW" ? "確認密碼" : "Confirm Password"}
            </label>
            <input
              className={`border rounded-lg p-2 ${
                formErr.rePassword.error === true && "border-pink-800"
              }`}
              type="rePassword"
              name="rePassword"
              id="rePassword"
              onChange={(e) => onChange(e.target)}
            />
            {formErr.rePassword.error === true && (
              <label className="text-sm text-pink-800">
                {lang === "TW"
                  ? "請輸入有效的密碼。"
                  : "Please enter a valid password."}
              </label>
            )}
          </div>
          <button
            className="rounded-lg bg-orange-500 hover:bg-orange-400 text-gray-100 p-2 w-full"
            onClick={(e) => onSubmit(e)}
          >
            {lang === "TW" ? "送出" : "Submit"}
          </button>
        </form>
        {/* {JSON.stringify(formErr)} */}
      </div>
    </div>
  );
}
