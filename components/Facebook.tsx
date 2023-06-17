import Script from "next/script";
import { useEffect } from "react";

export interface IFacebookProps {
  appId: String;
}

export default function Facebook(props: IFacebookProps) {
  useEffect(() => {
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: props.appId,
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });

    //   (window as any).FB.AppEvents.logPageView();
    //   (window as any).FB.getLoginStatus(function (response: any) {
    //     // Called after the JS SDK has been initialized.
    //     statusChangeCallback(response); // Returns the login status.
    //   });
    };

    // (window as any).testAPI = function () {
    //   console.log("Welcome!  Fetching your information.... ");
    //   (window as any).FB.api(
    //     "/me?fields=id,first_name,last_name,email",
    //     function (response: any) {
    //       console.log(response);
    //     }
    //   );
    // };
  }, []);

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

//   function statusChangeCallback(response: any) {
//     // Called with the results from FB.getLoginStatus().
//     console.log("statusChangeCallback");
//     console.log(response); // The current login status of the person.
//   }

  return (
    <>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
        nonce="29GfDbm6"
      ></Script>
      {/* <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout=""
        data-auto-logout-link="true"
        data-use-continue-as="true"
        data-scope="public_profile,email"
        data-onlogin="testAPI();"
      ></div>
      <button onClick={() => loginFb()}>check FACEBOOK login</button> */}

      <button className="border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full" onClick={() => loginFb()}>Facebook</button>
    </>
  );
}
