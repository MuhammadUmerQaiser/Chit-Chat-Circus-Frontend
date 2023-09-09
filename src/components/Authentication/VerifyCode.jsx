"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import LoaderButton from "../LoaderButton";
import { useState } from "react";
import axios from "../Axios/AxiosInstance";

export default function VerifyCode({
  continueFormProcess,
  onVerifySuccessSetUserToken,
}) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const VerifyCodeFormikSchema = yup.object({
    code: yup
      .string()
      .length(4, "Code must be exactly 4 characters")
      .required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: () => {
      setCode(formik.values.code);
      verifyCode();
    },
    validationSchema: VerifyCodeFormikSchema,
  });

  const verifyCode = () => {
    setIsLoading(!isLoading);
    const formData = new FormData();
    formData.append("token", formik.values.code);

    axios
      .post("verify-code", formData)
      .then((response) => {
        setIsLoading(false);
        if (response?.data?.status == 200) {
          toast.success(response?.data?.message);
          onVerifySuccessSetUserToken(formik.values.code);
          continueFormProcess();
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response?.data?.errors) {
          const errors = error?.response?.data?.errors;
          const firstErrorField = Object.keys(errors)[0];
          const firstErrorMessage = errors[firstErrorField][0];
          toast.error(firstErrorMessage);
        } else {
          toast.error("An error occured, ", error?.message);
        }
      });
  };
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Verify Code
      </h1>
      <form className="space-y-2 md:space-y-6" action="#">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code
          </label>
          <input
            type="number"
            name="code"
            id="code"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1234"
            required=""
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.code && formik.touched.code && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {formik.errors.code}
            </span>
          )}
        </div>
        {!isLoading ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Verify Code
          </button>
        ) : (
          <LoaderButton />
        )}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account.
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
