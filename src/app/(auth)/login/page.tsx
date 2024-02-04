"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import Loader from "@/components/Loading/Loader";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
export default function LoginPage() {
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    setError(params.get("error") || "");
  }, [params]);
  if (session.status === "loading") {
    return <Loader />;
  }
  if (session.status === "authenticated") {
    router?.push("/");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSpin(true);
    const email = e.target[2].value;
    const password = e.target[3].value;
    try {
      await signIn("credentials", {
        email,
        password,
      });
      setLoadingSpin(false);
    } catch (error) {
      console.error("Sign-in error:", error);
      setLoadingSpin(false);
    }
  };
  return (
    <>
      <div className="mt-10 flex justify-center ">
        <div className="mt-6 block w-1/2 bg-[#121212]">
          <img
            src="https://giphy.com/static/img/be-animated.gif"
            alt="Be Animated"
            className="mx-auto w-[320px]"
          />
          <form onSubmit={handleSubmit} className="mx-26 mx-auto w-[320px]">
            <div className=" my-4 flex  justify-between rounded-full bg-[#2E2E2E] font-semibold">
              <button
                className="w-1/2 rounded-full bg-gradient-to-r from-[#00D3F0] to-[#00F8A6]"
                type="button"
              >
                Login
              </button>
              <button className="w-1/2 px-4 py-2" type="button">
                <Link href="/join"> Sign up</Link>
              </button>
            </div>
            <div className="my-4 gap-y-4">
              <input
                type="text"
                className=" h-[40px] w-[320px] rounded-sm px-2 text-sm text-gray-900 placeholder:text-sm"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="my-4 h-[40px] w-[320px] rounded-sm px-2 text-sm text-gray-900 placeholder:text-sm"
                placeholder="Password"
                required
              />
              <p className="my-2 font-medium text-red-500"> {error && error}</p>
              <button
                className="h-[40px] w-[320px] rounded-sm bg-gradient-to-r from-[#9038FE] to-[#6751FC] px-4 py-2 font-semibold"
                type="submit"
              >
                Login
              </button>
              {loadingSpin && <Loader />}
              <div className="mt-4 h-[40px] w-[320px] text-center text-sm font-light text-[#00CCFF]">
                Forgot Your Password?
              </div>
              <button className="h-[40px] w-[320px] rounded-sm bg-[#212121] px-4 py-2 text-sm font-medium">
                <FaSquareFacebook className="mb-1 mr-2 inline h-5 w-5 text-[#3490FC]" />
                Login with FaceBook
              </button>
              <button className="mt-4 h-[40px] w-[320px] rounded-sm bg-[#212121] px-4 py-2 text-sm font-medium">
                <FaApple className="mb-1 mr-2 inline h-5 w-5 " />
                Login with Apple
              </button>
              <p className="font-regular mt-4 text-center text-xs">
                By logging in you agree to GIPHY&rdquo;s
                <span className="text-[#00CCFF]"> Terms of Service </span>
                and <span className="text-[#00CCFF]"> Privacy Policy </span>
              </p>
            </div>
          </form>
        </div>
        {/* Images */}
        <div className="w-1/2 ">
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
