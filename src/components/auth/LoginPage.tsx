import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/auth-loading"); // Redirection après connexion
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <SignIn forceRedirectUrl="/auth-loading" />
    </div>
  );
}
