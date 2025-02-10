import { SignUp } from "@clerk/clerk-react";

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <SignUp redirectUrl="/user-register" />
    </div>
  );
}
