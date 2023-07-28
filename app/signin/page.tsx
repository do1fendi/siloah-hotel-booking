"use client";
import { FormEvent, useState } from "react";
import useLangStore from "@/store/lang";
import useUserStore from "@/store/user";
import Google from "@/components/Google";
import Facebook from "@/components/Facebook";
import Link from "next/link";
import Error from "@/components/Error";
// import { usePathname } from "next/navigation";
import useRouteListStore from "@/store/routeList";
import useShowHandlerStore from "@/store/showHandler";

type iFormProps = {
  email: string;
  password: string;
  platform: string;
};

type iFormErrProps = {
  email: {
    error: boolean;
  };
  password: {
    error: boolean;
  };
  dbResponse: {
    error: boolean;
    msgCN?: string;
    msgEN?: string;
  };
};

export default function page({}: {}) {
  const { setCloseAllShow } = useShowHandlerStore((state) => state);
  const { routeList, acceptedList } = useRouteListStore((state) => state);
  // const path = usePathname();
  const { lang } = useLangStore((state) => state);
  const { setUserData } = useUserStore((state) => state);
  const [form, setForm] = useState<iFormProps>({
    email: "",
    password: "",
    platform: "EMAIL",
  });
  const [formErr, setFormErr] = useState<iFormErrProps>({
    email: {
      error: false,
    },
    password: {
      error: false,
    },
    dbResponse: {
      error: false,
    },
  });

  const onChange = (inpt: HTMLInputElement) => {
    setForm({ ...form, [inpt.name]: inpt.value });
    const key: keyof iFormProps = inpt.name as keyof iFormProps;

    if (inpt.value === "") setFormErr({ ...formErr, [key]: { error: true } });
    else if (
      inpt.name === "email" &&
      inpt.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null
    )
      setFormErr({ ...formErr, [key]: { error: true } });
    else if (inpt.name === "password" && inpt.value.length < 8)
      setFormErr({ ...formErr, [key]: { error: true } });
    else setFormErr({ ...formErr, [key]: { error: false } });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setFormErr({
      email: {
        error:
          form.email != "" &&
          form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
            ? false
            : true,
      },
      password: {
        error: form.password != "" || form.password.length >= 8 ? false : true,
      },
      dbResponse: {
        error: false,
      },
    });

    // check if any error
    setFormErr((prevState: any) => {
      const anyErr = [];
      for (const key in prevState) {
        // console.log(`${key}: ${prevState[key]['error']}`);
        anyErr.push(prevState[key]["error"]);
      }

      // if no error, do login
      if (!anyErr.includes(true))
        (async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "x-siloah": "siloah",
            },
            method: "POST",
            body: JSON.stringify(
              Object.fromEntries(
                Object.entries(form).filter((e) => e[0] != "rePassword")
              )
            ),
          };
          const result = await fetch(
            `${process.env.SERVER}/hotel/user/signin`,
            config
          );
          const dt = await result.json();

          if (dt.status === "Error") {
            setFormErr({
              ...formErr,
              dbResponse: { error: true, msgCN: dt.msgCN, msgEN: dt.msgEN },
            });
          } else {
            setUserData({
              logged: true,
              em: `${dt.data.email}`,
              name: `${dt.data.firstName} ${dt.data.lastName}`,
              token: dt.data.token,
            });

            // set back to previous page after login
            if (
              routeList[routeList.length - 2] !== undefined &&
              acceptedList.some((value) =>
                routeList[routeList.length - 2].includes(value)
              )
            )
              window.location.replace(routeList[routeList.length - 2]);
            else window.location.replace(`${process.env.BASEURL}`);
            // path.back();
          }
          console.log(dt);
        })();
      return prevState;
    });
  };
  return (
    <div
      className="flex justify-center items-center p-2 lg:p-5 lg:p-0 mt-2 lg:mt-8 text-md lg:text-lg"
      onClick={setCloseAllShow}
    >
      <div className="shadow-xl p-5 border rounded-lg w-full lg:w-auto lg:min-w-[500px]">
        <Error
          show={formErr.dbResponse!.error}
          msg={
            lang === "TW"
              ? formErr.dbResponse?.msgCN
              : formErr.dbResponse?.msgEN
          }
        />
        <p className="text-lg font-bold hidden lg:block">
          {lang === "TW" ? "免費入會" : "Sign Up"}
        </p>
        <form className="mt-0 lg:mt-5">
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
                  ? "請輸入有效的密碼。 最少須由8個英數字組合!"
                  : "Please enter a valid password. At least 8 characters"}
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
        <div className="signup mt-5">
          <Link href="/signup">
            <button className="border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full">
              {lang === "TW" ? "我是新朋友" : "Create account"}
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
