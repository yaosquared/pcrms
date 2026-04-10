"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

import GithubSignIn from "./signin-github";
import { credentialSignIn } from "./actions";
import SignInButton from "./action-buttons/signin-button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getSession } from "next-auth/react";
import { useAuthStore } from "@/lib/store";

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const clientAction = async (formData: FormData) => {
    const result = await credentialSignIn(formData);
    if (result?.error) {
      console.log(result.error);
      toast.error(result.error);
    } else {
      const session = await getSession();
      if (session) {
        useAuthStore.getState().setUserSession(session);
      }

      toast.success("Account successfully signed in");
      redirect("/dashboard");
    }
  };

  return (
    <div className="rounded-xl shadow-md w-[90%] md:w-[50%] lg:w-[44%] xl:w-[26%] p-10 flex flex-col justify-center items-center space-y-6 bg-white/80 backdrop-blur-lg dark:bg-[#101720] text-foreground text-sm lg:text-base">
      <div className="w-full px-2 xl:px-6 flex flex-col items-start gap-1">
        <h2 className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back
        </h2>
        <h3 className="text-2xl font-semibold tracking-tight">
          Sign in to your account
        </h3>
      </div>
      <form
        action={clientAction}
        className="w-full flex flex-col justify-center items-center gap-3 px-2 xl:px-6"
      >
        <input
          type="text"
          name="name"
          defaultValue={"Guest"}
          placeholder="Username"
          className="h-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md placeholder:text-muted-foreground bg-white dark:bg-[#181f2a] outline-none focus:border-2 focus:border-blue-600 transition"
        />
        <div
          className="flex justify-between h-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md placeholder:text-muted-foreground bg-white dark:bg-[#181f2a] outline-none focus-within:border-2 focus-within:border-blue-600 transition
"
        >
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            autoComplete="off"
            defaultValue={"password"}
            placeholder="Password"
            className="outline-none w-full"
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        <SignInButton />
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
      <div className="w-full flex items-center gap-3 px-2 xl:px-6 text-xs text-gray-500 dark:text-gray-400">
        <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
        <span className="whitespace-nowrap">Or</span>
        <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
      </div>
      <div className="w-full px-2 xl:px-6">
        <GithubSignIn />
      </div>
    </div>
  );
};

export default SignInForm;
