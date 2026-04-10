import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import SignUpForm from "@/app/components/auth/signup-form";

const SignUp = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#0cadc4] via-[#1a3b69] to-[#0f172a] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
