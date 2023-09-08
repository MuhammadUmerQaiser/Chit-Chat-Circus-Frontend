'use client';
import Link from "next/link";
import { useState } from "react";
import AuthenticationLayout from '../../components/Authentication/AuthenticationLayout';
import VerifyCode from '../../components/Authentication/VerifyCode';
import ResetPassword from '../../components/Authentication/ResetPassword';

export default function Login() {
  const [continueForm, setContinueForm] = useState(false);

  const processVerifyCodeToContinueForm = () => {
    setContinueForm(!continueForm);
  }
  return (
    <AuthenticationLayout>
      {!continueForm ?
        (
          <VerifyCode continueFormProcess={processVerifyCodeToContinueForm} />
        ) :
        (
          <ResetPassword />
        )}
    </AuthenticationLayout>
  );
}
