import Script from "next/script";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";


export interface IGoogleProps {
  clientId: String;
}

export default function Google(props: IGoogleProps) {
  const [isGoogleLogin, setIsgoogleLogin] = useState<boolean>(false);
  const handleResponse = (response: any) => {
    console.log(response);
    console.log(jwtDecode(response.credential));
  };
  useEffect(() => {
    /* global google */
    (window as any).google.accounts.id.initialize({
      client_id: props.clientId,
      callback: handleResponse,
    });

    // (window as any).google.accounts.id.renderButton(
    //   document.getElementById("btn"),
    //   {
    //     theme: "outline",
    //     size: "large",
    //   }
    // );
    const createFakeGoogleWrapper = () => {
      const googleLoginWrapper = document.createElement("div");
      // Or you can simple hide it in CSS rule for custom-google-button
      googleLoginWrapper.style.display = "none";
      googleLoginWrapper.classList.add("custom-google-button");

      // Add the wrapper to body
      document.body.appendChild(googleLoginWrapper);

      // Use GSI javascript api to render the button inside our wrapper
      // You can ignore the properties because this button will not appear
      (window as any).google.accounts.id.renderButton(googleLoginWrapper, {
        type: "icon",
        width: "200",
      });

      const googleLoginWrapperButton: any =
        googleLoginWrapper.querySelector("div[role=button]");

      return {
        click: () => {
          googleLoginWrapperButton!.click();
        },
      };
    };

    // Now we have a wrapper to click
    const googleButtonWrapper = createFakeGoogleWrapper();
    setIsgoogleLogin((prev) => {
      if (prev === true) {
        console.log("pressed");
        googleButtonWrapper.click();
      }
      setIsgoogleLogin(false);
      return prev;
    });
   
  }, [isGoogleLogin]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        strategy="beforeInteractive"
      ></Script>
      {/* <div id="btn"></div> */}

      {/* <Button onClick={() => setIsgoogleLogin(true)} text="Testing Google" /> */}
      <button className="border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full" onClick={() => setIsgoogleLogin(true)}>Google</button>
    </>
  );
}
