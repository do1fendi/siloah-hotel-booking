"use client";
import Script from "next/script";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user";
import useRouteListStore from "@/store/routeList";
// import { usePathname } from "next/navigation";

export interface IGoogleProps {
  clientId: String;
}
type googleRet = {
  aud: String;
  azp: String;
  email: String;
  email_verified: Boolean;
  exp: Number;
  family_name: String;
  given_name: String;
  iat: Number;
  iss: String;
  jti: String;
  name: String;
  nbf: Number;
  picture: String;
  sub: String;
};
export default function Google(props: IGoogleProps) {
  // const path = usePathname();
  const router = useRouter();
  const { routeList, acceptedList } = useRouteListStore((state) => state);
  const { userData, setUserData } = useUserStore((state) => state);
  const [isGoogleLogin, setIsgoogleLogin] = useState<boolean>(false);
  const handleResponse = (response: any) => {
    // console.log(response);
    // console.log(jwtDecode(response.credential));
    const decoded: googleRet = jwtDecode(response.credential);
   
    (async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-siloah": "siloah",
        },
        method: "POST",
        body: JSON.stringify({
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,
          platform: "GOOGLE",
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
        // window.location.reload();
      } else {
        setUserData({
          logged: true,
          em: decoded.email.toString(),
          name: `${dt.data.firstName} ${dt.data.lastName}`,
          token: dt.data.token,
        });
        // set back to previous page after login
        if (
          routeList[routeList.length - 1] !== undefined &&
          acceptedList.some((value) =>
            routeList[routeList.length - 1].includes(value)
          )
        )
          window.location.replace(routeList[routeList.length - 1]);
        else window.location.replace(`${process.env.BASEURL}`);
      }
    })();
  };

  const googleLogin = () => {
    (window as any).googleButtonWrapper.click();
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => {
          (window as any).google.accounts.id.initialize({
            client_id: props.clientId,
            callback: handleResponse,
          });

          const createFakeGoogleWrapper = () => {
            const googleLoginWrapper = document.createElement("div");
            // Or you can simple hide it in CSS rule for custom-google-button
            googleLoginWrapper.style.display = "none";
            googleLoginWrapper.classList.add("custom-google-button");

            // Add the wrapper to body
            document.body.appendChild(googleLoginWrapper);

            // Use GSI javascript api to render the button inside our wrapper
            // You can ignore the properties because this button will not appear
            (window as any).google.accounts.id.renderButton(
              googleLoginWrapper,
              {
                type: "icon",
                width: "200",
              }
            );

            const googleLoginWrapperButton: any =
              googleLoginWrapper.querySelector("div[role=button]");

            return {
              click: () => {
                googleLoginWrapperButton!.click();
              },
            };
          };

          // Now we have a wrapper to click
          (window as any).googleButtonWrapper = createFakeGoogleWrapper();
        }}
      />
      {/* <div id="btn"></div> */}

      {/* <Button onClick={() => setIsgoogleLogin(true)} text="Testing Google" /> */}
      {/* {JSON.stringify(routeList)} */}
      <button
        className="border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full"
        onClick={() => googleLogin()}
      >
        Google
      </button>
    </>
  );
}
