"use client";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import EmailVerify from "./EmailVerify";
import { IUserData } from "@/types/app_interfaces";
export default function SignUpPage() {
  const [isShowVerify, setIsShowVerify] = useState<boolean>(false);
  const [capcha, setCapcha] = useState<string>("");
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    username: "",
    passwords: "",
  });
  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className=" mt-6 block w-1/2 bg-[#121212]">
          {isShowVerify ? (
            <EmailVerify capcha={capcha} userData={userData} />
          ) : (
            <SignUpForm
              setCapcha={setCapcha}
              capcha={capcha}
              userData={userData}
              setIsShowVerify={setIsShowVerify}
              setUserData={setUserData}
            />
          )}
        </div>
        {/* Images */}
        <div className="hidden w-1/2 sm:flex">
          <video autoPlay={true} playsInline={true} muted>
            <source
              src="https://media.giphy.com/login-join-backgrounds/science-logo.mp4"
              type="video/mp4"
            />
            <source
              src="https://media.giphy.com/login-join-backgrounds/science-logo.webm"
              type="video/webm"
            />
          </video>
        </div>
      </div>
    </>
  );
}
