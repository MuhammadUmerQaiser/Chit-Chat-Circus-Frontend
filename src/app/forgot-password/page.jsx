'use client';
import Link from "next/link";
import AuthenticationLayout from '../../components/Authentication/AuthenticationLayout';
import LoaderButton from '../../components/LoaderButton';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const ForgotPasswordFormikSchema = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: () => {
      setEmail(formik.values.email);
      forgotPassword()
    },
    validationSchema: ForgotPasswordFormikSchema,
  });

  const forgotPassword = () => {
    setIsLoading(!isLoading);
    toast.success('Done')
    router.push('/reset-password')
  }
  return (
    <AuthenticationLayout>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Forgot password
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
          {!isLoading ? (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit(e)
              }}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Forgot Password
            </button>
          ) : (
            <LoaderButton />
          )}
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
      </div>
    </AuthenticationLayout>
  );
}
