"use client";
import Script from "next/script";
import useUserStore from "@/store/user";

export interface IFacebookProps {
  appId: String;
}

export default function Facebook(props: IFacebookProps) {
  const { userData, setUserData } = useUserStore((state) => state);
  function loginFb() {
    (window as any).FB.login(
      function (response: any) {
        if (response.status === "connected") {
          // Logged into your webpage and Facebook.
          // console.log(response);
          (window as any).FB.api(
            "/me?fields=id,first_name,last_name,email",
            function (res: any) {
              // console.log(res);
              (async () => {
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                    "x-siloah": "siloah",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    firstName: res.first_name,
                    lastName: res.last_name,
                    email: res.email,
                    platform: "FACEBOOK",
                  }),
                };
                const result = await fetch(
                  `${process.env.SERVER}/hotel/customer/signin`,
                  config
                );
                const dt = await result.json();
                // console.log(dt);
                if (dt.status === "Error") {
                  setUserData(null);
                  window.location.replace("/");
                } else {
                  setUserData({
                    logged: true,
                    name: `${dt.data.firstName} ${dt.data.lastName}`,
                    token: dt.data.token,
                  });
                  window.location.replace("/");
                }
              })();
            }
          );
        } else {
          // The person is not logged into your webpage or we are unable to tell.
          // console.log(response);
        }
      },
      { scope: "email", return_scopes: true }
    );
  }

  return (
    <>      
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          ((window as any).fbAsyncInit = function () {
            (window as any).FB.init({
              appId: props.appId,
              cookie: true,
              xfbml: true,
              version: "v16.0",
            });
          })
        }
      />    

      <button
        className="border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full"
        onClick={() => loginFb()}
      >
        Facebook
      </button>
    </>
  );
}
