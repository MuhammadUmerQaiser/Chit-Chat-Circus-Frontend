"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.png";
import avatar1 from "../../../public/images/avatar1.png";
import avatar2 from "../../../public/images/avatar2.png";
import avatar3 from "../../../public/images/avatar3.png";
import avatar4 from "../../../public/images/avatar4.png";
import { useState } from "react";

export default function Login() {
  const [continueForm, setContinueForm] = useState(false);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src={logo}
            alt="Vercel Logo"
            className="w-12 h-12 mr-4"
            width={100}
            height={24}
          />
          Chit Chat Cirus
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {!continueForm ? "Create an account" : "Choose your avatar"}
            </h1>

            {!continueForm ? (
              <form className="space-y-2 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  onClick={() => setContinueForm(!continueForm)}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Continue
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account.{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            ) : (
              <form className="space-y-2 md:space-y-6" action="#">
                <div className="text-center flex justify-center">
                  <div className="mx-4">
                    <Image
                      src={avatar1}
                      className="w-32 ring-2 ring-gray-800 rounded-full"
                      alt="Avatar"
                      width={100}
                      height={24}
                      style={{cursor: "pointer"}}
                    />
                  </div>
                  <div className="mx-4">
                    <Image
                      src={avatar2}
                      className="w-32 rounded-full"
                      alt="Avatar"
                      width={100}
                      height={24}
                      style={{cursor: "pointer"}}
                    />
                  </div>
                </div>
                <div className="text-center flex justify-center">
                  <div className="mx-4">
                    <Image
                      src={avatar3}
                      className="w-32 rounded-full"
                      alt="Avatar"
                      width={100}
                      height={24}
                      style={{cursor: "pointer"}}
                    />
                  </div>
                  <div className="mx-4">
                    <Image
                      src={avatar4}
                      className="w-32 rounded-full"
                      alt="Avatar"
                      width={100}
                      height={24}
                      style={{cursor: "pointer"}}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setContinueForm(!continueForm)}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {!continueForm ? "Continue" : "Create an account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
