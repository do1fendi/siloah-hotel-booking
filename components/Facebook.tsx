"use client";
import Script from "next/script";

export interface IFacebookProps {
  appId: String;
}

export default function Facebook(props: IFacebookProps) {
  function loginFb() {
    (window as any).FB.login(
      function (response: any) {
        if (response.status === "connected") {
          // Logged into your webpage and Facebook.
          console.log(response);
          (window as any).FB.api(
            "/me?fields=id,first_name,last_name,email",
            function (res: any) {
              console.log(res);
            }
          );
        } else {
          // The person is not logged into your webpage or we are unable to tell.
          console.log(response);
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
