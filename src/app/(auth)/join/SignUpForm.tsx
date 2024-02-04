"use client";
import React, { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/utils/ServerActions";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

export default function SignUpForm({
  setIsShowVerify,
  capcha,
  setCapcha,
  userData,
  setUserData,
}: any) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setCapcha(generateRandom4Digits());
  }, []);
  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  function generateRandom4Digits(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const { data, mutate, error, isLoading } = useSWR("/api/auth/user", fetcher);
  const userList: any[] = [];
  if (Array.isArray(data)) {
    data.forEach((user: { email: any }) => {
      if (user.email) {
        userList.push(user.email);
      }
    });
  }

  const handleSendVerifyEmail = async () => {
    if (!email) {
      setTimeout(() => {
        toast.error("Please enter a valid email address");
      }, 2000);
    } else if (userList.includes(email)) {
      toast.error("Email has been registered, try another !");
    } else {
      await emailjs
        .sendForm(
          "service_jhc9dcv",
          "template_azqn1bc",
          form.current || "",
          "KJIOON2gbcNCODGSF",
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          },
        );
    }
  };

  const handleShowVerify = () => {
    handleSendVerifyEmail();
    setIsShowVerify(true);
  };
  return (
    <div>
      <form ref={form} className="mx-26 mx-auto w-[320px]">
        <img
          src="https://giphy.com/static/img/be-animated.gif"
          alt="Be Animated"
          className="mx-auto w-[320px]"
          width={320}
          height={150}
        />
        <div className="mx-auto my-6 flex w-[320px] justify-between rounded-full bg-[#2E2E2E] font-semibold">
          <button className="w-1/2" type="button">
            <Link href="/login">Login</Link>
          </button>
          <button
            className="w-1/2 rounded-full bg-gradient-to-r from-[#9038FE] to-[#6751FC] px-4 py-2"
            type="button"
          >
            Sign up
          </button>
        </div>
        <div className="my-4 gap-y-4">
          <p className="my-4 text-center text-xs font-light">
            Already started creating an account? <strong>Finish Sign Up</strong>
          </p>
          <input className="hidden" name="capcha" value={capcha} required />
          <input
            type="text"
            className="h-[40px] w-[320px] rounded-sm px-2 text-sm text-gray-900 placeholder:text-xs"
            placeholder="Email Address"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setUserData((prev: any) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <input
            type="text"
            className="my-4 h-[40px] w-[320px] rounded-sm px-2 text-sm text-gray-900 placeholder:text-xs"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              setUserData((prev: any) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
          <input
            type="password"
            className="h-[40px] w-[320px] rounded-sm px-2 text-sm text-gray-900 placeholder:text-xs"
            placeholder="Password"
            onChange={(e) => {
              setUserData((prev: any) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
          <input
            type="password"
            className="my-4 h-[40px] w-[320px] rounded-sm px-2 text-sm text-gray-900 placeholder:text-xs"
            placeholder="Confirm your password"
          />
          <>
            <ReCAPTCHA
              sitekey="6LfvIjQpAAAAAMBQ1fvcfhbz1nuOUrVOQHlJybUS"
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
          </>
          <div className="font-regular mt-2 text-center text-xs">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 translate-y-1 border-[#5C5C5C] bg-transparent"
            />
            I agree to
            <span className="text-[#00CCFF]"> Terms of Service </span>
            and <span className="text-[#00CCFF]"> Privacy Policy </span>
          </div>
          <button
            className={`my-4 h-[40px] w-[320px] rounded-sm bg-gradient-to-r from-[#9038FE] to-[#6751FC] px-4 py-2 font-semibold ${
              isVerified ? "" : "opacity-50"
            }`}
            disabled={!isVerified}
            onClick={handleShowVerify}
            type="submit"
          >
            Sign Up
          </button>

          <button className="h-[40px] w-[320px] rounded-sm bg-[#212121] px-4 py-2 text-sm font-medium">
            <FaSquareFacebook className="mb-1 mr-2 inline h-5 w-5 text-[#3490FC]" />
            Sign up with FaceBook
          </button>
          <button className="mt-2 h-[40px] w-[320px] rounded-sm bg-[#212121] px-4 py-2 text-sm font-medium">
            <FaApple className="mb-1 mr-2 inline h-5 w-5 " />
            Sign up Login with Apple
          </button>
        </div>
      </form>
    </div>
  );
}
