"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactCodeInput from "react-code-input";
import toast from "react-hot-toast";

export default function EmailVerify({ capcha, userData }: any) {
  const [pinCode, setPinCode] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);
  const handlePinChange = (
    pinCode: React.SetStateAction<string | undefined>,
  ) => {
    setPinCode(pinCode);
  };
  const router = useRouter();
  const handleCheckCapcha = () => {
    if (capcha?.toString == pinCode?.toString) {
      handleSubmit();
    } else {
      toast.error("Code not match, please try again!");
    }
  };
  const handleSubmit = async () => {
    setUploading(true);
    try {
      const email = userData.email;
      const username = userData.username;
      const password = userData.password;

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        });
        toast.success("Create account successfully!");
        res.status === 201 &&
          router.push("/login?success=Account has been created!");
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      toast.error("Something went error, please try again!");
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div>
      {" "}
      <form action="" className="mx-26 mx-auto w-[320px]">
        <Image
          src="https://media2.giphy.com/media/LOnt6uqjD9OexmQJRB/200w.webp"
          className="mx-auto"
          width="100"
          height="100"
          alt=""
        ></Image>
        <div className="text-center">
          <h1 className="my-6 font-extrabold"> Check your Email</h1>
          <p className="font-normal">
            We have sent an email to{" "}
            <span className="font-semibold text-[#00CCFF]">
              {userData.email}
            </span>
            . Please click the link in the email to verify your account or enter
            the email activation code below.
          </p>
        </div>
        <div className="my-4 gap-y-4">
          <div className="text-center">
            <ReactCodeInput
              type="text"
              fields={4}
              name={""}
              inputMode={"email"} // onChange={handlePinChange}
              onChange={handlePinChange}
            />
          </div>
          <div className="font-regular my-4 text-center text-xs">
            Didn&apos;t receive an email? Check your spam folder! <br></br>
            Emails may take a couple minutes to arrive.
            <div className="my-4">Already validated your account?!</div>
            <div className="text-base font-medium">
              <Link href="/login">Go to Log In</Link>
            </div>
          </div>
          <button
            className="h-[40px] w-[320px] rounded-sm bg-gradient-to-r from-[#9038FE] to-[#6751FC] px-4 py-2
            font-semibold"
            type="button"
            onClick={() => {
              handleCheckCapcha();
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
