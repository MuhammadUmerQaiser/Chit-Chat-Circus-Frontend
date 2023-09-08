"use client";
import Link from "next/link";
import { useState } from "react";
import AuthenticationLayout from '../../components/Authentication/AuthenticationLayout';
import LoaderButton from '../../components/LoaderButton';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordToggle, setPasswordToggle] = useState(false);

  const LoginFormikSchema = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .trim()
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      setEmail(formik.values.email);
      setPassword(formik.values.password);
      userLogin()
    },
    validationSchema: LoginFormikSchema,
  });

  const userLogin = () => {
    setIsLoading(!isLoading);
    toast.success('Done')
  }

  return (
    <AuthenticationLayout>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={!passwordToggle ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</span>
              )}
              <div
                className={`absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ${passwordToggle ? 'text-gray-600' : 'text-primary-600'
                  }`}
                onClick={() => setPasswordToggle(!passwordToggle)}
              >
                {!passwordToggle ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </Link>
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
              {formik.isValid ? 'Sign in' : 'Please fill all details'}
            </button>
          ) : (
            <LoaderButton />
          )}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
