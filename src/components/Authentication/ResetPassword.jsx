"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import * as yup from "yup";
import { toast } from "react-toastify";
import LoaderButton from "../LoaderButton";
import { useState } from "react";
import axios from "../Axios/AxiosInstance";

export default function ResetPassword({ userVerifiedToken }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordConfirmationToggle, setPasswordConfirmationToggle] =
    useState(false);

  const ResetPasswordFormikSchema = yup.object({
    password: yup
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d{3,}/, "Password must contain at least three numbers")
      .matches(
        /[a-zA-Z\d]*[a-zA-Z][a-zA-Z\d]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: () => {
      setPassword(formik.values.password);
      setPasswordConfirmation(formik.values.passwordConfirmation);
      resetUserPassword();
    },
    validationSchema: ResetPasswordFormikSchema,
  });

  const resetUserPassword = () => {
    setIsLoading(!isLoading);
    const formData = new FormData();
    formData.append("token", userVerifiedToken);
    formData.append("password", formik.values.password);
    formData.append("password_confirmation", formik.values.passwordConfirmation);

    axios
      .post("reset-password", formData)
      .then((response) => {
        setIsLoading(false);
        if (response?.data?.status == 200) {
          toast.success(response?.data?.message);
          router.push("/login");
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
        Reset password
      </h1>
      <form className="space-y-2 md:space-y-6" action="#">
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={!passwordToggle ? "password" : "text"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
              required=""
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formik.errors.password}
              </span>
            )}
            <div
              className={`absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ${
                passwordToggle ? "text-gray-600" : "text-primary-600"
              }`}
              onClick={() => setPasswordToggle(!passwordToggle)}
            >
              {!passwordToggle ? <BsEyeFill /> : <BsEyeSlashFill />}
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              type={!passwordConfirmationToggle ? "password" : "text"}
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
              required=""
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.passwordConfirmation &&
              formik.touched.passwordConfirmation && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.passwordConfirmation}
                </span>
              )}
            <div
              className={`absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ${
                passwordConfirmationToggle
                  ? "text-gray-600"
                  : "text-primary-600"
              }`}
              onClick={() =>
                setPasswordConfirmationToggle(!passwordConfirmationToggle)
              }
            >
              {!passwordConfirmationToggle ? <BsEyeFill /> : <BsEyeSlashFill />}
            </div>
          </div>
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
            Reset password
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
