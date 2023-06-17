"use client";
import { FormEvent, useState } from "react";
import useLangStore from "@/store/lang";
import useUserStore from "@/store/user";
import Google from "@/components/Google";
import Facebook from "@/components/Facebook";
import Link from "next/link";

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
  lastName: {
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
  dbResponse?: {
    error: boolean;
    msgCN: string;
    msgEN: string;
  };
};

export default function page({}: {}) {
  const { lang } = useLangStore((state) => state);
  const { userData, setUserData } = useUserStore((state) => state);
  const [form, setForm] = useState<iFormProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    platform: "EMAIL",
  });
  const [formErr, setFormErr] = useState<iFormErrProps>({
    firstName: {
      error: false,
    },
    lastName: {
      error: false,
    },
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
    if (inpt.value !== "") setFormErr({ ...formErr, [key]: { error: false } });
    else setFormErr({ ...formErr, [key]: { error: true } });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setFormErr({
      firstName: { error: form.firstName != "" ? false : true },
      lastName: { error: form.lastName != "" ? false : true },
      email: { error: form.email != "" ? false : true },
      password: { error: form.password != "" ? false : true },
      rePassword: { error: form.rePassword != "" ? false : true },
    });

    // check if any error
    setFormErr((prevState: any) => {
      const anyErr = [];
      for (const key in prevState) {
        // console.log(`${key}: ${prevState[key]['error']}`);
        anyErr.push(prevState[key]["error"]);
      }
      // if no error, do login
      setUserData({ logged: true, name: "john", token: "token" });
      return prevState;
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
              className={`border rounded-lg p-2 ${
                formErr.lastName.error === true && "border-pink-800"
              }`}
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => onChange(e.target)}
            />
            {formErr.lastName.error === true && (
              <label className="text-sm text-pink-800">
                {lang === "TW"
                  ? "請輸入有效的姓氏(限英文)。。"
                  : "Please enter a valid last name (English only)."}
              </label>
            )}
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
              type="password"
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
          {formErr.dbResponse?.error === true && (
            <label className="text-sm text-pink-800">
              {lang === "TW"
                ? formErr.dbResponse?.msgCN
                : formErr.dbResponse?.msgEN}
            </label>
          )}
          <button
            className="rounded-lg bg-orange-500 hover:bg-orange-400 text-gray-100 p-2 w-full"
            onClick={(e) => onSubmit(e)}
          >
            {lang === "TW" ? "送出" : "Submit"}
          </button>
        </form>
        {/* {JSON.stringify(userData)} */}
        <div className="splitter flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm">
          <p className="flex-grow h-px bg-gray-400"></p>
          <p className="">
            {lang === "TW" ? "或用以下帳號登入" : "or continue with"}
          </p>
          <p className="flex-grow h-px bg-gray-400"></p>
        </div>
        <div className="social-media-login flex flex-col gap-2 mt-5">
          <Google
            clientId={
              "267711026176-4qvtdrssib8rid36b01kp3eoduh1ie9u.apps.googleusercontent.com"
            }
          ></Google>

          <Facebook appId={"746859163687935"}></Facebook>
        </div>
        <div className="splitter mt-5">
          <p className="flex-grow h-px bg-gray-400"></p>
        </div>
        <div className="signin mt-5">
          <Link href="/signin">
            <button className="border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full">
              {lang === "TW"
                ? "已經是會員？登入"
                : "Already have an account? Sign in"}
            </button>
          </Link>
        </div>
        <div className="term-policy text-xs text-gray-400 text-center mt-5">
          {lang === "TW"
            ? "點擊登錄即代表我同意Siloah的服務條款和隱私權政策。"
            : "By signing in, I agree to Siloah's Terms of Use and Privacy Policy."}
        </div>
      </div>
    </div>
  );
}
