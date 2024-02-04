"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@/utils/app_utils";
import { ImUser } from "react-icons/im";

import "./Header.scss";
interface Navigation {
  id: number;
  title: string;
  bgClass: string;
  url: string;
}

const navigation: Navigation[] = [
  {
    id: 1,
    title: "Reactions",
    bgClass: "reactions",
    url: "/",
  },
  {
    id: 2,
    title: "Entertainment",
    bgClass: "entertainment",
    url: "/",
  },
  {
    id: 3,
    title: "Sports",
    bgClass: "sports",
    url: "/",
  },
  {
    id: 4,
    title: "Stickers",
    bgClass: "stickers",
    url: "/community",
  },
  {
    id: 5,
    title: "Artists",
    bgClass: "artists",
    url: "/",
  },
];

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <header className="mb-6 bg-transparent">
        <nav
          className=" m flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center ">
            <Link href="/" className="flex items-center p-1.5">
              <div className="logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 164 35"
                  className="Svg-sc-jx1qpn cietHP h-[38px] w-[170px]"
                >
                  <g fillRule="evenodd" clipRule="evenodd">
                    <path fill="#00ff99" d="M0 3h4v29H0z"></path>
                    <path fill="#9933ff" d="M24 11h4v21h-4z"></path>
                    <path fill="#00ccff" d="M0 31h28v4H0z"></path>
                    <path fill="#fff35c" d="M0 0h16v4H0z"></path>
                    <path fill="#ff6666" d="M24 8V4h-4V0h-4v12h12V8"></path>
                    <path
                      fill="#121212"
                      opacity="0.4"
                      d="M24 16v-4h4M16 0v4h-4"
                    ></path>
                  </g>
                  <g fill="#ffffff">
                    <path d="M59.1 12c-2-1.9-4.4-2.4-6.2-2.4-4.4 0-7.3 2.6-7.3 8 0 3.5 1.8 7.8 7.3 7.8 1.4 0 3.7-.3 5.2-1.4v-3.5h-6.9v-6h13.3v12.1c-1.7 3.5-6.4 5.3-11.7 5.3-10.7 0-14.8-7.2-14.8-14.3 0-7.1 4.7-14.4 14.9-14.4 3.8 0 7.1.8 10.7 4.4L59.1 12zM68.2 31.2V4h7.6v27.2h-7.6zM88.3 23.8v7.3h-7.7V4h13.2c7.3 0 10.9 4.6 10.9 9.9 0 5.6-3.6 9.9-10.9 9.9h-5.5zm0-6.5h5.5c2.1 0 3.2-1.6 3.2-3.3 0-1.8-1.1-3.4-3.2-3.4h-5.5v6.7zM125 31.2V20.9h-9.8v10.3h-7.7V4h7.7v10.3h9.8V4h7.6v27.2H125zM149.2 13.3l5.9-9.3h8.7v.3l-10.8 16v10.8h-7.7V20.3L135 4.3V4h8.7l5.5 9.3z"></path>
                  </g>
                </svg>
              </div>
            </Link>
          </div>

          <div className="flex lg:hidden">
            {mobileMenuOpen ? (
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close main menu</span>
                <XMarkIcon
                  className="h-9 w-9 cursor-pointer text-[#03CCFF]"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  className="h-9 w-9 text-[#03CCFF]"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
          <div className="hidden lg:flex">
            {navigation.map((item) => (
              <div key={item.title}>
                <div
                  className={`button-wrapper ${item.bgClass} cursor-pointer`}
                >
                  <div className={`menu-button hover-${item.bgClass}`}>
                    <p className="px-3 py-1.5 text-sm font-black leading-6 text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Menu as="div" className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="mr-2 gap-x-1 px-1 text-center  text-[14px] leading-6 text-white">
              <Menu.Button className="mr-1 rounded-sm bg-[#6058FF] px-3 py-1.5 hover:opacity-50">
                Upload
              </Menu.Button>
              <Menu.Button className="rounded-sm bg-[#9933FF] px-3 py-1.5 hover:opacity-70">
                Create
              </Menu.Button>
            </div>

            {status === "authenticated" ? (
              <>
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`/profile`}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700",
                          )}
                        >
                          Hi {session?.user.username}
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700",
                          )}
                          onClick={() => {
                            handleSignOut();
                          }}
                        >
                          Sign Out
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex max-h-[36px] hover:opacity-60"
                >
                  <span className="bg-[#5C5C5C] px-2 py-2 text-white">
                    <ImUser className=" bg-transparent" />
                  </span>
                  <button className="bg-[#3E3E3E] px-8 py-1.5 text-xs font-bold leading-6 text-white sm:px-6">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </Menu>
        </nav>

        {/* Mobile nav */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 mt-20 w-full overflow-y-auto bg-gradient-to-b from-purple-500 to-pink-500 px-6 py-6  sm:ring-1 sm:ring-gray-900/10">
            <div className=" flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <Menu as="div" className="py-6">
                  {status === "authenticated" ? (
                    <>
                      <div className="flex">
                        <Menu.Button className="flex rounded-full bg-pink-400 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>

                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                            alt=""
                          />
                        </Menu.Button>
                        <span className="px-2 pt-1 font-medium text-gray-200">
                          Welcome {session?.data?.username}!
                        </span>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/profile/${session?.data?.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Welcome {session?.user.username}!
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                                onClick={() => {
                                  handleSignOut();
                                }}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-sm font-semibold leading-6 text-white"
                      >
                        Log in
                      </Link>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};
export default Header;
