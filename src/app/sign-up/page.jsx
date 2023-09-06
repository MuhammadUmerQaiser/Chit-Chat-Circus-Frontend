"use client";
import Image from "next/image";
import Link from "next/link";
import AuthenticationLayout from '../../components/Authentication/Layout';
import avatar1 from "../../../public/images/avatar1.png";
import avatar2 from "../../../public/images/avatar2.png";
import avatar3 from "../../../public/images/avatar3.png";
import avatar4 from "../../../public/images/avatar4.png";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Login() {
  const [continueForm, setContinueForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordConfirmationToggle, setPasswordConfirmationToggle] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const SignUpFormikSchema = yup.object({
    name: yup.string().trim().required('Name is required'),
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup.string().trim().required('Password is required'),
    passwordConfirmation: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: () => {
      setMessage('Form submitted');
      setSubmitted(true);
    },
    validationSchema: SignUpFormikSchema,
  });

  return (
    <AuthenticationLayout>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {!continueForm ? "Create an account" : "Choose your avatar"}
        </h1>

        {!continueForm ? (
          <form className="space-y-2 md:space-y-6" action="#" onSubmit={formik.handleSubmit}>
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
                placeholder="John Dave"
                required=""
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.name}</span>
              )}
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && (
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  required=""
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</span>
                )}
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
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
                  type={!passwordConfirmationToggle ? 'password' : 'text'}
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  required=""
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.passwordConfirmation && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.passwordConfirmation}</span>
                )}
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={() => setPasswordConfirmationToggle(!passwordConfirmationToggle)}
                >
                  {!passwordConfirmationToggle ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
              </div>
            </div>
            <button
              onClick={() => setContinueForm(!continueForm)}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={!formik.isValid}
            >
              {formik.isValid ? 'Continue' : 'Please fill all details'}
            </button>
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
        ) : (
          <form className="space-y-2 md:space-y-6" action="#">
            <div className="text-center flex justify-center">
              <div className="mx-4">
                <Image
                  src={avatar1}
                  className={`w-32 rounded-full ${selectedAvatar == 1 ? 'ring-2 ring-gray-800' : ''}`}
                  alt="Avatar"
                  width={100}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAvatar(1)}
                />
              </div>
              <div className="mx-4">
                <Image
                  src={avatar2}
                  className={`w-32 rounded-full ${selectedAvatar == 2 ? 'ring-2 ring-gray-800' : ''}`}
                  alt="Avatar"
                  width={100}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAvatar(2)}
                />
              </div>
            </div>
            <div className="text-center flex justify-center">
              <div className="mx-4">
                <Image
                  src={avatar3}
                  className={`w-32 rounded-full ${selectedAvatar == 3 ? 'ring-2 ring-gray-800' : ''}`}
                  alt="Avatar"
                  width={100}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAvatar(3)}
                />
              </div>
              <div className="mx-4">
                <Image
                  src={avatar4}
                  className={`w-32 rounded-full ${selectedAvatar == 4 ? 'ring-2 ring-gray-800' : ''}`}
                  alt="Avatar"
                  width={100}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAvatar(4)}
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
    </AuthenticationLayout>
  );
}
