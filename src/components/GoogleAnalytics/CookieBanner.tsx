"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(() =>
    getLocalStorage("cookie_consent", null),
  );

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);
  return (
    <div
      className={`h-fit-content fixed bottom-0 left-0 right-0
                         mx-auto grid
                        w-screen grid-cols-10 flex-col items-center justify-between gap-4 bg-[#2E2E2E]  
                         px-[150px]  py-3  shadow sm:flex-row md:px-4  ${
                           cookieConsent == null ? "flex" : "hidden"
                         } `}
    >
      <div className="col-span-6 mx-[100px]">
        <div>
          <h5 className="mb-2 text-lg font-extrabold">Our Cookie Policy</h5>
          <div className="text-sm font-normal">
            GIPHY uses cookies to improve your user experience, analyze website
            traffic, and collect audience insights for ad campaign planning. By
            clicking “Agree,” you consent to our usage of cookies as described
            more fully in our Privacy Policy &nbsp;
            <Link
              href="https://support.giphy.com/hc/en-us/articles/360032872931-GIPHY-Privacy-Policy"
              className="text-[#00CCFF] underline"
            >
              linked here
            </Link>{" "}
            and by clicking &rdquo;Disagree,&rdquo; you do not consent to our
            usage of cookies. You can change your cookie settings at any time by
            clicking &rdquo;Manage cookies&rdquo; in our global navigation menu.
            <br></br>
            <br></br> With your agreement, we and{" "}
            <Link href="" className="text-[#00CCFF] underline">
              our 4 partners
            </Link>{" "}
            use cookies or similar technologies to store, access, and process
            personal data like your visit on this website, IP addresses and
            cookie identifiers. Some partners do not ask for your consent to
            process your data and rely on their legitimate business interest.
            You can withdraw your consent or object to data processing based on
            legitimate interest at any time by clicking on “Learn More” or in
            our Privacy Policy on this website.<br></br>
            <br></br>
            We and our partners process data for the following purposes<br></br>{" "}
            A/B Testing, Application improvements, Essential, Personalised
            advertising and content, advertising and content measurement,
            audience research and services development , Store and/or access
            information on a device
          </div>
        </div>
      </div>

      <div className="g col-span-4">
        <button
          className=" mr-3 w-[140px] bg-[#4A4A4A] px-7 py-2 font-medium text-white hover:bg-opacity-70"
          onClick={() => setCookieConsent(false)}
        >
          Disagree
        </button>
        <button
          className=" w-[140px] bg-[#6157FF] px-7 py-2 font-medium text-white hover:bg-opacity-70"
          onClick={() => setCookieConsent(true)}
        >
          Agree
        </button>
      </div>
    </div>
  );
}
